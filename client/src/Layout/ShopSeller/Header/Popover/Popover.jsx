import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import styles from '../Header.module.scss';
import MenuIcon from '~/layout/Component/Icon/MenuIcon';
import useDebounce from '~/hooks/Debounce';
import Translate from '~/layout/Component/Translate';
import OrderIcon from '~/layout/Component/Icon/OrderIcon';
import ProductIcon from '~/layout/Component/Icon/ProductIcon';
import TagsIcon from '~/layout/Component/Icon/TagsIcon';
import WalletIcon from '~/layout/Component/Icon/WalletIcon';
import ChartsIcon from '~/layout/Component/Icon/ChartsIcon';
import config from '~/config';
import SettingIcon from '~/layout/Component/Icon/SettingIcon';

const cx = classNames.bind(styles);

export default function Popover() {
  const [popover, setPopover] = useState(false);

  const Popover = useDebounce(popover, 500);

  const handleShowMenu = (e) => {
    setPopover(true);
  };

  const handleHideMenu = (e) => {
    setPopover(false);
  };

  return (
    <Fragment>
      <div className={cx('menu')} onMouseOver={handleShowMenu} onMouseLeave={handleHideMenu}>
        <Tippy
          interactive
          visible={Popover}
          offset={[0, 10]}
          render={(attrs) => (
            <div className={cx('menu_wrapper')} {...attrs} tabIndex="-1">
              <div className={cx('menu_container', 'd-flex flex-row flex-wrap')}>
                <Button
                  className={cx('menu_item', 'd-flex flex-column justify-content-start')}
                  to={config.ShopSeller.ManagementOrder}
                  transparent
                >
                  <div className={cx('icon_contain')}>
                    <OrderIcon />
                  </div>
                  <span>
                    <Translate>order.my_order</Translate>
                  </span>
                </Button>
                <Button
                  className={cx('menu_item', 'd-flex flex-column justify-content-start')}
                  to={config.ShopSeller.AllProduct}
                  transparent
                >
                  <div className={cx('icon_contain')}>
                    <ProductIcon />
                  </div>
                  <span>
                    <Translate>products.my_products</Translate>
                  </span>
                </Button>
                <Button
                  className={cx('menu_item', 'd-flex flex-column justify-content-start')}
                  to={config.ShopSeller.Marketing}
                  transparent
                >
                  <div className={cx('icon_contain')}>
                    <TagsIcon />
                  </div>
                  <span>
                    <Translate>marketing.marketing_centre</Translate>
                  </span>
                </Button>
                <Button
                  className={cx('menu_item', 'd-flex flex-column justify-content-start')}
                  to={config.ShopSeller.FinanceWalletLifePay}
                  transparent
                >
                  <div className={cx('icon_contain')}>
                    <WalletIcon />
                  </div>
                  <span>
                    <Translate>finance.my_balance</Translate>
                  </span>
                </Button>
                <Button
                  className={cx('menu_item', 'd-flex flex-column justify-content-start')}
                  to={config.ShopSeller.DataCenter}
                  transparent
                >
                  <div className={cx('icon_contain')}>
                    <ChartsIcon />
                  </div>
                  <span>
                    <Translate>data_center.business_insights</Translate>
                  </span>
                </Button>
                <Button
                  className={cx('menu_item', 'd-flex flex-column justify-content-start')}
                  to={config.ShopSeller.SettingBasicInfo}
                  transparent
                >
                  <div className={cx('icon_contain')}>
                    <SettingIcon />
                  </div>
                  <span>
                    <Translate>setting.setting_shipping</Translate>
                  </span>
                </Button>
              </div>
            </div>
          )}
        >
          <div className={cx('icon')}>
            <MenuIcon />
          </div>
        </Tippy>
      </div>
    </Fragment>
  );
}
