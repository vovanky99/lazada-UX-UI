import { forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

const WalletIcon = forwardRef(function WalletIcon({ className, onClick, ...passProps }, ref) {
  const props = {
    onClick,
    ...passProps,
  };
  return (
    <svg className={cx('icon', className)} {...props} ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5 3A1.5 1.5 0 0 1 18 4.5V6h2.788c.419 0 .67.048.932.189.253.135.456.338.591.591.14.262.189.513.189.931V20.79c0 .418-.049.669-.189.931a1.432 1.432 0 0 1-.591.591c-.262.14-.513.189-.931.189H6.633c-1.027 0-1.546-.1-2.087-.39a2.795 2.795 0 0 1-1.158-1.157C3.1 20.413 3 19.893 3 18.866V5.25A2.25 2.25 0 0 1 5.25 3H16.5Zm-12 4.372v11.494c0 .8.055 1.086.212 1.38.126.235.307.416.543.542.293.157.578.212 1.38.212l14.3-.001c.03-.001.048-.003.06-.005l.004-.06L21 16.5h-3.75a2.25 2.25 0 0 1 0-4.5H21l-.001-4.434a.443.443 0 0 0-.005-.06l-.06-.005L5.25 7.5c-.263 0-.515-.045-.75-.128ZM21 13.5h-3.75a.75.75 0 0 0 0 1.5H21v-1.5Zm-4.5-9H5.25a.75.75 0 0 0 0 1.5H16.5V4.5Z"
      ></path>
    </svg>
  );
});

export default WalletIcon;
