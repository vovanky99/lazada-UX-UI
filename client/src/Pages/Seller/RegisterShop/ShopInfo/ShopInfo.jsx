import classNames from 'classnames/bind';
import { Fragment, useEffect, useRef, useState } from 'react';

import styles from '../RegisterShop.module.scss';
import Button from '~/components/Button';
import FormText from '~/layout/Component/FormGroupRow/FormText';
import DetailAddress from '../DetailAddress';
import LocalStorageService from '~/services/LocalStorageService';
import { RegisterShop } from '~/api/Seller/Profile';

const cx = classNames.bind(styles);

export default function ShopInfo({ seller, addressDetail }) {
  const nameRef = useRef();
  const [editAddress, setEditAddress] = useState(false);
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
    }
  };

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
  return (
    <Fragment>
      <form className={cx('shop_info_form')} noValidate>
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
                  Edit Address
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
              <label className="text-capitalize col-3 text-end">Phone Number</label>
              <div>{seller?.phone_number}</div>
            </div>
          </div>
        </div>
        <div className={cx('form_btn', 'd-flex flex-row justify-content-end')}>
          <Button type="button" primary onClick={handleNextSettingShipping} data-type="next">
            Next
          </Button>
        </div>
      </form>
      {editAddress ? <DetailAddress seller={seller} handleCloseAddress={handleCloseEditAddress} /> : <></>}
    </Fragment>
  );
}
