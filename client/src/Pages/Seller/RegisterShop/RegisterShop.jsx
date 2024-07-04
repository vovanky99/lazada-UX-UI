import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import Logo from '~/layout/Component/Logo';
import styles from './RegisterShop.module.scss';
import Button from '~/components/Button';
import Images from '~/components/Images';
import Seller from '~/layout/Component/Seller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useEffect, useRef, useState } from 'react';
import FormText from '~/layout/Component/FormGroupRow/FormText';
import DetailAddress from './DetailAddress';
import SettingShipping from './SettingShipping';
import TaxInfo from './TaxInfo';
import LocalStorageService from '~/services/LocalStorageService';
import IdentityInfo from './IdentityInfo';
import ShopInfo from './ShopInfo';
import config from '~/config';

const cx = classNames.bind(styles);

export default function RegisterShop() {
  const seller = useSelector((state) => state.Auth.seller);
  const [dropdown, setDropdown] = useState(false);

  const [addressDetail, setAddressDetail] = useState(() => {
    if (LocalStorageService.getItem('addressDetails')) {
      return LocalStorageService.getItem('addressDetails');
    } else {
      return '';
    }
  });
  const handleAccountMouseOver = () => {
    setDropdown(true);
  };

  useEffect(() => {
    const stepsRegister = document.querySelectorAll('.steps_register');
    const shopInfoContent = document.getElementById('shop_info_content');
    const settingContent = document.getElementById('setting_shipping_content');
    const taxInfoContent = document.getElementById('tax_info_content');
    const IdentificationInfoContent = document.getElementById('identification_info_content');
    if (
      LocalStorageService.getItem('IdentificationInfo') &&
      stepsRegister &&
      shopInfoContent &&
      IdentificationInfoContent
    ) {
      for (let i = 0; i < stepsRegister.length; i++) {
        if (stepsRegister[i].getAttribute('id') === 'identification_info') {
          stepsRegister[i].classList.add('active');
          shopInfoContent.classList.remove('active');
          IdentificationInfoContent.classList.add('active');
          break;
        }
        stepsRegister[i].classList.add('finished');
        stepsRegister[i].classList.remove('active');
      }
    } else if (LocalStorageService.getItem('taxInfo') && stepsRegister && shopInfoContent && taxInfoContent) {
      for (let i = 0; i < stepsRegister.length; i++) {
        if (stepsRegister[i].getAttribute('id') === 'tax_info') {
          stepsRegister[i].classList.add('active');
          shopInfoContent.classList.remove('active');
          taxInfoContent.classList.add('active');
          break;
        }
        stepsRegister[i].classList.add('finished');
        stepsRegister[i].classList.remove('active');
      }
    } else if (LocalStorageService.getItem('settingShipping') && stepsRegister && shopInfoContent && settingContent) {
      for (let i = 0; i < stepsRegister.length; i++) {
        if (stepsRegister[i].getAttribute('id') === 'setting_ship') {
          stepsRegister[i].classList.add('active');
          shopInfoContent.classList.remove('active');
          settingContent.classList.add('active');
          break;
        }
        stepsRegister[i].classList.add('finished');
        stepsRegister[i].classList.remove('active');
      }
    }
  }, [seller]);

  useEffect(() => {
    setAddressDetail(() => {
      if (LocalStorageService.getItem('addressDetails')) {
        return LocalStorageService.getItem('addressDetails');
      } else {
        return '';
      }
    });
  }, []);

  useEffect(() => {}, []);
  return (
    <Seller>
      {seller ? (
        <section id="seller_register_shop" className={cx('seller_register_shop')}>
          <header id="header" className={cx('seller_register_shop_header', 'd-flex flex-row justify-content-between')}>
            <div className={cx('register_shop_header_left', 'd-flex flex-row align-items-center')}>
              <div className={cx('logo')}>
                <Logo type="shop" />
              </div>
              <h2>Đăng ký trở thành Người bán LifeShop</h2>
            </div>
            <div className={cx('register_shop_header_right', 'd-flex flex-row justify-content-end')}>
              <Tippy
                interactive
                visible={dropdown}
                placement="bottom"
                render={(attrs) => {
                  <div className={cx('account_dropdown')} {...attrs} tabIndex={-1}>
                    <div className={cx('account_container')}>
                      <div className={cx('avatar')}>
                        <Images src={seller.avatar} alt={seller.avatar} />
                      </div>
                      <span>{seller.name || 'no name'}</span>
                    </div>
                  </div>;
                }}
              >
                <Button
                  type="button"
                  className={cx('header_right_account')}
                  onMouseOver={handleAccountMouseOver}
                  transparent
                >
                  <div className={cx('avatar')}>
                    <Images src={seller?.avatar} alt={seller?.avatar} />
                  </div>
                  <span>{seller.name || 'no name'}</span>
                  <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faChevronDown} />
                    <FontAwesomeIcon icon={faChevronUp} />
                  </div>
                </Button>
              </Tippy>
            </div>
          </header>
          <main id="seller_register_shop_main" className={cx('seller_register_shop_main')}>
            <div className={cx('register_shop_main_container')}>
              <div className={cx('register_shop_main_header', 'd-flex flex-row justify-content-center')}>
                <div id="shop_info" className={cx('shop_info', 'steps_register active')}>
                  <div className={cx('diot')}></div>
                  <div className={cx('title')}>shop info</div>
                  <div className={cx('process')}></div>
                </div>
                <div id="setting_ship" className={cx('setting_ship', 'steps_register')}>
                  <div className={cx('diot')}></div>
                  <div className={cx('title')}>
                    <span>setting shipping</span>
                  </div>
                  <div className={cx('process')}></div>
                </div>
                <div id="tax_info" className={cx('tax_info', 'steps_register')}>
                  <div className={cx('diot')}></div>
                  <div className={cx('title')}>
                    <span>tax info</span>
                  </div>
                  <div className={cx('process')}></div>
                </div>
                <div id="identification_info" className={cx('identification_info', 'steps_register')}>
                  <div className={cx('diot')}></div>
                  <div className={cx('title')}>
                    <span>identification info</span>
                  </div>
                  <div className={cx('process')}></div>
                </div>
                <div id="completed" className={cx('completed', 'steps_register')}>
                  <div className={cx('diot')}></div>
                  <div className={cx('title')}>
                    <span>completed</span>
                  </div>
                </div>
              </div>
              <div id="seller_main_content" className={cx('seller_main_content')}>
                <div id="shop_info_content" className={cx('shop_info', 'content_register active')}>
                  <ShopInfo seller={seller} addressDetail={addressDetail} />
                </div>
                <div id="setting_shipping_content" className={cx('setting_shipping', 'content_register')}>
                  <SettingShipping seller={seller} />
                </div>
                <div id="tax_info_content" className={cx('tax_info', 'content_register')}>
                  <TaxInfo location={addressDetail} email={seller.email} />
                </div>
                <div id="identification_info_content" className={cx('identification_info', 'content_register')}>
                  <IdentityInfo />
                </div>
                <div id="completed_content" className={cx('completed', 'content_register')}>
                  <div
                    className={cx('completed_result', 'd-flex flex-column align-items-center justify-content-center')}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <h3 className="text-capitalize">Sign Up Success</h3>
                    <p>Post your first product to start your sales journey with Shopee!</p>
                    <Button to={config.ShopSeller.IdentityInfo} primary small>
                      Complete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
      ) : (
        <></>
      )}
    </Seller>
  );
}
