import classNames from 'classnames/bind';

import styles from './MainLayout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { getSeller, setSession } from '~/redux/Actions/Auth';
import axios from '~/api/axios';
import Store from '~/redux/Store';

const cx = classNames.bind(styles);

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.Auth.seller);

  useEffect(() => {
    const token = localStorage.getItem('sellerToken');
    if (token) {
      Store.dispatch(setSession(token, 'sellerToken'));
      dispatch(getSeller());
    }
  }, []);
  // useEffect(() => {
  //   if (!seller.email_verified_at) {
  //     navigate(config.ShopSeller.VerifiedEmail);
  //   }
  // }, []);
  return (
    <>
      <Header />
      <main className={cx('seller_main')}>{children}</main>
      <Footer />
    </>
  );
}
