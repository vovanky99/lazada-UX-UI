import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '~/api/axios';

import { Logout, getUser } from '~/Redux/Actions/Auth';
import styles from './LinkBars.module.scss';
import routes from '~/config/routes';
import config from '~/config';
import { useEffect } from 'react';
import Store from '~/Redux/Store';

const cx = classNames.bind(styles);

function LinkBars({ IDLinkBars }) {
  //login action
  const csrf = () => axios.get('/sanctum/csrf-cookie');
  const dispatch = useDispatch;
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth.user);

  // user logined
  useEffect(() => {
    const logined = () => {
      if (
        localStorage.getItem('token') &&
        (location.pathname == routes.register || location.pathname == routes.signIn)
      ) {
        navigate('/');
      }
    };
    logined();
  }, [location.pathname, localStorage.getItem('token')]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          csrf();
          // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          const res = await axios.get('/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { token },
          });
          Store.dispatch(getUser(res.data));
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [token]);

  const handleLogout = () => {
    Store.dispatch(Logout());
  };

  return (
    <div id={IDLinkBars} className={cx('wrapper')}>
      <div className={cx('link-list', 'd-flex gap-5 justify-content-end py-1')}>
        {user?.name ? (
          <Tippy
            interactive
            offset={[0, 10]}
            trigger="click"
            render={(attrs) => (
              <div className={cx('get-the-user')} tabIndex="-1" {...attrs}>
                <ul className=" text-capitalize">
                  <li>
                    <Link to={config.routes.profile}>My Account</Link>
                  </li>
                  <li>
                    <Link to={config.routes.purchaseOrder}>My Order</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          >
            <div className={cx('usersname', 'grey')}>{user?.name}</div>
          </Tippy>
        ) : (
          <div className={cx('d-flex gap-5')}>
            <div className="col">
              <Link to={routes.signIn} className={cx('cursor', ' grey')}>
                Login
              </Link>
            </div>
            <div className="col">
              <Link to={routes.register} className={cx('cursor', ' grey')}>
                Sigup
              </Link>
            </div>
          </div>
        )}
        <div className="">
          <span className={cx('cursor', 'grey')}>Change Language</span>
        </div>
      </div>
    </div>
  );
}
export default LinkBars;
