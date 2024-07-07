import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import styles from '../Header.module.scss';
import NotificationIcon from '~/layout/Component/Icon/NotificationIcon';

const cx = classNames.bind(styles);

export default function Notification() {
  const [NTFcation, setNTFcation] = useState(false);

  return (
    <Fragment>
      <Tippy
        interactive
        visible={NTFcation}
        render={(attrs) => (
          <div className={cx('seller_header_notification')} tabIndex="-1" {...attrs}>
            <div className={cx('header_notification', 'd-flex flex-row justify-content-between')}>
              <div className={cx('header_notification_left')}></div>
              <Button className={cx('header_notification_right')}></Button>
            </div>
          </div>
        )}
      >
        <div className={cx('icon')}>
          <NotificationIcon />
        </div>
      </Tippy>
    </Fragment>
  );
}
