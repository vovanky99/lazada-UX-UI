import classNames from 'classnames/bind';

import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

export default function Category({ fill, strokeWidth, className = '' }) {
  return (
    <>
      <svg
        className={cx('category', className + '')}
        // aria-hidden="true"
        // focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
      >
        <clipPath></clipPath>
      </svg>
    </>
  );
}
