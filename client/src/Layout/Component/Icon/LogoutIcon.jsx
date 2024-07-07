import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

const LogoutIcon = forwardRef(function LogoutIcon({ className }, ref) {
  return (
    <svg ref={ref} className={cx('icon', className)} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-1.5a.5.5 0 0 0-1 0V13H1V1h7v1.5a.5.5 0 0 0 1 0V1Z"></path>
      <path d="M10.354 3.856a.5.5 0 0 1 .707 0l2.828 2.829a.5.5 0 0 1 0 .707l-.004.004-2.824 2.824a.5.5 0 1 1-.707-.707l2.01-2.01H4.5a.5.5 0 1 1 0-1h7.793l-1.94-1.94a.5.5 0 0 1 0-.707Z"></path>
    </svg>
  );
});

export default LogoutIcon;
