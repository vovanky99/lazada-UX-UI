import { forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

const ChartsIcon = forwardRef(function ChartsIcon({ className, onClick, ...passProps }, ref) {
  const props = {
    onClick,
    ...passProps,
  };
  return (
    <svg className={cx('icon', className)} {...props} ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.75 3a.75.75 0 0 1 .75.75V21h17.25a.75.75 0 0 1 0 1.5h-18a.75.75 0 0 1-.75-.75v-18A.75.75 0 0 1 3.75 3Zm17.727 3.92a.75.75 0 0 1 .178.945l-.076.112-5.4 6.562a.75.75 0 0 1-.99.15l-.112-.089-2.116-2.057-4.882 5.934a.75.75 0 0 1-1.234-.842l.076-.112 5.4-6.562a.75.75 0 0 1 .99-.15l.112.089 2.116 2.057 4.882-5.934a.75.75 0 0 1 1.056-.102Z"
      ></path>
    </svg>
  );
});

export default ChartsIcon;
