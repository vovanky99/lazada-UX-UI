import classNames from 'classnames/bind';

import styles from './Mesage.module.scss';

const cx = classNames.bind(styles);

export default function MessageText({ message, className }) {
  return (
    <>
      <div className={cx('message', className || ' text-center text-danger text-capitalize')}>{message}</div>
    </>
  );
}
