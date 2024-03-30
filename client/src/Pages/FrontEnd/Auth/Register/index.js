import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

import style from './register.module.scss';
import routes from '~/config/routes';
import DateOption from '~/components/DateOption';
import axios from '~/api/axios';
import useAuthContext from '~/contexts/Auth/AuthContent';
import Button from '~/components/Button';
import { faEye, faEyeSlash } from '@fortawesome/fontawesome-free-regular';

const cx = classNames.bind(style);

export default function Register() {
  const { Register } = useAuthContext();
  const emailRef = useRef();
  const passRef = useRef();
  const genderRef = useRef();
  const nameRef = useRef();
  const formRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [name, setFullname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [showPass, setShowPass] = useState(false);

  const [passwordValid, setPasswordValidate] = useState('');
  const [emailValid, setEmailValidate] = useState('');
  const [birthdayValid, setBirthdayValidate] = useState('');
  const [nameValid, setNameValidate] = useState('');
  const [genderValid, setGenderValidate] = useState('');
  const navigate = useNavigate();

  //logined
  const logined = () => {
    if (localStorage.getItem('token')) {
      return navigate('/');
    }
  };
  logined();

  //handle email validated
  useEffect(() => {
    let em = emailRef.current;
    const handleKeyUpEmail = (e) => {
      if (e.target.value == '') {
        setEmailValidate(`You can't leave this empty`);
        em.classList.add('danger_validated');
      } else if (
        !e.target.value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
      ) {
        setEmailValidate(`email should be @gmail.com`);
        em.classList.add('danger_validated');
      } else {
        setEmailValidate(``);
        em.classList.remove('danger_validated');
      }
    };

    if (em) {
      em.addEventListener('keyup', handleKeyUpEmail);
    }
    return () => {
      if (em) {
        em.removeEventListener('keyup', handleKeyUpEmail);
      }
    };
  }, [emailValid]);

  //handle pass validated
  useEffect(() => {
    let pass = passRef.current;
    const handleKeyUpPass = (e) => {
      if (e.target.value == '') {
        setPasswordValidate(`You can't leave this empty`);
        pass.classList.add('danger_validated');
      } else if (e.target.value.length < 6 || e.target.value.length > 20) {
        setPasswordValidate(`The length of Password should be 6-50 characters.`);
        pass.classList.add('danger_validated');
      } else {
        setPasswordValidate(``);
        pass.classList.remove('danger_validated');
      }
    };
    if (pass) {
      pass.addEventListener('keyup', handleKeyUpPass);
    }
    return () => {
      if (pass) {
        pass.removeEventListener('keyup', handleKeyUpPass);
      }
    };
  }, [passwordValid]);

  //handle name validate
  useEffect(() => {
    let name = nameRef.current;
    const handleKeyUpName = (e) => {
      if (e.target.value == '') {
        setNameValidate(`You can't leave this empty`);
        name.classList.add('danger_validated');
      } else if (e.target.value.length < 6 || e.target.value.length > 20) {
        setNameValidate(`The length of Name should be 6-50 characters.`);
        name.classList.add('danger_validated');
      } else {
        setNameValidate(``);
        name.classList.remove('danger_validated');
      }
    };
    if (name) {
      name.addEventListener('keyup', handleKeyUpName);
    }
    return () => {
      if (name) {
        name.removeEventListener('keyup', handleKeyUpName);
      }
    };
  }, [nameValid]);

  const handleBirthDayOnchange = (childData) => {
    setBirthday(childData);
  };

  // handle form submit
  useEffect(() => {
    const today = new Date();
    const d = new Date(birthday);
    const m = today.getFullYear() - d.getFullYear();
    let form = formRef.current;
    let g = genderRef.current;
    const handleSubmitForm = (e) => {
      e.preventDefault();
      if (gender == '') {
        setGenderValidate('Please select gender');
        g.classList.add('danger_validated');
      } else {
        g.classList.remove('danger_validated');
        setGenderValidate('');
      }
      if (m < 14) {
        setBirthdayValidate('Age must be greater than 14');
      } else {
        setBirthdayValidate('');
      }
      if (
        email != '' &&
        password != '' &&
        gender != '' &&
        birthday != '' &&
        name != '' &&
        emailValid == '' &&
        passwordValid == '' &&
        genderValid == '' &&
        birthdayValid == '' &&
        nameValid == ''
      ) {
        console.log(e);
        Register({ name, email, password, gender, birthday });
      }
    };
    if (form) {
      form.addEventListener('submit', handleSubmitForm);
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', handleSubmitForm);
      }
    };
  }, [email, password, name, gender, birthday]);

  // show hide pass
  const handleShowHidePass = () => {
    let pass = passRef.current;
    if (showPass == false) {
      setShowPass(true);
      pass.type = 'text';
    } else {
      setShowPass(false);
      pass.type = 'password';
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('main-content', 'mx-auto bg-transparent')}>
        <div className={cx('header', 'd-flex justify-content-between align-items-center')}>
          <h3 className={cx('title', 'fs-1')}>Create your Life Circle Account</h3>
          <div className={cx('login')}>
            Already member?
            <Button className="fs-5 p-1" to={routes.signIn} style={{ color: '#1a9cb7' }}>
              Login
            </Button>
            Here
          </div>
        </div>
        <form ref={formRef} noValidate className={cx('rgt_content', 'd-flex justify-content-between')}>
          <div className={cx('rgt_content_left', 'form-group')}>
            <div className={cx('mb-4 form-group')}>
              <label className="fs-5 form-label">Email*</label>
              <input
                ref={emailRef}
                className={cx('form-control py-3')}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                required
                type="text"
                placeholder="Email..."
              />
              <span className="text-danger fs-5">{emailValid != '' ? emailValid : ''}</span>
            </div>
            <div className={cx('password', 'mb-4 form-group')}>
              <label className="fs-5 form-label">Password*</label>
              <input
                ref={passRef}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                required
                className={cx('py-3 form-control')}
                type="password"
                placeholder="Password"
              />
              <div onClick={handleShowHidePass} className={cx('show-hide-pass')}>
                {showPass ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
              </div>
              <span className="text-danger fs-5">{passwordValid != '' ? passwordValid : ''}</span>
            </div>
            <div className={cx('birthday_gender', 'mb-4 d-flex justify-content-between gap-3 form-group')}>
              <div className={cx('birthday', 'col-9 form-group')}>
                <label className="fs-5 form-label">Birthday</label>
                {/* handle select birthday */}
                <DateOption
                  setDefault={new Date()}
                  onChangeValue={handleBirthDayOnchange}
                  numberOfYears={80}
                  selectClassName={cx('select_date', 'py-3')}
                  className={cx('container_select_date', 'mb-1')}
                />
                <span className="text-danger fs-5">{birthdayValid != '' ? birthdayValid : ''}</span>
              </div>
              <div className={cx('gender', 'form-group')}>
                <label className="fs-5 form-label">Gender</label>
                <select
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  ref={genderRef}
                  className="py-3 form-select"
                >
                  <option value="">Select</option>
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </select>
                <span className="text-danger fs-5">{genderValid != '' ? genderValid : ''}</span>
              </div>
            </div>
          </div>
          <div className={cx('rgt_content_right', 'form-group')}>
            <div className={cx('mb-4 form-group')}>
              <label className="fs-5 form-label">Full Name*</label>
              <input
                ref={nameRef}
                onChange={(e) => {
                  setFullname(e.target.value);
                }}
                value={name}
                required
                className={cx('py-3 form-control')}
                type="text"
                placeholder="First Last"
              />
              <span className="text-danger fs-5">{nameValid != '' ? nameValid : ''}</span>
            </div>
            <Button className={cx('btn_submit', 'form-control text-white py-3 fs-4 mb-2')} type="submit">
              Register
            </Button>
            <div style={{ fontSize: '1.2rem', color: '#757575' }}>
              By proceeding to sign up, I acknowledge that I have read and consented to Lazada’s{' '}
              <Button to={'/'} className={cx('fs-5 m-0 p-0')} style={{ color: '#1a9cb7' }}>
                Terms of Use
              </Button>{' '}
              and{' '}
              <Button to={'/'} className={cx('fs-5 m-0 p-0')} style={{ color: '#1a9cb7' }}>
                Privacy
              </Button>
              <Button to={'/'} className={cx('fs-5 m-0 p-0')} style={{ color: '#1a9cb7' }}>
                Policy
              </Button>
              , which sets out how Lazada collects, uses and discloses my personal data, and the rights that I have
              under applicable law.
            </div>
            <div className={cx('register_wrap', 'text-start my-3 fs-5')}>Or, register with</div>
            <div className={cx('login_third', 'form-group d-flex  justify-content-between')}>
              <Button className={cx('fa_background', 'py-2 px-0  fs-2 text-white d-flex align-items-center')}>
                <FontAwesomeIcon className={cx('fa_facebook', 'text-white btn fs-1 pe-2 me-3')} icon={faFacebookF} />
                Facebook
              </Button>
              <Button className={cx('gg_background', 'btn py-2 px-0 fs-2 text-white d-flex align-items-center')}>
                <FontAwesomeIcon className={cx('fa_google', 'pe-2 me-3')} icon={faGooglePlusG} />
                Google
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
