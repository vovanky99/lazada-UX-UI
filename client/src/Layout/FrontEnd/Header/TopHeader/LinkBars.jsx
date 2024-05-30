import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Logout, setSession } from '~/redux/Actions/Auth';
import styles from './LinkBars.module.scss';
import routes from '~/config/routes';
import config from '~/config';
import Store from '~/redux/Store';

const cx = classNames.bind(styles);

function LinkBars({ IDLinkBars }) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    const fetchData = async () => {
      let token = localStorage.getItem('token');
      const cookie = document.cookie;
      if (token && cookie) {
        Store.dispatch(Logout());
        document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=';
        dispatch(setSession('', 'token'));
      } else {
        Store.dispatch(Logout());
        dispatch(setSession('', 'token'));
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
