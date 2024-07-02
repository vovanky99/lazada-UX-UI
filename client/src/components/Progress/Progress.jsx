import classNames from 'classnames/bind';
import styles from './Progress.module.scss';

const cx = classNames.bind(styles);

export default function Progress() {
  return (
    <div className={cx('process')}>
      <div className={cx('bar')}></div>
      <div className={cx('progress')}></div>
    </div>
  );
}
