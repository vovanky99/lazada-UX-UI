import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Logout } from '~/Redux/Actions/Auth';
import axios from '~/api/axios';
import styles from './LinkBars.module.scss';
import routes from '~/config/routes';
import config from '~/config';
import Store from '~/Redux/Store';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function LinkBars({ IDLinkBars }) {
  const user = useSelector((state) => state.Auth.user);

  const handleLogout = () => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem('token');
        const cookie = document.cookie;
        if (token && cookie) {
          await axios.post('/api/logout');
          document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=';
          localStorage.removeItem('token');
          Store.dispatch(Logout());
        } else {
          await axios.post('/api/logout');
          localStorage.removeItem('token');
          Store.dispatch(Logout());
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
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
