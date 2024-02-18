import classNames from 'classnames/bind';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

import style from './register.module.scss';
import routes from '~/config/routes';
import SelectDate from '~/components/SelectDate';
import Checkbox from '~/components/Checkbox';
import axios from '~/api/axios';

const cx = classNames.bind(style);

// error 419
// const csrf = () => axios.get('/sanctum/csrf-cookie');

export default function Register() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [name, setFullname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errors, setErrors] = useState('');

  const handleEmailOnchange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordOnchange = (e) => {
    setPassword(e.target.value);
  };
  const handleGenderOnchange = (e) => {
    setGender(e.target.value);
  };
  const handleFullNameOnchange = (e) => {
    setFullname(e.target.value);
  };
  const handleBirthDayOnchange = (childData) => {
    setBirthday(childData);
  };

  const handleSubmit = async (e) => {
    // error 419
    // await csrf();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();

    try {
      axios.post('api/register', { email, password, name, gender });
      setEmail('');
      setFullname('');
      setBirthday('');
      setGender('');
      navigate('/');
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
    setValidated(true);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('main-content', 'mx-auto bg-transparent')}>
        <div className={cx('header', 'd-flex justify-content-between')}>
          <h3 className={cx('title', 'fs-1')}>Create your Life Circle Account</h3>
          <div className={cx('login')}>
            Already member?{' '}
            <Link to={routes.signIn} style={{ color: '#1a9cb7' }}>
              Login
            </Link>{' '}
            Here
          </div>
        </div>
        <Form
          validated={validated}
          noValidate
          onSubmit={handleSubmit}
          className={cx('register_content', 'd-flex justify-content-between')}
        >
          <Form.Group className={cx('col-6')}>
            <Form.Group className={cx('mb-4')}>
              <Form.Label className="fs-5">Email*</Form.Label>
              <Form.Control
                onChange={handleEmailOnchange}
                value={email}
                required
                className={cx('py-3')}
                type="text"
                placeholder="Email..."
              />
              <Form.Control.Feedback type="invalid">Please Enter Email</Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Group className={cx('slide_unlock', 'mb-3')}>
              <span></span>
              <div className={cx('slide_unlock_text')}>Slide to get SMS Code</div>
            </Form.Group> */}
            <Form.Group className={cx('mb-4')}>
              <Form.Label className="fs-5">Password*</Form.Label>
              <Form.Control
                onChange={handlePasswordOnchange}
                value={password}
                required
                className={cx('py-3')}
                type="password"
                placeholder="Password"
              />
              <Form.Control.Feedback type="invalid">Please Enter Password</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={cx('mb-4 d-flex justify-content-between gap-3')}>
              <Form.Group className={cx('col-9')}>
                <Form.Label className="fs-5">Birthday</Form.Label>
                <SelectDate
                  onChangeValue={handleBirthDayOnchange}
                  startingYear={1945}
                  numberOfYears={80}
                  selectClassName={cx('select_date', 'py-3')}
                  className={cx('container_select_date')}
                />
              </Form.Group>
              <Form.Group className={cx('gender')}>
                <Form.Label className="fs-5">Gender</Form.Label>
                <Form.Select onChange={handleGenderOnchange} value={gender} className="py-3">
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </Form.Select>
              </Form.Group>
            </Form.Group>
          </Form.Group>
          <Form.Group className={cx('col-5')}>
            <Form.Group className={cx('mb-4')}>
              <Form.Label className="fs-5">Full Name*</Form.Label>
              <Form.Control
                onChange={handleFullNameOnchange}
                value={name}
                required
                className={cx('py-3')}
                type="text"
                placeholder="First Last"
              />
              <Form.Control.Feedback type="invalid">Please Enter FullName</Form.Control.Feedback>
            </Form.Group>
            <Checkbox
              required
              ClassName="mb-4"
              ClassNameCheck="fs-5"
              Label=" I'd like to receive exclusive offers and promotions via SMS "
              // backgroundColor="#F57224"
              styleCheckMark={{ borderColor: '#F57224' }}
            />
            <Button noValidate className={cx('btn_submit', 'form-control py-3 fs-4 mb-2')} type="submit">
              Register
            </Button>
            <div style={{ fontSize: '1.2rem', color: '#757575' }}>
              By proceeding to sign up, I acknowledge that I have read and consented to Lazada’s{' '}
              <Link style={{ color: '#1a9cb7' }}>Terms of Use</Link> and{' '}
              <Link style={{ color: '#1a9cb7' }}>Privacy</Link> <Link style={{ color: '#1a9cb7' }}>Policy</Link> , which
              sets out how Lazada collects, uses and discloses my personal data, and the rights that I have under
              applicable law.
            </div>
            <div className={cx('register_wrap', 'text-start my-3 fs-5')}>Or, register with</div>
            <Form.Group className={cx('login_third', 'd-flex  justify-content-between')}>
              <Link className={cx('fa_background', 'py-2 px-0 fs-3 text-white')}>
                <FontAwesomeIcon className={cx('fa_facebook', 'text-white btn fs-3 pe-2 me-3')} icon={faFacebookF} />
                Facebook
              </Link>
              <Link className={cx('gg_background', 'btn py-2 px-0 fs-3 text-white')}>
                <FontAwesomeIcon className={cx('fa_google', 'pe-2 me-3')} icon={faGooglePlusG} />
                Google
              </Link>
            </Form.Group>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
