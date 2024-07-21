import classNames from 'classnames/bind';

import styles from './SideBar.module.scss';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBlog,
  faBuilding,
  faCartShopping,
  faFlag,
  faGauge,
  faGlobe,
  faHeart,
  faIndustry,
  faShop,
  faTicket,
  faUser,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import config from '~/config';
import { faCriticalRole, faProductHunt } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

export default function SideBar() {
  const admin = useSelector((state) => state.Auth.admin);
  return (
    <>
      <aside id="sidebar" className={cx('sidebar', 'd-flex flex-column ')}>
        <NavLink
          to={`/admin`}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between')}
          end
        >
          <p className="text-capitalize">DashBoard</p>
          <FontAwesomeIcon icon={faGauge} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.Logo}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Logo</p>
          <FontAwesomeIcon icon={faHeart} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.AllAdmin}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">admin</p>
          <FontAwesomeIcon icon={faUserTie} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.AllUser}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">User</p>
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.AllShop}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">shop</p>
          <FontAwesomeIcon icon={faShop} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.AllProduct}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Product</p>
          <FontAwesomeIcon icon={faProductHunt} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.OrderProduct}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Order Product</p>
          <FontAwesomeIcon icon={faCartShopping} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.Voucher}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Voucher</p>
          <FontAwesomeIcon icon={faTicket} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.ReportProduct}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Report Product</p>
          <FontAwesomeIcon icon={faFlag} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.Category}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Category</p>
          <FontAwesomeIcon icon={faGlobe} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.Blogs}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Bolgs</p>
          <FontAwesomeIcon icon={faBlog} />
        </NavLink>

        <NavLink
          to={config.adminRoutes.Role}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Role</p>
          <FontAwesomeIcon icon={faCriticalRole} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.Department}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Department</p>
          <FontAwesomeIcon icon={faBuilding} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.Manufacturer}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Manufacturer</p>
          <FontAwesomeIcon icon={faIndustry} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.Location}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">location</p>
          <FontAwesomeIcon icon={faGlobe} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.Attributes}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Attributes</p>
          <FontAwesomeIcon icon={faGlobe} />
        </NavLink>
        <NavLink
          to={config.adminRoutes.Attributes_product}
          className={cx('sidebar_element', 'd-flex flex-row align-items-center justify-content-between ')}
        >
          <p className="text-capitalize">Attributes Product</p>
          <FontAwesomeIcon icon={faGlobe} />
        </NavLink>
      </aside>
    </>
  );
}
