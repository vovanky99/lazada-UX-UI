import classNames from 'classnames/bind';
import { Fragment, useEffect, useRef, useState } from 'react';

import styles from '../RegisterShop.module.scss';
import Button from '~/components/Button';
import FormText from '~/layout/Component/FormGroupRow/FormText';
import DetailAddress from '../DetailAddress';
import LocalStorageService from '~/services/LocalStorageService';
import { RegisterShop } from '~/api/Seller/Profile';
import Translate from '~/layout/Component/Translate';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageText from '~/layout/Component/Message/MessageText';

const cx = classNames.bind(styles);

export default function ShopInfo({ handleResetComponent, country, seller, addressDetail }) {
  const nameRef = useRef();
  const [editAddress, setEditAddress] = useState(false);
  const messageValid = {
    name: Translate({ children: 'valid.name_shop' }),
  };
  const [nameValid, setNameValid] = useState('');
  const [shopName, setShopName] = useState(seller?.shop?.name || '');
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

  const handleNextSettingShipping = (e) => {
    const stepsRegister = document.querySelectorAll('.steps_register');
    const shopInfoContent = document.getElementById('shop_info_content');
    const settingContent = document.getElementById('setting_shipping_content');
    if (shopName !== '') {
      const formData = new FormData();
      formData.append('shop_name', shopName);
      formData.append('address', addressDetail?.address);
      formData.append('ward_id', addressDetail?.ward_id);
      formData.append('phone', addressDetail?.phone_number);
      formData.append('fullname', addressDetail?.fullname);
      RegisterShop(formData, 'shop_info')
        .then((result) => {
          if (result.success) {
            for (let i = 0; i < stepsRegister.length; i++) {
              if (stepsRegister[i].getAttribute('id') === 'setting_ship') {
                stepsRegister[i].classList.add('active');
                stepsRegister[i - 1].classList.remove('active');
                stepsRegister[i - 1].classList.add('finished');
                shopInfoContent.classList.remove('active');
                settingContent.classList.add('active');
                LocalStorageService.setItem('settingShipping', true);
              }
            }
          }
        })
        .catch((e) => console.log(e));
    } else {
      nameRef.current.classList.add('border_danger');
      setNameValid(messageValid.name);
    }
  };

  /* handle validate for shop name when blur input name */
  useEffect(() => {
    const name = nameRef.current;
    const handleBlur = (e) => {
      if (e.target.value === '') {
        name.classList.add('border_danger');
        setNameValid(messageValid.name);
      } else {
        name.classList.remove('border_danger');
        setNameValid('');
      }
    };
    if (name) {
      name.addEventListener('blur', handleBlur);
    }
    return () => {
      if (name) {
        name.removeEventListener('blur', handleBlur);
      }
    };
  }, [shopName]);
  return (
    <Fragment>
      <form className={cx('shop_info_form')} noValidate>
        <div className={cx('form_content')}>
          <div className={cx('form_content_container', 'd-flex flex-column')}>
            <div className={cx('shop_info_item', 'd-flex flex-column align-items-end')}>
              <FormText
                ref={nameRef}
                containerClass={cx('name_shop', 'd-flex col-12 align-items-center')}
                labelClass={cx('col-3 justify-content-end')}
                data={shopName}
                useTippy={false}
                title="name_shop"
                name="shop_name"
                handleOnchange={handlSetShopName}
              />
              <MessageDanger message={nameValid} classNames={cx('message')} />
            </div>
            <div className={cx('pickup_address', 'form-group d-flex flex-row')}>
              <label className="text-capitalize col-3  text-end">
                <Translate>pickup_address</Translate>
              </label>
              <div className={cx('pickup_address_content', 'col flex-start')}>
                {addressDetail ? (
                  <Fragment>
                    <div className={cx('name_phone')}>
                      {addressDetail?.fullname + ' |'} {addressDetail?.phone_number}
                    </div>
                    <div className={cx('address')}>{addressDetail?.address}</div>
                    <div className={cx('location')}>
                      {addressDetail?.ward_name}
                      <br />
                      {addressDetail?.district_name}
                      <br />
                      {addressDetail?.city_name}
                    </div>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}
                <Button className={cx('pickup_address_edit')} type="button" onClick={handleEditAddress} transparent>
                  {addressDetail ? (
                    <Translate>pages.register_shop.edit_address</Translate>
                  ) : (
                    <Translate>pages.register_shop.select_address</Translate>
                  )}
                </Button>
              </div>
            </div>
            <FormText
              containerClass={cx('email')}
              labelClass={cx('col-3')}
              title="email"
              name="email"
              data={seller?.email}
              disabled
            />
            <div className={cx('phone_number', 'd-flex flex-row')}>
              <label className="text-capitalize col-3 text-end">
                <Translate>phone_number</Translate>
              </label>
              <div>{seller?.phone_number}</div>
            </div>
          </div>
        </div>
        <div className={cx('form_btn', 'd-flex flex-row justify-content-end')}>
          <Button type="button" primary onClick={handleNextSettingShipping} data-type="next">
            <Translate>next</Translate>
          </Button>
        </div>
      </form>
      {editAddress ? (
        <DetailAddress
          handleResetComponent={handleResetComponent}
          country={country}
          seller={seller}
          handleCloseAddress={handleCloseEditAddress}
        />
      ) : (
        <></>
      )}
    </Fragment>
  );
}
