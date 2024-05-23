import classNames from 'classnames/bind';
import styles from '../Admin.module.scss';

const cx = classNames.bind(styles);

export default function AllAdmin() {
  return (
    <>
      <div className={cx('main_admin')}></div>
    </>
  );
}
