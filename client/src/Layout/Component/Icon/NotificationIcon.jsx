import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

const NotificationIcon = forwardRef(function NotificationIcon({ className }, ref) {
  return (
    <svg ref={ref} className={cx('icon', className)} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 0a.5.5 0 0 0-.5.5v.593a5.4 5.4 0 0 0-4.383 4.892L2.077 13H1.5a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1h-.577l-.54-7.015A5.4 5.4 0 0 0 9 1.093V.5a.5.5 0 0 0-.5-.5h-1ZM8 2a4.4 4.4 0 0 0-4.386 4.062L3.08 13h9.84l-.534-6.938A4.4 4.4 0 0 0 8 2Zm1 14a1 1 0 0 0 1-1H6a1 1 0 0 0 1 1h2Z"
      ></path>
    </svg>
  );
});

export default NotificationIcon;
