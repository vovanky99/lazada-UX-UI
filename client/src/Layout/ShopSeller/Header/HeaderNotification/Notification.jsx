import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import styles from '../Header.module.scss';
import NotificationIcon from '~/layout/Component/Icon/NotificationIcon';
import useDebounce from '~/hooks/Debounce';
import Translate from '~/layout/Component/Translate';
import ScrollY from '~/layout/Component/ScrollY';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

export default function Notification() {
  const [NTFcation, setNTFcation] = useState(false);
  const notifi = useDebounce(NTFcation, 500);
  const handleOnMouseOver = () => {
    setNTFcation(true);
  };
  const handleOnMouseLeave = () => {
    setNTFcation(false);
  };
  return (
    <Fragment>
      <div className={cx('notification')} onMouseLeave={handleOnMouseLeave} onMouseOver={handleOnMouseOver}>
        <Tippy
          interactive
          visible={notifi}
          render={(attrs) => (
            <div className={cx('notification_wrapper')} tabIndex="-1" {...attrs}>
              <div className={cx('notification_container', 'd-flex flex-row justify-content-between')}>
                <div className={cx('notification_header')}>
                  <div className={cx('header_notification_left')}>
                    <Translate>notofication.notofication_recent</Translate>
                  </div>
                  <Button className={cx('header_notification_right')}>
                    <Translate>notofication.mark_all_read</Translate>
                  </Button>
                </div>
                <ScrollY>
                  <div className={cx('notification_content')}>
                    <Link></Link>
                  </div>
                </ScrollY>
                <div className={cx('notification_footer')}>
                  <Translate>notofication.all_notification</Translate>
                </div>
              </div>
            </div>
          )}
        >
          <div className={cx('icon')}>
            <NotificationIcon />
          </div>
        </Tippy>
      </div>
    </Fragment>
  );
}
