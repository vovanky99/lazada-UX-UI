import { forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

const ProductIcon = forwardRef(function ProductIcon({ className, onClick, ...passProps }, ref) {
  const props = {
    onClick,
    ...passProps,
  };
  return (
    <svg className={cx('icon', className)} {...props} ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.717 1.5a1.5 1.5 0 0 1 1.497 1.393l1.285 18a1.5 1.5 0 0 1-1.39 1.603l-.106.004H4.5A1.5 1.5 0 0 1 3 21l.004-.107 1.286-18A1.5 1.5 0 0 1 5.786 1.5h13.931Zm0 1.5H5.786L4.5 21h16.503L19.717 3ZM16.39 6.03a.75.75 0 0 1 .75.75c0 3.253-1.584 5.25-4.5 5.25s-4.5-1.997-4.5-5.25a.75.75 0 1 1 1.5 0c0 2.491.998 3.75 3 3.75 2.001 0 3-1.259 3-3.75a.75.75 0 0 1 .75-.75Z"
      ></path>
    </svg>
  );
});

export default ProductIcon;
