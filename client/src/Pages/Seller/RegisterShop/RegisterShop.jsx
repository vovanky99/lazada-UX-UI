import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import Logo from '~/layout/Component/Logo';
import styles from './RegisterShop.module.scss';
import Button from '~/components/Button';
import Images from '~/components/Images';
import Seller from '~/layout/Component/Seller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faChevronDown, faChevronUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import SettingShipping from './SettingShipping';
import TaxInfo from './TaxInfo';
import LocalStorageService from '~/services/LocalStorageService';
import IdentityInfo from './IdentityInfo';
import ShopInfo from './ShopInfo';
import config from '~/config';
import Store from '~/redux/Store';
import { Logout, setSession } from '~/redux/Actions/Auth';
import Dialog from '~/layout/Component/Dialog';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function RegisterShop() {
  const { seller, sellerAuthenticated } = useSelector((state) => state.Auth);
  const [dropdown, setDropdown] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [messageDialog, setMessageDialog] = useState('');
  const [resolvePromise, setResolvePromise] = useState(null);
  const navigate = useNavigate();

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
  const handleAccountMouseLeave = () => {
    setDropdown(false);
  };
  /* handle for confirm  */
  const setShowConfirmBox = (message) => {
    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
      setMessageDialog(message);
      setDialog(true);
    });
  };
  const handleConfirmDialog = (e) => {
    const { type } = e.currentTarget.dataset;
    if (type === 'no') {
      setDialog(false);
      if (resolvePromise) resolvePromise(false);
    } else {
      setDialog(false);
      if (resolvePromise) resolvePromise(true);
    }
  };
  const handleLogoutSeller = async () => {
    const log = await setShowConfirmBox('Thông tin đã cung cấp sẽ không được lưu. Bạn có chắc vẫn muốn đăng xuất?');
    if (log) {
      Store.dispatch(Logout());
      Store.dispatch(setSession('', 'sellerToken'));
      navigate(config.ShopSeller.SignIn);
    }
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
            <div
              className={cx('register_shop_header_right', 'd-flex flex-row justify-content-end')}
              onMouseLeave={handleAccountMouseLeave}
              onMouseOver={handleAccountMouseOver}
            >
              <Tippy
                interactive
                visible={dropdown}
                placement="bottom"
                offset={[100, 5]}
                render={(attrs) => (
                  <div className={cx('account_dropdown')} {...attrs} tabIndex={-1}>
                    <div className={cx('account_container', 'd-flex flex-column align-items-center')}>
                      <div className={cx('seller_avatar')}>
                        <Images
                          src={seller?.avatar || require('~/assets/images/avatar/no-avatar.jpg')}
                          alt={seller?.avatar || require('~/assets/images/avatar/no-avatar.jpg')}
                        />
                      </div>
                      <div className={cx('seller_fullname')}>{seller.name || 'No Name'}</div>
                      <Button className={cx('seller_logout')} type="button" onClick={handleLogoutSeller} transparent>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              >
                <Button
                  type="button"
                  className={cx('header_right_account', 'd-flex flex-row align-items-center')}
                  transparent
                >
                  <div className={cx('seller_avatar')}>
                    <Images
                      src={seller?.avatar || require('~/assets/images/avatar/no-avatar.jpg')}
                      alt={seller?.avatar || require('~/assets/images/avatar/no-avatar.jpg')}
                    />
                  </div>
                  <div className={cx('seller_fullname')}>{seller.name || 'No Name'}</div>
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
                  <IdentityInfo seller={seller} />
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
          {dialog && <Dialog message={messageDialog} onCancel={handleConfirmDialog} onConfirm={handleConfirmDialog} />}
        </section>
      ) : (
        <></>
      )}
    </Seller>
  );
}
