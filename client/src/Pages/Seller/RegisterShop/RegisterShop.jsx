import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import styles from './RegisterShop.module.scss';
import Button from '~/components/Button';
import Seller from '~/layout/Component/Seller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import SettingShipping from './SettingShipping';
import TaxInfo from './TaxInfo';
import LocalStorageService from '~/services/LocalStorageService';
import IdentityInfo from './IdentityInfo';
import ShopInfo from './ShopInfo';
import config from '~/config';
import Header from '~/layout/ShopSeller/Header';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

export default function RegisterShop() {
  const { seller, sellerAuthenticated, country } = useSelector((state) => state.Auth);
  const [resetCompponent, setResetComponent] = useState(1);
  const [addressDetail, setAddressDetail] = useState(() => {
    if (LocalStorageService.getItem('addressDetails')) {
      return LocalStorageService.getItem('addressDetails');
    } else {
      return '';
    }
  });

  const handleResetComponent = (value) => {
    setResetComponent(value + resetCompponent);
  };

  useEffect(() => {
    setAddressDetail(LocalStorageService.getItem('addressDetails'));
  }, [resetCompponent]);

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
  }, [seller, country]);

  useEffect(() => {
    setAddressDetail(() => {
      if (LocalStorageService.getItem('addressDetails')) {
        return LocalStorageService.getItem('addressDetails');
      } else {
        return '';
      }
    });
  }, []);

  return (
    <Seller>
      {seller ? (
        <section id="seller_register_shop" className={cx('seller_register_shop')}>
          <Header title="register_shop_title" isRegisterShop={true} />
          <main id="seller_register_shop_main" className={cx('seller_register_shop_main')}>
            <div className={cx('register_shop_main_container')}>
              <div className={cx('register_shop_main_header', 'd-flex flex-row justify-content-center')}>
                <div id="shop_info" className={cx('shop_info', 'steps_register active')}>
                  <div className={cx('diot')}></div>
                  <div className={cx('title')}>
                    <Translate>shop.shop_info</Translate>
                  </div>
                  <div className={cx('process')}></div>
                </div>
                <div id="setting_ship" className={cx('setting_ship', 'steps_register')}>
                  <div className={cx('diot')}></div>
                  <div className={cx('title')}>
                    <span>
                      <Translate>setting.setting_shipping</Translate>
                    </span>
                  </div>
                  <div className={cx('process')}></div>
                </div>
                <div id="tax_info" className={cx('tax_info', 'steps_register')}>
                  <div className={cx('diot')}></div>
                  <div className={cx('title')}>
                    <span>
                      <Translate>tax.tax_info</Translate>
                    </span>
                  </div>
                  <div className={cx('process')}></div>
                </div>
                <div id="identification_info" className={cx('identification_info', 'steps_register')}>
                  <div className={cx('diot')}></div>
                  <div className={cx('title')}>
                    <span>
                      <Translate>identity.identification_info</Translate>
                    </span>
                  </div>
                  <div className={cx('process')}></div>
                </div>
                <div id="completed" className={cx('completed', 'steps_register')}>
                  <div className={cx('diot')}></div>
                  <div className={cx('title')}>
                    <span>
                      <Translate>completed</Translate>
                    </span>
                  </div>
                </div>
              </div>
              <div id="seller_main_content" className={cx('seller_main_content')}>
                <div id="shop_info_content" className={cx('shop_info', 'content_register active')}>
                  <ShopInfo
                    handleResetComponent={handleResetComponent}
                    seller={seller}
                    addressDetail={addressDetail}
                    country={country}
                  />
                </div>
                <div id="setting_shipping_content" className={cx('setting_shipping', 'content_register')}>
                  <SettingShipping seller={seller} />
                </div>
                <div id="tax_info_content" className={cx('tax_info', 'content_register')}>
                  <TaxInfo location={addressDetail} email={seller.email} />
                </div>
                <div id="identification_info_content" className={cx('identification_info', 'content_register')}>
                  <IdentityInfo seller={seller} country={country} />
                </div>
                <div id="completed_content" className={cx('completed', 'content_register')}>
                  <div
                    className={cx('completed_result', 'd-flex flex-column align-items-center justify-content-center')}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <h3 className="text-capitalize">
                      <Translate>completed</Translate>
                    </h3>
                    <p>
                      <Translate>pages.register_shop.completed_title</Translate>
                    </p>
                    <Button className="text-capitalize" to={config.ShopSeller.SettingIdentityInfo} primary small>
                      <Translate>completed</Translate>
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
