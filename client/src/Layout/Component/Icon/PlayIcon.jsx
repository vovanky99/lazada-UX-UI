import { forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

const PlayIcon = forwardRef(function PlayIcon({ className, onClick, ...passProps }, ref) {
  const props = {
    onClick,
    ...passProps,
  };
  return (
    <svg className={cx('icon', className)} {...props} ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <circle cx="24" cy="24" r="24.333" fill="#000" fillOpacity=".5" stroke="#FFF" strokeWidth=".667"></circle>
        <path
          fill="#FFF"
          d="M27.7333333,17.4222222 L37.0666667,29.8666667 C37.5084945,30.4557704 37.3891037,31.2915055 36.8,31.7333333 C36.5692051,31.9064295 36.2884936,32 36,32 L17.3333333,32 C16.5969537,32 16,31.4030463 16,30.6666667 C16,30.378173 16.0935705,30.0974616 16.2666667,29.8666667 L25.6,17.4222222 C26.0418278,16.8331185 26.8775629,16.7137278 27.4666667,17.1555556 C27.5677409,17.2313612 27.6575277,17.321148 27.7333333,17.4222222 Z"
          transform="rotate(90 26.667 24)"
        ></path>
      </g>
    </svg>
  );
});

export default PlayIcon;
