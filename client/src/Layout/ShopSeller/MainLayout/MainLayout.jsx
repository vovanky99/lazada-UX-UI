import classNames from 'classnames/bind';

import styles from './MainLayout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import Seller from '~/layout/Component/Seller';

const cx = classNames.bind(styles);

export default function MainLayout({ children }) {
  return (
    <Seller>
      <Header />
      <main className={cx('seller_main')}>{children}</main>
      <Footer />
    </Seller>
  );
}
