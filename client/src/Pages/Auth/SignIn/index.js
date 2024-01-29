import { useEffect, useRef, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import useAuthContext from '~/contexts/Auth/AuthContent';

import routes from '~/config/routes';
import SignIn from './SignIn.module.scss';

const cx = classNames.bind(SignIn);

export default function SgnIn() {
  const phoneRef = useRef();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errors } = useAuthContext();

  // error 419
  // const csrf = () => axios.get('/sanctum/csrf-cookie');

  const handleEmailOnchange = (e) => {
    // let onlyNumbers = e.target.value.replace(/[^\d]/g, '');
    // let limitToEight = onlyNumbers.slice(0, 10);
    setEmail(e.target.value);
    // setPhoneNumber(limitToEight);
  };
  const handlePasswordOnchange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    // error 419
    // await csrf();
    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }
    e.preventDefault();
    login({ email, password });
    setValidated(true);
  };
  return (
    <section className={cx('wrapper')}>
      <div className={cx('main-content', 'mx-auto bg-transparent')}>
        <div className={cx('header', 'd-flex justify-content-between')}>
          <h3 className={cx('title', 'fs-1')}>Welcome to lazada. Login now!</h3>
          <div className={cx('register')}>
            New Member?{' '}
            <Link to={routes.register} style={{ color: '#1a9cb7' }}>
              Register
            </Link>{' '}
            Here
          </div>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className={cx('login-content')}>
          <p className={cx('login_account', 'text-start mb-3 fw-bold')}>Login Account</p>
          <Form.Group className={cx('email', 'mb-5 fs-5')}>
            <Form.Label>Phone Number*</Form.Label>
            <Form.Control
              ref={phoneRef}
              name="email"
              value={email}
              required
              autoComplete="off"
              onChange={handleEmailOnchange}
              type="email"
              placeholder="Email"
              className={cx('py-3')}
            />
            <Form.Control.Feedback type="invalid">please enter Phone Number</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={cx('password', 'mb-5 fs-5')}>
            <Form.Label className={cx('d-flex justify-content-between')}>
              Password* <Link style={{ color: '#1a9cb7' }}>Forget Password?</Link>
            </Form.Label>
            <Form.Control
              name="password"
              value={password}
              onChange={handlePasswordOnchange}
              autoComplete="off"
              required
              type="password"
              placeholder="Password"
              className={cx('py-3')}
            />
            <Form.Control.Feedback type="invalid">please enter password</Form.Control.Feedback>
          </Form.Group>
          {/* {errors && (
            <Alert variant="warning" className={cx('errors')}>
              {errors}
            </Alert>
          )} */}
          <Button noValidate className={cx('btn_submit', 'form-control py-4 fs-4 mb-6')} type="submit">
            Login
          </Button>
          <div className={cx('login_wrap', 'text-center my-4 fs-5')}>Or, login with</div>
          <Form.Group className={cx('login_third', 'd-flex  justify-content-between')}>
            <Button className={cx('btn-lz-gray', 'py-2 px-0')}>
              <FontAwesomeIcon className={cx('fa_facebook', 'pe-2')} icon={faFacebook} />
              Facebook
            </Button>
            <Button className={cx('btn-lz-gray', 'py-2 px-0')}>
              <FontAwesomeIcon className={cx('fa_google', 'pe-2')} icon={faGoogle} />
              Google
            </Button>
          </Form.Group>
        </Form>
      </div>
    </section>
  );
}
