import { forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

const PauseIcon = forwardRef(function PauseIcon({ className, onClick, style, ...passProps }, ref) {
  const props = {
    onClick,
    ...passProps,
  };
  return (
    <svg
      className={cx('icon', className)}
      {...props}
      style={style}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-577.000000, -295.000000)" stroke="#FFFFFF">
          <g transform="translate(578.000000, 296.000000)">
            <g fill="#000000" fillOpacity="0.5">
              <circle cx="36" cy="36" r="36.5"></circle>
            </g>
            <g transform="translate(28.000000, 19.000000)" strokeLinecap="round">
              <line x1="0.5" y1="0.5" x2="0.5" y2="33.5" strokeWidth="6"></line>
              <line x1="16.5" y1="0.5" x2="16.5" y2="33.5" strokeWidth="6"></line>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
});

export default PauseIcon;
