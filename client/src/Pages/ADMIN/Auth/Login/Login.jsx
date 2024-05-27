import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Images from '~/components/Images';
import Button from '~/components/Button';
import config from '~/config';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from '~/api/axios';

const cx = classNames.bind(styles);

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [messageSubmitError, setMessageSubmitError] = useState('');

  /* validate login */
  useEffect(() => {
    const u = usernameRef.current;
    const p = passwordRef.current;
    //validate username
    const handleKeyupUsername = (e) => {
      if (e.target.value === '') {
        setUsernameMessage(`Username don't empty`);
        e.target.classList.add('login-valid');
      } else {
        setUsernameMessage('');
        e.target.classList.remove('login-valid');
      }
    };
    //validate password
    const handleKeyupPass = (e) => {
      if (e.target.value === '') {
        setPasswordMessage(`Password don't empty`);
        e.target.classList.add('login-valid');
      } else {
        setPasswordMessage('');
        e.target.classList.remove('login-valid');
      }
    };

    if (p) {
      p.addEventListener('keyup', handleKeyupPass);
    }
    if (u) {
      u.addEventListener('keyup', handleKeyupUsername);
    }
    return () => {
      if (p) {
        p.removeEventListener('keyup', handleKeyupPass);
      }
      if (u) {
        u.removeEventListener('keyup', handleKeyupUsername);
      }
    };
  }, [username, password]);

  /* redirect when admin had login  */
  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      return navigate(`${config.adminRoutes.Home}`);
    }
  });

  /* login admin */
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (username !== '' && password !== '' && usernameMessage === '' && passwordMessage === '') {
      const LoginAdmin = async () => {
        try {
          axios.get('/sanctum/csrf-cookie');
          const res = await axios.post('/api/admin/admin-login', { username, password });
          if (res.data.token) {
            localStorage.setItem('adminToken', res.data.token);
            if (localStorage.getItem('adminToken')) {
              navigate(`${config.adminRoutes.Home}`);
            }
          } else {
            passwordRef.current.classList.add('login-valid');
            usernameRef.current.classList.add('login-valid');
            setMessageSubmitError(`Username or Password don't correct`);
          }
        } catch (e) {
          console.log(e);
        }
      };
      LoginAdmin();
    }
  };
  return (
    <section className={cx('login')}>
      <div className={cx('login_content', ' d-flex justify-content-center align-items-center')}>
        <div className={cx('login_content_contain', 'd-flex justify-content-center flex-column')}>
          <h1 className={cx('logo')}>
            <Images src={require('~/assets/Admin/logoAdmin/lifecircle.png')} />
          </h1>
          <h4 className={cx('hello', 'fw-bold')}>Hello! let's get started</h4>
          <h6>Sign in to continue.</h6>
          <form onSubmit={handleSubmitLogin} className={cx('form')} noValidate>
            <div className={cx('username', 'form-group')}>
              <input
                className="form-control form-control-lg"
                ref={usernameRef}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                placeholder="username"
              />
              {usernameMessage !== '' ? <span className={cx('message', 'text-danger')}>{usernameMessage}</span> : ''}
            </div>
            <div className={cx('forget-pass', 'form-group d-flex flex-row justify-content-end')}>
              <Link to={config.adminRoutes.ResetPassword}>Forgot password?</Link>
            </div>
            <div className={cx('password', 'form-group')}>
              <input
                ref={passwordRef}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control form-control-lg"
                type="password"
                placeholder="password"
              />
              {passwordMessage !== '' ? <span className={cx('message', 'text-danger')}>{passwordMessage}</span> : ''}
            </div>
            {messageSubmitError != '' ? (
              <div className={cx('message_submit-error', 'form-group text-danger')}>{messageSubmitError}</div>
            ) : (
              ''
            )}
            <Button className={cx('btn-login', 'text-capitolize')} gradient_primary>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
