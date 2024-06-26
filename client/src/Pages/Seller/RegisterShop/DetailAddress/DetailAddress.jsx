import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { useImmer } from 'use-immer';

import styles from '../RegisterShop.module.scss';
import Nominatim from '~/services/Nominatim';
import GetLocation from '~/api/Location/GetLocation';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import Button from '~/components/Button';
import LazyLoading from '~/layout/Component/LazyLoadind';
import MessageText from '~/layout/Component/Message/MessageText';

const cx = classNames.bind(styles);

export default function DetailAddress({ handleCloseAddress = () => {} }) {
  const locationTippyRef = useRef();
  const locationWrapperRef = useRef();
  const btnCityRef = useRef();
  const btnDistrictRef = useRef();
  const btnWardRef = useRef();
  const cityWrapperRef = useRef();
  const districtWrapperRef = useRef();
  const wardWrapperRef = useRef();
  const locationValueRef = useRef();
  const addressRef = useRef();
  const fullNameRef = useRef();
  const phoneNumberRef = useRef();
  const [valid, setValid] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [selectLocation, setSelectLocation] = useState(false);
  const [data, setData] = useState(false);
  const [addressDetail, setAddressDetail] = useImmer(() => {
    if (localStorage.getItem('addressDetails')) {
      return JSON.parse(localStorage.getItem('addressDetails'));
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
  const handleSelectLocation = (e) => {
    setSelectLocation(true);
  };
  const handleSelectLocationOutside = (e) => {
    setSelectLocation(false);
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setAddressDetail({
      ...addressDetail,
      [name]: value,
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
    if (!valid?.fullname && !valid?.phone_number && !valid?.ward_name && !valid?.address) {
      let AddressDetails = JSON.stringify(addressDetail);
      localStorage.setItem('addressDetails', AddressDetails);
    }
  };

  /* handle set value for district  */
  const handleSelectDistrict = (e) => {
    const DistrictItem = document.querySelectorAll('.district_item');
    const DistrictValue = districtWrapperRef.current;
    const WardValue = wardWrapperRef.current;
    const BtnWard = btnWardRef.current;
    const BtnDistrict = btnDistrictRef.current;
    const { id, name } = e.target.dataset;
    for (let i = 0; i < DistrictItem.length; i++) {
      if (DistrictItem[i].classList.contains('btn_item_active')) {
        DistrictItem[i].classList.remove('btn_item_active');
      }
    }
    e.target.classList.add('btn_item_active');
    setAddressDetail((draft) => {
      draft.district_name = name;
      draft.district_id = id;
      draft.ward_name = '';
      draft.ward_id = '';
    });
    DistrictValue.classList.remove('location_active');
    WardValue.classList.add('location_active');
    BtnDistrict.classList.remove('btn_active');
    BtnWard.classList.add('btn_active');
  };

  /* handle set value for district  */
  const handleSelectWard = (e) => {
    const WardItem = document.querySelectorAll('.ward_item');
    const { id, name } = e.target.dataset;
    for (let i = 0; i < WardItem.length; i++) {
      if (WardItem[i].classList.contains('btn_item_active')) {
        WardItem[i].classList.remove('btn_item_active');
      }
    }
    e.target.classList.add('btn_item_active');
    setAddressDetail((draft) => {
      draft.ward_name = name;
      draft.ward_id = id;
    });
    setSelectLocation(false);
  };

  /* handle set value for city  */
  useEffect(() => {
    const CityItem = document.querySelectorAll('.city_item');
    const CityValue = cityWrapperRef.current;
    const DistrictValue = districtWrapperRef.current;
    const BtnCity = btnCityRef.current;
    const BtnDistrict = btnDistrictRef.current;

    const handleSelectCity = (e) => {
      const { id, name } = e.target.dataset;
      for (let i = 0; i < CityItem.length; i++) {
        if (CityItem[i].classList.contains('btn_item_active')) {
          CityItem[i].classList.remove('btn_item_active');
        }
      }
      e.target.classList.add('btn_item_active');
      setAddressDetail((draft) => {
        draft.district_name = '';
        draft.district_id = '';
        draft.ward_name = '';
        draft.ward_id = '';
        draft.city_name = name;
        draft.city_id = id;
      });
      CityValue.classList.remove('location_active');
      DistrictValue.classList.add('location_active');
      BtnCity.classList.remove('btn_active');
      BtnDistrict.classList.add('btn_active');
    };

    if (CityItem) {
      CityItem.forEach((ct) => ct.addEventListener('click', handleSelectCity));
    }
    return () => {
      if (CityItem) {
        CityItem.forEach((ct) => ct.removeEventListener('click', handleSelectCity));
      }
    };
  }, [selectLocation]);

  /* get data for country */
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        Nominatim(position.coords.latitude, position.coords.longitude)
          .then((result) => {
            GetLocation('country', result.address.country)
              .then((result) => {
                setCountry(result[0]);
                setData(true);
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      });
    }
  }, []);

  /* get data for city */
  useEffect(() => {
    if (country) {
      GetLocation('city', '', country.id).then((result) => {
        setCity(result);
      });
    }
  }, [country]);

  /* get data for district */
  useEffect(() => {
    GetLocation('district', '', addressDetail.city_id)
      .then((result) => {
        setDistrict(result);
      })
      .catch((e) => console.log(e));
  }, [addressDetail.city_id]);

  /* get data for ward */
  useEffect(() => {
    GetLocation('ward', '', addressDetail.district_id)
      .then((result) => {
        setWard(result);
      })
      .catch((e) => console.log(e));
  }, [addressDetail.district_id]);

  /* handle set pointer for button when select location value */
  useEffect(() => {
    const btnCity = btnCityRef.current;
    const btnDistrict = btnDistrictRef.current;
    const btnWard = btnWardRef.current;
    if (btnDistrict) {
      if (addressDetail.city_id) {
        btnDistrict.classList.add('btn_location_active');
      } else {
        btnDistrict.classList.remove('btn_location_active');
      }
    }
    if (btnWard) {
      if (addressDetail.district_id) {
        btnWard.classList.add('btn_location_active');
      } else {
        btnWard.classList.remove('btn_location_active');
      }
    }
  }, [addressDetail.city_id, addressDetail.district_id]);

  /* handle toggle data city, district, ward when button location click */
  useEffect(() => {
    const BtnLocation = document.querySelectorAll('.btn_location');
    const LocationValue = document.querySelectorAll('.location_value');
    const CityValue = cityWrapperRef.current;
    const DistrictValue = districtWrapperRef.current;
    const WardValue = wardWrapperRef.current;
    const handleLocationClick = (e) => {
      const { name } = e.target.dataset;
      for (let i = 0; i < BtnLocation.length; i++) {
        if (BtnLocation[i].classList.contains('btn_active')) {
          BtnLocation[i].classList.remove('btn_active');
        }
      }
      for (let j = 0; j < LocationValue.length; j++) {
        if (LocationValue[j].classList.contains('location_active')) {
          LocationValue[j].classList.remove('location_active');
        }
      }
      e.target.classList.add('btn_active');
      if (name === 'city') {
        CityValue.classList.add('location_active');
      } else if (name === 'district') {
        DistrictValue.classList.add('location_active');
      } else {
        WardValue.classList.add('location_active');
      }
    };
    if (BtnLocation) {
      BtnLocation.forEach((e) => e.addEventListener('click', handleLocationClick));
    }
    return () => {
      if (BtnLocation) {
        BtnLocation.forEach((e) => e.removeEventListener('click', handleLocationClick));
      }
    };
  }, [selectLocation]);

  /* handle set width for tippy select location */
  useEffect(() => {
    const w = locationWrapperRef.current;
    const t = locationTippyRef.current;

    const handleResize = (e) => {
      t.style.width = `${w.offsetWidth}px`;
    };

    if (w && t) {
      t.addEventListener('resize', handleResize);
    }
    if (w && t) {
      handleResize();
    }
    return () => {
      if (w && t) {
        t.removeEventListener('resize', handleResize);
      }
    };
  }, [selectLocation]);
  return (
    <section
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
                    handleOnchange={handleOnchange}
                    useTippy={false}
                  />
                  <MessageText message={valid?.fullname} className={cx('message', 'text-danger text-capitalize')} />
                </div>
                <div className={cx('phone_number', 'd-flex flex-column')}>
                  <FormSearch
                    ref={phoneNumberRef}
                    title="phone"
                    name="phone_number"
                    Value={addressDetail?.phone_number}
                    useTippy={false}
                    areaCode={country?.international_codes}
                    searchValue={handleSetPhoneNumber}
                  />
                  <MessageText message={valid?.phone_number} className={cx('message', 'text-danger text-capitalize')} />
                </div>
                <div className={cx('address', 'd-flex flex-column')}>
                  <h5 className="text-capitalize">Address</h5>
                  <div className={cx('location')}>
                    <Tippy
                      interactive
                      visible={selectLocation}
                      placement="bottom"
                      offset={[0, -15]}
                      render={(attrs) => (
                        <div
                          ref={locationTippyRef}
                          id="seller_location_wrapper"
                          className={cx('location_wrapper')}
                          tabIndex={-1}
                          {...attrs}
                        >
                          <div className={cx('location_header', 'd-flex flex-row')}>
                            <Button
                              ref={btnCityRef}
                              className={cx('btn_active btn_location')}
                              type="button"
                              data-name="city"
                            >
                              City
                            </Button>
                            <Button
                              ref={btnDistrictRef}
                              className={cx('btn_location')}
                              type="button"
                              data-name="district"
                            >
                              District
                            </Button>
                            <Button ref={btnWardRef} className={cx('btn_location')} type="button" data-name="ward">
                              Ward
                            </Button>
                          </div>
                          <div className={cx('location_content')}>
                            <ul ref={cityWrapperRef} className={cx('city_items location_value location_active')}>
                              {city?.map((c, index) => (
                                <li key={index}>
                                  <Button
                                    className="city_item"
                                    type="button"
                                    data-id={c.id}
                                    data-name={c.name}
                                    transparent
                                  >
                                    {c.name}
                                  </Button>
                                </li>
                              ))}
                            </ul>
                            <ul ref={districtWrapperRef} className={cx('district_items location_value')}>
                              {district?.map((c, index) => (
                                <li key={index}>
                                  <Button
                                    className="district_item"
                                    type="button"
                                    data-id={c.id}
                                    data-name={c.name}
                                    transparent
                                    onClick={handleSelectDistrict}
                                  >
                                    {c.name}
                                  </Button>
                                </li>
                              ))}
                            </ul>
                            <ul ref={wardWrapperRef} className={cx('ward_items location_value')}>
                              {ward?.map((c, index) => (
                                <li key={index}>
                                  <Button
                                    className="ward_item"
                                    type="button"
                                    data-id={c.id}
                                    data-name={c.name}
                                    transparent
                                    onClick={handleSelectWard}
                                  >
                                    {c.name}
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      onClickOutside={handleSelectLocationOutside}
                    >
                      <div ref={locationWrapperRef} className={cx('location_container', 'form-group')}>
                        <label className="text-capitalize form-label">city/district/ward</label>
                        <div
                          ref={locationValueRef}
                          className={cx(
                            'location_value',
                            'd-flex flex-row justify-content-between align-items-center form-control',
                          )}
                          onClick={handleSelectLocation}
                        >
                          <div>
                            {addressDetail.city_name}
                            {addressDetail.district_name ? '/' + addressDetail.district_name : ''}
                            {addressDetail.ward_name ? '/' + addressDetail.ward_name : ''}
                          </div>
                          <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        <MessageText
                          message={valid?.ward_name}
                          className={cx('message', 'text-danger text-capitalize')}
                        />
                      </div>
                    </Tippy>
                  </div>
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
    </section>
  );
}
