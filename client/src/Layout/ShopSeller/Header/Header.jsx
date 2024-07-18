import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Logo from '~/layout/Component/Logo';
import styles from './Header.module.scss';
import HeaderNotification from './HeaderNotification';
import Popover from './Popover';
import Account from './Account';
import Translates from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

export default function Header({ title, isRegisterShop = false }) {
  const { seller, sellerAuthenticated } = useSelector((state) => state.Auth);
  return (
    <>
      <header className={cx('seller_header', 'd-flex flex-row justify-content-between')}>
        <div className={cx('seller_header_left', 'd-flex flex-row align-items-center ')}>
          <div className={cx('logo')}>
            <Logo type="shop" />
          </div>
          <h2 className="text-capitalize">
            <Translates>{title}</Translates>
          </h2>
        </div>
        <div className={cx('seller_header_right', 'd-flex flex-row justify-content-end')}>
          {!isRegisterShop && (
            <Fragment>
              <div className={cx('header_action', 'd-flex align-items-center', 'd-flex flex-row ')}>
                <Popover />
                <HeaderNotification />
              </div>
              <div className={cx('action_splitter')}></div>
            </Fragment>
          )}
          <Account seller={seller} isRegisterShop={isRegisterShop} />
        </div>
      </header>
    </>
  );
}
