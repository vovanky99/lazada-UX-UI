import { forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

const ChatIcon = forwardRef(function ChatIcon({ className, onClick, ...passProps }, ref) {
  const props = {
    onClick,
    ...passProps,
  };
  return (
    <svg className={cx('icon', className)} {...props} ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.2749 16.6001L7.43622 18.5359C7.47221 18.9678 7.83327 19.3 8.26667 19.3H17.7599L19.6331 20.8609C20.1759 21.3133 20.9999 20.9273 20.9999 20.2208V19.3V17.5V9.33333C20.9999 8.8731 20.6268 8.5 20.1666 8.5H18.8554L18.3615 14.9381C18.2894 15.8759 17.5074 16.6001 16.5668 16.6001H7.2749Z"
        fill="white"
        stroke="#333"
        strokeWidth="0.5"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.83333 4.00006C3.3731 4.00006 3 4.37316 3 4.83339V15.7001H3.00016V16.6209C3.00016 17.3275 3.82421 17.7134 4.36698 17.2611L6.24024 15.7001H16.6283C17.0638 15.7001 17.4258 15.3648 17.4592 14.9306L18.231 4.89731C18.2682 4.41331 17.8855 4.00006 17.4001 4.00006H3.83333Z"
        fill="white"
        stroke="#333"
        strokeWidth="0.5"
      ></path>
      <path
        d="M12.5111 9.01116C12.3024 9.21995 12.01 9.38827 11.6468 9.5134C11.1266 9.6926 10.6105 9.75007 10.2 9.75007C9.78956 9.75007 9.27348 9.6926 8.75329 9.5134C8.39005 9.38827 8.09774 9.21995 7.88896 9.01116C7.67417 8.79638 7.32593 8.79638 7.11114 9.01116C6.89635 9.22595 6.89635 9.57419 7.11114 9.78898C7.45353 10.1314 7.89135 10.3799 8.39501 10.5534C9.05439 10.7806 9.68093 10.8501 10.2 10.8501C10.7192 10.8501 11.3457 10.7806 12.0051 10.5534C12.5088 10.3799 12.9466 10.1314 13.289 9.78898C13.5037 9.57419 13.5037 9.22595 13.289 9.01116C13.0742 8.79638 12.7259 8.79638 12.5111 9.01116Z"
        // fill="#EE4D2D"
        stroke="#333"
        strokeWidth="0.3"
      ></path>
    </svg>
  );
});

export default ChatIcon;
