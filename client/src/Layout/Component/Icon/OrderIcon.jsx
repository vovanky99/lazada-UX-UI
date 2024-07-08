import { forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

const OrderIcon = forwardRef(function OrderIcon({ className, onClick, ...passProps }, ref) {
  const props = {
    onClick,
    ...passProps,
  };
  return (
    <svg className={cx('icon', className)} {...props} ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 3v1.5h-3V21h15V4.5h-3V3h3A1.5 1.5 0 0 1 21 4.5V21a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 21V4.5A1.5 1.5 0 0 1 4.5 3h3Zm.75 10.5h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5Zm0-4.5h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5ZM9 3v1.5h6V3H9Zm0-1.5h6A1.5 1.5 0 0 1 16.5 3v1.5A1.5 1.5 0 0 1 15 6H9a1.5 1.5 0 0 1-1.5-1.5V3A1.5 1.5 0 0 1 9 1.5Z"
      ></path>
    </svg>
  );
});

export default OrderIcon;
