import classNames from 'classnames/bind';
import styles from '~/pages/ADMIN/Auth/Auth.module.scss';
import Button from '~/components/Button';
import config from '~/config';
import AdminLogo from '~/layout/Component/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from '~/api/axios';
import { setSession } from '~/redux/Actions/Auth';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import { useDispatch } from 'react-redux';
import LocalStorageService from '~/services/LocalStorageService';
import { useImmer } from 'use-immer';
import { LoginAdmin } from '~/api/Auth/Admin';
import Country from '~/layout/Component/Country';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const validMessage = Translate({ children: 'login_error' });
  const [login, setLogin] = useImmer({
    username: '',
    password: '',
  });
  const [messageSubmitError, setMessageSubmitError] = useState('');

  /* redirect when admin had login  */
  useEffect(() => {
    if (LocalStorageService.getItem('adminToken')) {
      return navigate(`${config.adminRoutes.Home}`);
    }
  }, []);

  //validate username
  useEffect(() => {
    const u = usernameRef.current;
    const handleKeyupUsername = (e) => {
      if (e.target.value === '') {
        e.target.classList.add('border_danger');
      } else {
        e.target.classList.remove('border_danger');
      }
    };
    if (u) {
      u.addEventListener('keyup', handleKeyupUsername);
    }
    return () => {
      if (u) {
        u.removeEventListener('keyup', handleKeyupUsername);
      }
    };
  }, [login.username]);

  //validate password
  useEffect(() => {
    const p = passwordRef.current;
    const handleKeyupPass = (e) => {
      if (e.target.value === '') {
        e.target.classList.add('border_danger');
      } else {
        e.target.classList.remove('border_danger');
      }
    };
    if (p) {
      p.addEventListener('change', handleKeyupPass);
    }
    return () => {
      if (p) {
        p.removeEventListener('change', handleKeyupPass);
      }
    };
  }, [login.password]);

  /* login admin */
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (login.username !== '' && login.password !== '') {
      LoginAdmin(login).then((result) => {
        if (result.token) {
          dispatch(setSession(result.token, 'adminToken'));
          navigate(`${config.adminRoutes.Home}`);
        } else {
          passwordRef.current.classList.add('border_danger');
          usernameRef.current.classList.add('border_danger');
          setMessageSubmitError();
        }
      });
    }
  };
  return (
    <Country>
      <section className={cx('login')}>
        <div className={cx('login_content', ' d-flex justify-content-center align-items-center')}>
          <div className={cx('login_content_contain', 'd-flex justify-content-center flex-column')}>
            <h1 className={cx('logo')}>
              <AdminLogo data />
            </h1>
            <h4 className={cx('hello', 'fw-bold')}>
              <Translate>admin_hello</Translate>
            </h4>
            <h6>
              <Translate>admin_login_note</Translate>
            </h6>
            <form onSubmit={handleSubmitLogin} className={cx('form')} noValidate>
              <div className={cx('username', 'form-group')}>
                <input
                  className="form-control form-control-lg"
                  ref={usernameRef}
                  value={login.username}
                  onChange={(e) => {
                    setLogin((draft) => {
                      draft.username = e.target.value;
                    });
                  }}
                  type="text"
                  autoComplete="username"
                  placeholder={Translate({ children: 'username' })}
                />
              </div>
              <div className={cx('forget-pass', 'form-group d-flex flex-row justify-content-end')} tabIndex={-1}>
                <Link to={config.adminRoutes.ResetPassword}>
                  <Translate>forget_password</Translate>
                </Link>
              </div>
              <div className={cx('password', 'form-group')}>
                <input
                  ref={passwordRef}
                  value={login.password}
                  onChange={(e) => {
                    setLogin((draft) => {
                      draft.password = e.target.value;
                    });
                  }}
                  autoComplete="current-password"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder={Translate({ children: 'password' })}
                />
              </div>
              <div className={cx('form_footer')}>
                <MessageDanger message={messageSubmitError} classNames={cx('message_submit-error')} />
                <Button className={cx('btn-login', 'text-capitalize')} gradient_primary>
                  <Translate>sign_in</Translate>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Country>
  );
}
