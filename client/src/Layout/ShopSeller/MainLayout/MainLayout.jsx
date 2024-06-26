import classNames from 'classnames/bind';

import styles from './MainLayout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import Seller from '~/layout/Component/Seller';

const cx = classNames.bind(styles);

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const seller = useSelector((state) => state.Auth.seller);

  useEffect(() => {
    const token = localStorage.getItem('sellerToken');
    if (!token) {
      navigate(config.ShopSeller.SignIn);
    }
  }, []);
  useEffect(() => {
    if (!seller?.email_verified_at) {
      navigate(config.ShopSeller.VerifiedEmail);
    } else if (!seller?.shop_id) {
      navigate(config.ShopSeller.RegisterShop);
    }
  }, []);
  return (
    <Seller>
      <Header />
      <main className={cx('seller_main')}>{children}</main>
      <Footer />
    </Seller>
  );
}
