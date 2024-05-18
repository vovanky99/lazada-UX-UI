import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './MainLayout.module.scss';
import Header from '../Header';
import SideBar from '../SideBar';
import Store from '~/Redux/Store';
import { getAdmin } from '~/Redux/Actions/Auth';
import axios from '~/api/axios';
import BreadCrumb from '~/components/BreadCrumb';
import config from '~/config';

const cx = classNames.bind(styles);

export default function MainLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const isAdminAuth = useSelector((state) => state.Auth.adminAuthenticated);
  const [breadCrumb, setBreadCrumb] = useState(false);
  const [path, setPath] = useState(null);

  /* get admin  */
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');

    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
      Store.dispatch(getAdmin(adminToken));
    } else {
      navigate(`${config.adminRoutes.SignIn}`);
    }
  }, [localStorage.getItem('adminToken')]);

  /* show hide breadcrumb */
  useEffect(() => {
    if (!params.length) {
      if (location.pathname.split('/').slice(1).length > 1) {
        setBreadCrumb(true);
      } else {
        setBreadCrumb(false);
      }
      setPath(location.pathname);
    }
  }, [breadCrumb, location.pathname]);
  return (
    <>
      {isAdminAuth ? (
        <>
          <Header />
          <div className={cx('main', 'd-flex flex-row')}>
            <SideBar />
            <main className={cx('main-content', 'd-flex flex-column flex-grow-1')}>
              {breadCrumb ? <BreadCrumb path={path} isAdmin /> : ''}
              <section className={cx('content')}>{children}</section>
            </main>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}
