import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Row, Col, Stack } from 'react-bootstrap';

import styles from './LinkBars.module.scss';
import GetTheApp from './GetTheApp';
const cx = classNames.bind(styles);

function LinkBars() {
  // const [name, setName] = useState(['']);
  // console.log(GetTheApp);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('link-list')} xs={'auto'}>
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
        <div>
          <a className={cx('cursor', 'grey')}>Login</a>
        </div>
        <div>
          <a className={cx('cursor', 'grey')}>Sigup</a>
        </div>
        <div>
          <span className={cx('cursor', 'grey')}>Change Language</span>
        </div>
      </div>
    </div>
  );
}
export default LinkBars;
