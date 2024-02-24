import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';

import styles from './Header.module.scss';
import LinkBars from './LinkBars';
import LogoBars from './LogoBars';
import MenuCategory from './MenuCategory';
import { publicRoutes } from '~/Routes';

const cx = classNames.bind(styles);

function Header() {
  useEffect(() => {
    window.onscroll = function () {
      myfunction();
    };

    let header = document.getElementById('header');
    let sticky = header.offsetTop;
    let id_linkbars = document.getElementById('id_linkbars');

    function myfunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky_header');
      } else {
        header.classList.remove('sticky_header');
        id_linkbars.style['display'] = 'flex';
      }

      if (window.pageYOffset > 700) {
        id_linkbars.style['display'] = 'none';
      }
    }
  }, []);
  return (
    <header id="header" className={cx('wrapper')}>
      <div className={cx('header')}>
        <LinkBars IDLinkBars="id_linkbars" />
        <LogoBars />
      </div>
      <div className={cx('pages-categories')}>{!publicRoutes[0].path === '/' && <MenuCategory />}</div>
    </header>
  );
}
export default Header;
