import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Images from '~/components/Images';
import Button from '~/components/Button';
import config from '~/config';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from '~/api/axios';
import { setSession } from '~/redux/Actions/Auth';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Auth, setAuth] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [messageSubmitError, setMessageSubmitError] = useState('');

  /* redirect when admin had login  */
  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      return navigate(`${config.adminRoutes.Home}`);
    }
  });
  /* validate login */
  useEffect(() => {
    const u = usernameRef.current;
    const p = passwordRef.current;

    //validate username
    const handleKeyupUsername = (e) => {
      if (e.target.value === '') {
        setUsernameMessage(`Username don't empty`);
        e.target.classList.add('border_danger');
      } else {
        setUsernameMessage('');
        e.target.classList.remove('border_danger');
      }
    };
    //validate password
    const handleKeyupPass = (e) => {
      if (e.target.value === '') {
        setPasswordMessage(`Password don't empty`);
        e.target.classList.add('border_danger');
      } else {
        setPasswordMessage('');
        e.target.classList.remove('border_danger');
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

  /* login admin */
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (username !== '' && password !== '' && usernameMessage === '' && passwordMessage === '') {
      const LoginAdmin = async () => {
        try {
          axios.get('/sanctum/csrf-cookie');
          const res = await axios.post('/api/admin/admin-login', { username, password });
          if (res.data.token) {
            dispatch(setSession(res.data.token, 'adminToken'));
            navigate(`${config.adminRoutes.Home}`);
          } else {
            passwordRef.current.classList.add('border_danger');
            usernameRef.current.classList.add('border_danger');
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
                autoComplete="username"
                placeholder="username"
              />
              <MessageDanger message={usernameMessage} classNames={cx('message')} />
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
                autoComplete="current-password"
                className="form-control form-control-lg"
                type="password"
                placeholder="password"
              />
              <MessageDanger message={passwordMessage} classNames={cx('message')} />
            </div>
            <MessageDanger message={messageSubmitError} classNames={cx('message_submit-error')} />
            <Button className={cx('btn-login', 'text-capitolize')} gradient_primary>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
