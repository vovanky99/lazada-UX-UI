import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

export default function Modal({ children }) {
  return (
    <div className={cx('wrapper')} tabIndex={-1} role="dialog">
      <div className={cx('main')}>{children}</div>
    </div>
  );
}
