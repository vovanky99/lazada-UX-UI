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
import CurrentCountry from '~/api/CurrentCountry';
import LocalStorageService from '~/services/LocalStorageService';

const cx = classNames.bind(styles);

export default function DetailAddress({ seller, handleCloseAddress = () => {} }) {
  const locationValueRef = useRef();
  const addressRef = useRef();
  const fullNameRef = useRef();
  const phoneNumberRef = useRef();
  const [valid, setValid] = useState(null);
  const [data, setData] = useState(false);
  // const [country, setCountry] = useState(false);
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

  const country = CurrentCountry();

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
      errorMessage.fullname = !field.fullname ? 'please enter fullname!' : '';
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
          : "phone number don't valid!";
      if (errorMessage.phone_number) {
        phoneNumberRef.current.classList.add('border_danger');
      } else {
        phoneNumberRef.current.classList.remove('border_danger');
      }
    }
    if ('address' in field) {
      errorMessage.address = !field.address ? 'please enter address detail!' : '';
      if (errorMessage.address) {
        addressRef.current.classList.add('border_danger');
      } else {
        addressRef.current.classList.remove('border_danger');
      }
    }
    if ('ward_name' in field) {
      errorMessage.ward_name = !field.ward_name ? 'please select ward!' : '';
      if (errorMessage.ward_name) {
        locationValueRef.current.classList.add('border_danger');
      } else {
        locationValueRef.current.classList.remove('border_danger');
      }
    }
    setValid({ ...errorMessage });
    if (field === valid) {
      Object.values(errorMessage).every((x) => x === '');
    }
  };

  /* submit address detail */
  const handleSaveAddressDetail = (e) => {
    e.preventDefault();
    validate();
    if (
      addressDetail.fullname &&
      addressDetail.phone_number &&
      addressDetail.address &&
      addressDetail.ward_id &&
      !valid?.fullname &&
      !valid?.phone_number &&
      !valid?.ward_name &&
      !valid?.address
    ) {
      LocalStorageService.setItem('addressDetails', addressDetail);
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
            <h4 className={cx('title', 'text-capitalize')}>Address Details</h4>
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
                      title="full name"
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
                    <h5 className="text-capitalize">Address</h5>
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
                        title="address details"
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
                    Save
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
