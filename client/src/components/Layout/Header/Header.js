import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';

import styles from './Header.module.scss';
import LinkBars from './LinkBars';
import LogoBars from './LogoBars';
import MenuCategory from './MenuCategory';
import { publicRoutes } from '~/Routes';

const cx = classNames.bind(styles);

function Header() {
  return (
    <header id="header" className={cx('wrapper')}>
      <div className={cx('header')}>
        <LinkBars />
        <LogoBars />
      </div>
      <div className={cx('pages-categories')}>{!publicRoutes[0].path === '/' && <MenuCategory />}</div>
    </header>
  );
}
export default Header;
