import classNames from 'classnames/bind';
import style from './SideBar.module.scss';

const cx = classNames.bind(style);

function SideBar({ children }) {
  return <div className={cx('wrapper')}>{children}</div>;
}

export default SideBar;
