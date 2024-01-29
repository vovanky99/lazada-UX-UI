import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Row, Col, Stack } from 'react-bootstrap';

import styles from './LinkBars.module.scss';
import GetTheApp from './GetTheApp';
import { Link } from 'react-router-dom';
import useAuthContext from '~/contexts/Auth/AuthContent';

import routes from '~/config/routes';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function LinkBars() {
  const { user, getUser } = useAuthContext();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('link-list', 'd-flex gap-5')} xs={'auto'}>
        <div>
          <span className={cx('cursor')}></span>
        </div>
        <div>
          <Tippy
            interactive
            trigger="click"
            render={(attrs) => (
              <div className={cx('get-the-app')} tabIndex="-1" {...attrs}>
                <GetTheApp />
              </div>
            )}
          >
            <span className={cx('cursor')}>Save more on app</span>
          </Tippy>
        </div>
        <div>
          <a className={cx('cursor')}>Sell On lazada </a>
        </div>

        <div>
          <a className={cx('cursor', 'grey')}>customer Care</a>
        </div>
        <div>
          <span className={cx('cursor', 'grey')}>Track My Order</span>
        </div>
        {user?.name ? (
          <div>
            <Link to={routes.signIn} className={cx('cursor', 'grey')}>
              {user?.name}
            </Link>
          </div>
        ) : (
          <div className={cx('d-flex gap-5')}>
            <div>
              <Link to={routes.signIn} className={cx('cursor', 'grey')}>
                Login
              </Link>
            </div>
            <div>
              <Link to={routes.register} className={cx('cursor', 'grey')}>
                Sigup
              </Link>
            </div>
          </div>
        )}
        <div>
          <span className={cx('cursor', 'grey')}>Change Language</span>
        </div>
      </div>
    </div>
  );
}
export default LinkBars;
