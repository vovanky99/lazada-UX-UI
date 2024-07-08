import classNames from 'classnames/bind';

import styles from './MainLayout.module.scss';
import Header from '../Header';
import Seller from '~/layout/Component/Seller';
import SideBar from '../SideBar';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

export default function MainLayout({ children }) {
  const { seller } = useSelector((state) => state.Auth);
  return (
    <Seller>
      <div className={cx('wrapper', 'd-flex flex-row')}>
        <Header title="seller_centre" />
        <SideBar />
        {seller?.shop?.status && <main className={cx('seller_main')}>{children}</main>}
      </div>
    </Seller>
  );
}
