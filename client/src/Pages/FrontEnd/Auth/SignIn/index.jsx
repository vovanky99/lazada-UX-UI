import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';

import routes from '~/config/routes';
import SignIn from './SignIn.module.scss';
import Button from '~/components/Button';
import { faEye, faEyeSlash } from '@fortawesome/fontawesome-free-regular';
import { useNavigate } from 'react-router-dom';
import { Login } from '~/Redux/Actions/Auth';

const cx = classNames.bind(SignIn);

export default function Log() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passRef = useRef();
  const fbRef = useRef();
  const ggRef = useRef();
  const [emailValidate, setEmailValidate] = useState('');
  const [passwordValidate, setPasswordValidate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleEmailOnchange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordOnchange = (e) => {
    setPassword(e.target.value);
  };

  //handle login submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email != '' && password != '' && emailValidate == '' && passwordValidate == '') {
      dispatch(Login({ email, password }));
    }
  };

  //handle validate email
  useEffect(() => {
    let em = emailRef.current;
    const handleKeyDownEmail = (e) => {
      if (e.target.value == '') {
        setEmailValidate(`You can't leave this empty`);
        em.classList.add('danger_validated');
      } else if (e.target.value.length < 6 || e.target.value > 30) {
        setEmailValidate('The length of the Phone or Email should be 6-30 characters.');
        em.classList.add('danger_validated');
      } else if (
        !e.target.value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
      ) {
        setEmailValidate('email should be @gmail.com');
        em.classList.add('danger_validated');
      } else {
        setEmailValidate('');
        em.classList.remove('danger_validated');
      }
    };
    if (em) {
      em.addEventListener('keydown', handleKeyDownEmail);
    }

    return () => {
      if (em) {
        em.removeEventListener('keydown', handleKeyDownEmail);
      }
    };
  }, [emailValidate]);

  //handle validate password
  useEffect(() => {
    let pass = passRef.current;
    const handleChangePass = (e) => {
      if (e.target.value == '') {
        setPasswordValidate(`You can't leave this empty`);
        pass.classList.add('danger_validated');
      } else {
        setPasswordValidate('');
        pass.classList.remove('danger_validated');
      }
    };
    if (pass) {
      pass.addEventListener('keyup', handleChangePass);
    }
    return () => {
      if (pass) {
        pass.removeEventListener('keyup', handleChangePass);
      }
    };
  }, [passwordValidate]);

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

  //handle login facebook

  useEffect(() => {
    // let gg = ggRef.current;
    // let fb = fbRef.current;
    // if (gg) {
    //   gg.addEventListener('click', function () {
    //     SocialLogin('google');
    //   });
    // }
    // if (fb) {
    //   fb.addEventListener('click', function () {
    //     SocialLogin('facebook');
    //   });
    // }
  }, []);

  return (
    <section className={cx('wrapper')}>
      <div className={cx('main-content', 'mx-auto bg-transparent')}>
        <div className={cx('header', 'd-flex justify-content-between align-items-center')}>
          <h3 className={cx('title', 'fs-1')}>Welcome to Life Circle. Login now!</h3>
          <div className={cx('register')}>
            New Member?
            <Button className={cx('p-0 mx-2 fs-5')} to={routes.register} style={{ color: '#1a9cb7' }}>
              Register
            </Button>
            Here
          </div>
        </div>
        <div className={cx('form-container')}>
          <form onSubmit={handleSubmit} className={cx('login-content')} noValidate>
            <p className={cx('login_account', 'text-start mb-3 fw-bold')}>Login with Password</p>
            <div className={cx('email', 'from-group mb-5 fs-5')}>
              <label className="form-label">Email*</label>
              <input
                ref={emailRef}
                name="email"
                value={email}
                onChange={handleEmailOnchange}
                type="text"
                placeholder="Email..."
                className={cx('email_input', 'py-3 form-control')}
              />
              <span className={cx('text-danger')}>{emailValidate != '' ? emailValidate : ''}</span>
            </div>
            <div className={cx('password', 'form-group mb-5 fs-5')}>
              <label className={cx('form-label d-flex justify-content-between align-items-center')}>
                Password*{' '}
                <Button className={cx('fs-5')} to={routes.register} style={{ color: '#1a9cb7' }}>
                  Forget Password?
                </Button>
              </label>
              <input
                ref={passRef}
                name="password"
                autoComplete="true"
                value={password}
                onChange={handlePasswordOnchange}
                type="password"
                placeholder="Password"
                className={cx('pass_input', 'form-control py-3')}
              />
              <div onClick={handleShowHidePass} className={cx('show-hide-pass')}>
                {showPass ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
              </div>
              <span className={cx('text-danger')}>{passwordValidate != '' ? passwordValidate : ''}</span>
            </div>
            <Button className={cx('btn_submit', 'form-control py-4 fs-5 mb-6 text-uppercase')} type="submit">
              Login
            </Button>
          </form>
          <div className={cx('login_wrap', 'text-center my-4 fs-5')}>Or, login with</div>
          <div className={cx('login_third', 'form-group d-flex  justify-content-between')}>
            <Button ref={fbRef} className={cx('btn-lfc-gray', 'py-2 px-0')}>
              <FontAwesomeIcon className={cx('fa_facebook', 'pe-2')} icon={faFacebook} />
              Facebook
            </Button>
            <Button ref={ggRef} className={cx('btn-lfc-gray', 'py-2 px-0')}>
              <FontAwesomeIcon className={cx('fa_google', 'pe-2')} icon={faGoogle} />
              Google
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
