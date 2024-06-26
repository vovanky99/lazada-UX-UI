import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import Logo from '~/layout/Component/Logo';
import styles from './RegisterShop.module.scss';
import Button from '~/components/Button';
import Images from '~/components/Images';
import Seller from '~/layout/Component/Seller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useEffect, useRef, useState } from 'react';
import FormText from '~/layout/Component/FormGroupRow/FormText';
import DetailAddress from './DetailAddress';
import SettingShipping from './SettingShipping';

const cx = classNames.bind(styles);

export default function RegisterShop() {
  const nameRef = useRef();
  const seller = useSelector((state) => state.Auth.seller);
  const [dropdown, setDropdown] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [shopName, setShopName] = useState(() => {
    if (localStorage.getItem('shopName')) {
      return localStorage.getItem('shopName');
    } else {
      return '';
    }
  });
  const [AddressDetail, setAddressDetail] = useState(() => {
    if (JSON.parse(localStorage.getItem('addressDetails'))) {
      return JSON.parse(localStorage.getItem('addressDetails'));
    } else {
      return '';
    }
  });
  const handleAccountMouseOver = () => {
    setDropdown(true);
  };
  const handleCloseEditAddress = () => {
    setEditAddress(false);
  };
  const handlSetShopName = (e) => {
    const { value } = e.target;
    setShopName(value);
  };
  const handleEditAddress = (e) => {
    setEditAddress(true);
  };
  const handleSubmitInfo = (e) => {
    e.preventDefault();
  };
  /* handle save shop info in localstorage */
  const handleSaveShopInfo = (e) => {
    const shopIF = document.getElementById('shop_info');
    const settingShip = document.getElementById('setting_ship');
    const shopInfoContent = document.getElementById('shop_info_content');
    const settingContent = document.getElementById('setting_shipping_content');
    if (shopName !== '') {
      localStorage.setItem('shopName', shopName);
      if (e.target.dataset.type === 'next') {
        shopIF.classList.remove('active');
        shopIF.classList.add('finished');
        settingShip.classList.add('active');
        shopInfoContent.classList.remove('active');
        settingContent.classList.add('active');
        localStorage.setItem('settingShipping', true);
      }
    }
  };

  useEffect(() => {
    const shopIF = document.getElementById('shop_info');
    const settingShip = document.getElementById('setting_ship');
    const shopInfoContent = document.getElementById('shop_info_content');
    const settingContent = document.getElementById('setting_shipping_content');
    const taxInfo = document.getElementById('tax_info');
    const taxInfoContent = document.getElementById('tax_info_content');
    if (localStorage.getItem('taxInfo') && shopIF && settingShip && shopInfoContent && taxInfo && taxInfoContent) {
      shopIF.classList.remove('active');
      shopIF.classList.add('finished');
      settingShip.classList.add('finished');
      shopInfoContent.classList.remove('active');
      taxInfo.classList.add('active');
      taxInfoContent.classList.add('active');
    }
    if (localStorage.getItem('settingShipping') && shopIF && settingShip && shopInfoContent && settingContent) {
      shopIF.classList.remove('active');
      shopIF.classList.add('finished');
      settingShip.classList.add('active');
      shopInfoContent.classList.remove('active');
      settingContent.classList.add('active');
    }
  }, [seller]);

  /* handle validate for shop name when blur input name */
  useEffect(() => {
    const name = nameRef.current;
    const handleBlur = (e) => {
      if (e.target.value === '') {
        name.classList.add('border_danger');
      } else {
        name.classList.remove('border_danger');
      }
    };
    if (name) {
      name.addEventListener('blur', handleBlur);
    }
  }, [shopName]);

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
                  <form className={cx('shop_info_form')} onSubmit={handleSubmitInfo} noValidate>
                    <div className={cx('form_content')}>
                      <div className={cx('form_content_container', 'd-flex flex-column')}>
                        <FormText
                          ref={nameRef}
                          containerClass={cx('name_shop')}
                          labelClass={cx('col-3')}
                          data={shopName}
                          title="name shop"
                          name="shop_name"
                          handleOnchange={handlSetShopName}
                        />
                        <div className={cx('pickup_address', 'form-group d-flex flex-row')}>
                          <label className="text-capitalize col-3  text-end">pickup address</label>
                          <div className={cx('pickup_address_content', 'col flex-start')}>
                            {AddressDetail ? (
                              <Fragment>
                                <div className={cx('name_phone')}>
                                  {AddressDetail?.fullname + ' |'} {AddressDetail?.phone_number}
                                </div>
                                <div className={cx('address')}>{AddressDetail?.address}</div>
                                <div className={cx('location')}>
                                  {AddressDetail?.ward_name}
                                  <br />
                                  {AddressDetail?.district_name}
                                  <br />
                                  {AddressDetail?.city_name}
                                </div>
                              </Fragment>
                            ) : (
                              <Fragment></Fragment>
                            )}
                            <Button
                              className={cx('pickup_address_edit')}
                              type="button"
                              onClick={handleEditAddress}
                              transparent
                            >
                              Edit Address
                            </Button>
                          </div>
                        </div>
                        <FormText
                          containerClass={cx('email')}
                          labelClass={cx('col-3')}
                          title="email"
                          name="email"
                          data={seller.email}
                          disabled
                        />
                        <div className={cx('phone_number', 'd-flex flex-row')}>
                          <label className="text-capitalize col-3 text-end">Phone Number</label>
                          <div>{seller.phone_number}</div>
                        </div>
                      </div>
                    </div>
                    <div className={cx('form_btn', 'd-flex flex-row justify-content-end')}>
                      <Button type="button" outline onClick={handleSaveShopInfo}>
                        Save
                      </Button>
                      <Button type="button" primary onClick={handleSaveShopInfo} data-type="next">
                        Next
                      </Button>
                    </div>
                  </form>
                  {editAddress ? <DetailAddress handleCloseAddress={handleCloseEditAddress} /> : <></>}
                </div>
                <div id="setting_shipping_content" className={cx('setting_shipping', 'content_register')}>
                  <SettingShipping />
                </div>
                <div id="tax_info_content" className={cx('tax_info', 'content_register')}></div>
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
