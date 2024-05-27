import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faPen, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import style from './SideBar.module.scss';
import routes from '~/config/routes';
import Images from '~/components/Images';
import { faBell, faUser } from '@fortawesome/fontawesome-free-regular';
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(style);

function SideBar() {
  const navigate = useNavigate();

  const handleProfile = () => {
    document.getElementById('account-list-group').style['display'] = 'flex';
    navigate(routes.profile);
  };

  const handleClickItem = () => {
    document.getElementById('account-list-group').style['display'] = 'flex';
  };

  //customise active Navlink react router dom
  useEffect(() => {
    const active = document.querySelector('.active');
    active.style['color'] = '#ee4d2d';
  }, []);
  return (
    <div className={cx('wrapper', 'd-flex flex-column')}>
      <div className={cx('account-hd', 'd-flex flex-row align-items-center')}>
        <div onClick={handleProfile}>
          <div className={cx('img')}>
            <Images
              src="https://down-vn.img.susercontent.com/file/438ac806ce989d6ef1013207c531b451_tn"
              alt="https://down-vn.img.susercontent.com/file/438ac806ce989d6ef1013207c531b451_tn"
              className={cx('rounded-circle')}
            />
          </div>
        </div>
        <div className={cx('nickname', 'd-flex flex-column')}>
          <b>nsjskskw</b>
          <div onClick={handleProfile} className={cx('edit-profile', 'text-capitalize')}>
            <FontAwesomeIcon icon={faPen} className="me-2" />
            Edit Profile
          </div>
        </div>
      </div>
      <div className={cx('acount-ft', 'd-flex flex-column')}>
        <div className={cx('my-account', 'd-flex flex-column')}>
          <h4 onClick={handleProfile}>
            <FontAwesomeIcon icon={faUser} className="me-2" /> My Account
          </h4>
          <div id="account-list-group" className={cx('list-group', 'flex-column')}>
            <NavLink onClick={handleClickItem} to={routes.profile} className={cx('list-group-items')}>
              Profile
            </NavLink>
            <NavLink onClick={handleClickItem} to={routes.bank} className={cx('list-group-items')}>
              Bank & Cards
            </NavLink>
            <NavLink onClick={handleClickItem} to={routes.address} className={cx('list-group-items')}>
              Address
            </NavLink>
            <NavLink onClick={handleClickItem} to={routes.changePassword} className={cx('list-group-items')}>
              Change Password
            </NavLink>
            <NavLink onClick={handleClickItem} to={routes.changePassword} className={cx('list-group-items')}>
              Notification Settings
            </NavLink>
          </div>
        </div>
        <div className={cx('purchase-order')}>
          <NavLink to={routes.purchaseOrder}>
            <FontAwesomeIcon icon={faMoneyBill1} className="me-2" /> My Purchase
          </NavLink>
        </div>
        <div className={cx('notification')}>
          <NavLink to={routes.notification}>
            <FontAwesomeIcon icon={faBell} className="me-2" /> Notification
          </NavLink>
        </div>
        <div className={cx('voucher')}>
          <NavLink to={routes.voucher}>
            <FontAwesomeIcon icon={faTicket} className="me-2" /> Voucher
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
