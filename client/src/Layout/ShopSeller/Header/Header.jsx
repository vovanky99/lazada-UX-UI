import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import config from '~/config';

import styles from '~/layout/ShopSeller/MainLayout/MainLayout.module.scss';
import { SellerLogout } from '~/redux/Actions/Auth';

const cx = classNames.bind(styles);

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    dispatch(SellerLogout());
    localStorage.removeItem('sellerToken');
    navigate(config.ShopSeller.SignIn);
  };
  return (
    <>
      <header className={cx('seller_header')}>
        <Button onClick={handleLogout}>Logout</Button>
      </header>
    </>
  );
}
