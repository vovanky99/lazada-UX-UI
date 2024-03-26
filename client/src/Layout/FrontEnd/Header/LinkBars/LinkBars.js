import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './LinkBars.module.scss';
import GetTheApp from './GetTheApp';
import useAuthContext from '~/contexts/Auth/AuthContent';

import routes from '~/config/routes';
import config from '~/config';
const cx = classNames.bind(styles);

function LinkBars({ IDLinkBars }) {
  const { user, getUser, Logout } = useAuthContext();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);
  const handleLogout = () => {
    Logout();
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
                    <Link>My Order</Link>
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
