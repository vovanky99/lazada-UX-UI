import classNames from 'classnames/bind';

import styles from './Mesage.module.scss';

const cx = classNames.bind(styles);

export default function MessageDanger({ message, classNames }) {
  return (
    <>
      {message ? (
        <div className={cx('message', classNames + ' text-center text-danger text-capitalize')}>{message}</div>
      ) : (
        <></>
      )}
    </>
  );
}
