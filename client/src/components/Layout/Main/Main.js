import classNames from 'classnames/bind';
import styles from './Main.module.scss';

const cx = classNames.bind(styles);

export default function Main({ children }) {
  return <main className={cx('wrapper')}>{children}</main>;
}
