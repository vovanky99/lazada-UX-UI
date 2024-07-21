import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import styles from './MainLayout.module.scss';
import BreadCrumb from '~/layout/Component/BreadCrumb';
import Header from '../Header';
import SideBar from '../SideBar';
import Admin from '~/layout/Component/Admin';

const cx = classNames.bind(styles);

export default function MainLayout({ children }) {
  const location = useLocation();

  // const dispatch = useDispatch();
  const params = useParams();
  const Path = location.pathname;
  const [breadCrumb, setBreadCrumb] = useState(false);
  const [path, setPath] = useState(null);

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
  }, [breadCrumb, Path]);
  return (
    <Admin>
      <Header />
      <div className={cx('main_admin', 'd-flex flex-row')}>
        <SideBar />
        <main className={cx('main_content', 'd-flex flex-column flex-grow-1')}>
          {breadCrumb ? <BreadCrumb path={path} isAdmin /> : ''}
          <section className={cx('content', 'd-flex flex-column')}>{children}</section>
        </main>
      </div>
    </Admin>
  );
}
