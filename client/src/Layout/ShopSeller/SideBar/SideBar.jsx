import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import ScrollY from '~/layout/Component/ScrollY';
import OrderIcon from '~/layout/Component/Icon/OrderIcon';
import Translate from '~/layout/Component/Translate';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import config from '~/config';
import ProductIcon from '~/layout/Component/Icon/ProductIcon';
import TagsIcon from '~/layout/Component/Icon/TagsIcon';
import ChartsIcon from '~/layout/Component/Icon/ChartsIcon';
import WalletIcon from '~/layout/Component/Icon/WalletIcon';
import ChatIcon from '~/layout/Component/Icon/ChatIcon';
import ShopIcon from '~/layout/Component/Icon/ShopIcon';

const cx = classNames.bind(styles);

export default function SideBar() {
  useEffect(() => {
    const item = document.querySelectorAll('.toggle-item');
    const handleClick = (e) => {
      const { classList } = e.currentTarget;
      if (classList.contains('toggle_active')) {
        classList.remove('toggle_active');
      } else {
        classList.add('toggle_active');
      }
    };
    if (item) {
      item.forEach((d) => d.addEventListener('click', handleClick));
    }
    return () => {
      if (item) {
        item.forEach((d) => d.removeEventListener('click', handleClick));
      }
    };
  }, []);
  return (
    <aside id="seller_sidebar" className={cx('seller_sidebar')}>
      <ScrollY className={cx('seller_sidebar_wrapper')}>
        <div className={cx('seller_sidebar_container', 'd-flex flex-column')}>
          <div className={cx('sidebar_order', 'd-flex flex-column')}>
            <Button
              className={cx('toggle', 'toggle-item d-flex flex-row justify-content-between align-items-center')}
              transparent
            >
              <div className={cx('icon_contain')}>
                <OrderIcon />
              </div>
              <span className={cx('text-capitalize flex-grow-1 align-self-end text-start')}>
                <Translate>order.order_managemnet</Translate>
              </span>
              <div className={cx('icon')}>
                <FontAwesomeIcon icon={faChevronUp} />
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </Button>
            <nav className={cx('sidebar_order_content', 'content-item d-flex flex-column')}>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.ManagementOrder}>
                <Translate>order.my_order</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.ManagementOrderMassShipment}>
                <Translate>order.mass_ship</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={`${config.ShopSeller.ManagementOrder}?type=cancelled`}>
                <Translate>order.cancellation</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.ManagementOrder}>
                <Translate>order.return_refund</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.ManagementOrder}>
                <Translate>setting.setting_shipping</Translate>
              </NavLink>
            </nav>
          </div>
          <div className={cx('sidebar_order', 'd-flex flex-column')}>
            <Button
              className={cx('toggle', 'toggle-item d-flex flex-row justify-content-between align-items-center')}
              transparent
            >
              <div className={cx('icon_contain')}>
                <ProductIcon />
              </div>
              <span className={cx('text-capitalize flex-grow-1 align-self-end text-start')}>
                <Translate>products.product_management</Translate>
              </span>
              <div className={cx('icon')}>
                <FontAwesomeIcon icon={faChevronUp} />
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </Button>
            <nav className={cx('sidebar_order_content', 'content-item d-flex flex-column')}>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.AllProduct}>
                <Translate>products.my_products</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.NewProduct}>
                <Translate>products.add_new_products</Translate>
              </NavLink>
            </nav>
          </div>
          <div className={cx('sidebar_order', 'd-flex flex-column')}>
            <Button
              className={cx('toggle', 'toggle-item d-flex flex-row justify-content-between align-items-center')}
              transparent
            >
              <div className={cx('icon_contain')}>
                <TagsIcon />
              </div>
              <span className={cx('text-capitalize flex-grow-1 align-self-end text-start')}>
                <Translate>marketing.marketing_centre</Translate>
              </span>
              <div className={cx('icon')}>
                <FontAwesomeIcon icon={faChevronUp} />
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </Button>
            <nav className={cx('sidebar_order_content', 'content-item d-flex flex-column')}>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.Marketing}>
                <Translate>marketing.marketing_centre</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.MarketingShopDiscount}>
                <Translate>marketing.discount</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.MarketingShopVoucher}>
                <Translate>marketing.voucher</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.MarketingShopCampaign}>
                <Translate>marketing.campaign</Translate>
              </NavLink>
            </nav>
          </div>
          <div className={cx('sidebar_order', 'd-flex flex-column')}>
            <Button
              className={cx('toggle', 'toggle-item d-flex flex-row justify-content-between align-items-center')}
              transparent
            >
              <div className={cx('icon_contain')}>
                <ChatIcon className={cx('chat')} />
              </div>
              <span className={cx('text-capitalize flex-grow-1 align-self-end text-start')}>
                <Translate>service.customer_service</Translate>
              </span>
              <div className={cx('icon')}>
                <FontAwesomeIcon icon={faChevronUp} />
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </Button>
            <nav className={cx('sidebar_order_content', 'content-item d-flex flex-column')}>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.CSKHManagementChat}>
                <Translate>service.chat_management</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.CSKHManagementRating}>
                <Translate>service.review_management</Translate>
              </NavLink>
            </nav>
          </div>
          <div className={cx('sidebar_order', 'd-flex flex-column')}>
            <Button
              className={cx('toggle', 'toggle-item d-flex flex-row justify-content-between align-items-center')}
              transparent
            >
              <div className={cx('icon_contain')}>
                <WalletIcon />
              </div>
              <span className={cx('text-capitalize flex-grow-1 align-self-end text-start')}>
                <Translate>finance.title</Translate>
              </span>
              <div className={cx('icon')}>
                <FontAwesomeIcon icon={faChevronUp} />
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </Button>
            <nav className={cx('sidebar_order_content', 'content-item d-flex flex-column')}>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.Marketing}>
                <Translate>finance.my_income</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.MarketingShopDiscount}>
                <Translate>finance.my_balance</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.MarketingShopDiscount}>
                <Translate>finance.banks_account</Translate>
              </NavLink>
            </nav>
          </div>
          <div className={cx('sidebar_order', 'd-flex flex-column')}>
            <Button
              className={cx('toggle', 'toggle-item d-flex flex-row justify-content-between align-items-center')}
              transparent
            >
              <div className={cx('icon_contain')}>
                <ChartsIcon />
              </div>
              <span className={cx('text-capitalize flex-grow-1 align-self-end text-start')}>
                <Translate>data.title</Translate>
              </span>
              <div className={cx('icon')}>
                <FontAwesomeIcon icon={faChevronUp} />
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </Button>
            <nav className={cx('sidebar_order_content', 'content-item d-flex flex-column')}>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.Marketing}>
                <Translate>data.business_insights</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.MarketingShopDiscount}>
                <Translate>data.account_health</Translate>
              </NavLink>
            </nav>
          </div>
          <div className={cx('sidebar_order', 'd-flex flex-column')}>
            <Button
              className={cx('toggle', 'toggle-item d-flex flex-row justify-content-between align-items-center')}
              transparent
            >
              <div className={cx('icon_contain')}>
                <ShopIcon />
              </div>
              <span className={cx('text-capitalize flex-grow-1 align-self-end text-start')}>
                <Translate>shop.shop_management</Translate>
              </span>
              <div className={cx('icon')}>
                <FontAwesomeIcon icon={faChevronUp} />
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </Button>
            <nav className={cx('sidebar_order_content', 'content-item d-flex flex-column')}>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.SettingShopInfo}>
                <Translate>shop.profile_shop</Translate>
              </NavLink>
              <NavLink className={cx('nav_link_container')} to={config.ShopSeller.SettingNotification}>
                <Translate>setting.setting_shop</Translate>
              </NavLink>
            </nav>
          </div>
        </div>
      </ScrollY>
    </aside>
  );
}
