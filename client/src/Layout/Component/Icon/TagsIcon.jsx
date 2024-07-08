import { forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

const TagsIcon = forwardRef(function TagsIcon({ className, onClick, ...passProps }, ref) {
  const props = {
    onClick,
    ...passProps,
  };
  return (
    <svg className={cx('icon', className)} {...props} ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.233 1.656a1.5 1.5 0 0 1 1.065.44l9.295 9.293a1.5 1.5 0 0 1 0 2.122l-8.174 8.173a1.5 1.5 0 0 1-2.121 0L2.004 12.39a1.5 1.5 0 0 1-.44-1.066l.03-8.891a.75.75 0 0 1 .747-.748l8.892-.029Zm.005 1.5-8.147.027-.027 8.146 9.295 9.294 8.173-8.173-9.294-9.294Zm-4.424 1.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Zm0 1.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
      ></path>
    </svg>
  );
});

export default TagsIcon;
