import classNames from 'classnames/bind';

import styles from './MainLayout.module.scss';
import Header from '../Header';
import Seller from '~/layout/Component/Seller';
import SideBar from '../SideBar';

const cx = classNames.bind(styles);

export default function MainLayout({ children }) {
  return (
    <Seller>
      <div className={cx('wrapper', 'd-flex flex-row')}>
        <Header title="sellerCentre" />
        <SideBar />
        <main className={cx('seller_main')}>{children}</main>
      </div>
    </Seller>
  );
}
