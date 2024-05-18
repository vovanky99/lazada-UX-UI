import classNames from 'classnames/bind';

import styles from './SideBar.module.scss';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faShop, faUserTie } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { NavLink } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

export default function SideBar() {
  const admin = useSelector((state) => state.Auth.admin);
  return (
    <>
      <aside id="sidebar" className={cx('sidebar', 'd-flex flex-column ')}>
        <NavLink
          to={config.adminRoutes.AllAdmin}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">admin</p>
          <FontAwesomeIcon icon={faUserTie} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.AllShop}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">shop</p>
          <FontAwesomeIcon icon={faShop} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.Location}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">location</p>
          <FontAwesomeIcon icon={faGlobe} />
        </NavLink>
      </aside>
    </>
  );
}
