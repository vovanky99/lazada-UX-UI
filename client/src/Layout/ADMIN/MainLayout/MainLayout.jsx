import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './MainLayout.module.scss';
import { getAdmin, setSession } from '~/redux/Actions/Auth';
import BreadCrumb from '~/layout/Component/BreadCrumb';
import config from '~/config';
import Header from '../Header';
import SideBar from '../SideBar';
import Store from '~/redux/Store';
import axios from '~/api/axios';

const cx = classNames.bind(styles);

export default function MainLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const params = useParams();
  const isAdminAuth = useSelector((state) => state.Auth.adminAuthenticated);
  const [breadCrumb, setBreadCrumb] = useState(false);
  const [path, setPath] = useState(null);

  /* get admin  */
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      Store.dispatch(setSession(token, 'adminToken'));
      Store.dispatch(getAdmin());
    } else {
      navigate(`${config.adminRoutes.SignIn}`);
    }
  }, [localStorage.getItem('adminToken')]);

  /* show hide breadcrumb */
  const Path = location.pathname;
  useEffect(() => {
    if (!params.length) {
      if (location.pathname.split('/').slice(1).length > 1) {
        setBreadCrumb(true);
      } else {
        setBreadCrumb(false);
      }
      setPath(location.pathname);
    }
  }, [breadCrumb, Path]);
  return (
    <>
      {isAdminAuth ? (
        <>
          <Header />
          <div className={cx('main_admin', 'd-flex flex-row')}>
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
