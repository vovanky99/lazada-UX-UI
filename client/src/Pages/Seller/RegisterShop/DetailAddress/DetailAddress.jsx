import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { useImmer } from 'use-immer';

import styles from '../RegisterShop.module.scss';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import Button from '~/components/Button';
import LazyLoading from '~/layout/Component/LazyLoadind';
import MessageText from '~/layout/Component/Message/MessageText';
import Modal from '~/layout/Component/Modal';
import Location from '../Location';
import LocalStorageService from '~/services/LocalStorageService';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

export default function DetailAddress({ handleResetComponent, country, seller, handleCloseAddress = () => {} }) {
  const locationValueRef = useRef();
  const addressRef = useRef();
  const fullNameRef = useRef();
  const phoneNumberRef = useRef();
  const [valid, setValid] = useState(null);
  const messageValid = {
    fullname: Translate({ children: 'valid.fullname' }),
    phone_number: Translate({ children: 'valid.phone_number' }),
    address: Translate({ children: 'valid.address' }),
    ward: Translate({ children: 'valid.ward' }),
  };
  const [data, setData] = useState(false);
  const [addressDetail, setAddressDetail] = useImmer(() => {
    if (LocalStorageService.getItem('addressDetails')) {
      return LocalStorageService.getItem('addressDetails');
    } else {
      return {
        ward_id: '',
        ward_name: '',
        district_name: '',
        district_id: '',
        city_name: '',
        city_id: '',
        address: '',
        fullname: '',
        phone_number: '',
      };
    }
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setAddressDetail((draft) => {
      draft[name] = value;
    });
  };
  const handleSetPhoneNumber = (value) => {
    setAddressDetail((draft) => {
      draft.phone_number = value;
    });
  };
  const validate = (field = addressDetail) => {
    const errorMessage = { ...valid };
    if ('fullname' in field) {
      errorMessage.fullname = !field.fullname ? messageValid.fullname : '';
      if (errorMessage.fullname) {
        fullNameRef.current.classList.add('border_danger');
      } else {
        fullNameRef.current.classList.remove('border_danger');
      }
    }
    if ('phone_number' in field) {
      let areaCodeRegex = new RegExp(`\\+${country?.international_codes}\\d+`, 'g');
      errorMessage.phone_number =
        field.phone_number.match(areaCodeRegex) && !field.phone_number.match(/[a-zA-Z$]/g)
          ? ''
          : messageValid.phone_number;
      if (errorMessage.phone_number) {
        phoneNumberRef.current.classList.add('border_danger');
      } else {
        phoneNumberRef.current.classList.remove('border_danger');
      }
    }
    if ('address' in field) {
      errorMessage.address = !field.address ? messageValid.address : '';
      if (errorMessage.address) {
        addressRef.current.classList.add('border_danger');
      } else {
        addressRef.current.classList.remove('border_danger');
      }
    }
    if ('ward_name' in field) {
      errorMessage.ward_name = !field.ward_name ? messageValid.ward : '';
      if (errorMessage.ward_name) {
        locationValueRef.current.classList.add('border_danger');
      } else {
        locationValueRef.current.classList.remove('border_danger');
      }
    }
    if (field === addressDetail) {
      Object.entries(errorMessage).map(([key, value]) => {
        if (value === '') {
          delete errorMessage[key];
        }
      });
    }
    setValid({ ...errorMessage });
    return errorMessage;
  };

  /* submit address detail */
  const handleSaveAddressDetail = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (
      addressDetail.fullname &&
      addressDetail.phone_number &&
      addressDetail.address &&
      addressDetail.ward_id &&
      Object.keys(validationErrors).length === 0
    ) {
      LocalStorageService.setItem('addressDetails', addressDetail);
      handleResetComponent(1);
      handleCloseAddress();
    }
  };

  const handlePassLocationValue = (value) => {
    setAddressDetail((draft) => {
      for (let key in value) {
        if (draft.hasOwnProperty(key)) {
          draft[key] = value[key];
        }
      }
    });
  };
  useEffect(() => {
    if (country) {
      setData(true);
    }
  }, [country]);
  return (
    <Modal>
      <div
        id="seller_details_address"
        className={cx('seller_details_address', 'd-flex flex-row justify-content-center align-items-center')}
      >
        <div className={cx('seller_details_address_wrapper', 'd-flex flex-column ')}>
          <div className={cx('seller_details_address_header', 'd-flex flex-row justify-content-between')}>
            <h4 className={cx('title', 'text-capitalize')}>
              <Translate>address_detail</Translate>
            </h4>
            <div className={cx('close')}>
              <FontAwesomeIcon icon={faClose} onClick={handleCloseAddress} />
            </div>
          </div>
          <div
            className={cx(
              'seller_details_address_middle',
              'd-flex flex-row justify-content-between align-items-center flex-grow-1',
            )}
          >
            {data ? (
              <form className={cx('seller_details_content', 'flex-grow-1')} onSubmit={handleSaveAddressDetail}>
                <div className={cx('seller_details_content_header', 'd-flex flex-column')}>
                  <div className={cx('fullname', 'd-flex flex-column')}>
                    <FormSearch
                      ref={fullNameRef}
                      title="full_name"
                      name="fullname"
                      Value={addressDetail?.fullname}
                      useColumn
                      handleOnchange={handleOnchange}
                      useTippy={false}
                    />
                    <MessageText message={valid?.fullname} className={cx('message', 'text-danger text-capitalize')} />
                  </div>
                  <div className={cx('phone_number', 'd-flex flex-column')}>
                    <FormSearch
                      useColumn
                      ref={phoneNumberRef}
                      title="phone"
                      name="phone_number"
                      Value={addressDetail?.phone_number}
                      useTippy={false}
                      areaCode={country?.international_codes}
                      searchValue={handleSetPhoneNumber}
                    />
                    <MessageText
                      message={valid?.phone_number}
                      className={cx('message', 'text-danger text-capitalize')}
                    />
                  </div>
                  <div className={cx('address', 'd-flex flex-column')}>
                    <h5 className="text-capitalize">
                      <Translate>address</Translate>
                    </h5>
                    <Location
                      ref={locationValueRef}
                      data={addressDetail}
                      valid={valid?.ward_name}
                      handlePassLocationValue={handlePassLocationValue}
                    />
                    <div className={cx('address_details', 'd-flex flex-column')}>
                      <FormText
                        ref={addressRef}
                        data={addressDetail?.address}
                        title="address_detail"
                        name="address"
                        rows="3"
                        handleOnchange={handleOnchange}
                      />
                      <MessageText message={valid?.address} className={cx('message', 'text-danger text-capitalize')} />
                    </div>
                  </div>
                </div>
                <div className={cx('seller_details_content_btn', 'text-end')}>
                  <Button type="submit" className={cx('text-capitalize')} primary small>
                    <Translate>save</Translate>
                  </Button>
                </div>
              </form>
            ) : (
              <LazyLoading />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
