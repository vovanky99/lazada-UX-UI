import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './MainLayout.module.scss';
import Header from '../Header';
import SideBar from '../SideBar';
import { useLocation, useNavigate } from 'react-router-dom';
import Store from '~/Redux/Store';
import { getAdmin } from '~/Redux/Actions/Auth';
import axios from '~/api/axios';

const cx = classNames.bind(styles);

export default function MainLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  /* get admin  */
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');

    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
      Store.dispatch(getAdmin(adminToken));
    } else {
      navigate('/admin/auth/login');
    }
  }, [localStorage.getItem('adminToken')]);

  return (
    <>
      <Header />
      <SideBar />
      <div className={cx('main')}>{children}</div>
    </>
  );
}
