import classNames from 'classnames/bind';

import styles from './Mesage.module.scss';

const cx = classNames.bind(styles);

export default function MessageSuccess({ message, classNames }) {
  return (
    <>
      {message ? (
        <div className={cx('message', classNames + ' text-center text-success text-capitalize')}>{message}</div>
      ) : (
        ''
      )}
    </>
  );
}
