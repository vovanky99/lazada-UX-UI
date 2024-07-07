import { forwardRef, useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from '../RegisterShop.module.scss';
import GetLocation from '~/api/Location/GetLocation';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import MessageText from '~/layout/Component/Message/MessageText';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Location = forwardRef(function Location(
  { data, name, useLabel = true, handlePassLocationValue = () => {}, valid },
  ref,
) {
  const locationTippyRef = useRef();
  const locationWrapperRef = useRef();
  const btnCityRef = useRef();
  const btnDistrictRef = useRef();
  const btnWardRef = useRef();
  const cityWrapperRef = useRef();
  const districtWrapperRef = useRef();
  const wardWrapperRef = useRef();
  const { country } = useSelector((state) => state.Auth);
  const [selectLocation, setSelectLocation] = useState(false);
  // const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [location, setLocation] = useImmer({
    ward_id: data?.ward_id || '',
    ward_name: data?.ward_name || '',
    district_name: data?.district_name || '',
    district_id: data?.district_id || '',
    city_name: data?.city_name || '',
    city_id: data?.city_id || '',
  });

  const handleSelectLocation = (e) => {
    setSelectLocation(true);
  };
  const handleSelectLocationOutside = (e) => {
    setSelectLocation(false);
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
    setLocation((draft) => {
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
    setLocation((draft) => {
      draft.ward_name = name;
      draft.ward_id = id;
    });
    setSelectLocation(false);
  };

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
    GetLocation('district', '', location.city_id)
      .then((result) => {
        setDistrict(result);
      })
      .catch((e) => console.log(e));
  }, [location.city_id]);

  /* get data for ward */
  useEffect(() => {
    GetLocation('ward', '', location.district_id)
      .then((result) => {
        setWard(result);
      })
      .catch((e) => console.log(e));
  }, [location.district_id]);

  /* handle set pointer for button when select location value */
  useEffect(() => {
    const btnCity = btnCityRef.current;
    const btnDistrict = btnDistrictRef.current;
    const btnWard = btnWardRef.current;
    if (btnDistrict) {
      if (location.city_id) {
        btnDistrict.classList.add('btn_location_active');
      } else {
        btnDistrict.classList.remove('btn_location_active');
      }
    }
    if (btnWard) {
      if (location.district_id) {
        btnWard.classList.add('btn_location_active');
      } else {
        btnWard.classList.remove('btn_location_active');
      }
    }
  }, [location.city_id, location.district_id, selectLocation]);

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
      setLocation((draft) => {
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

  /* handle set width for wrapper tippy content*/
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

  /* handle pass data when have change for parent */
  useEffect(() => {
    handlePassLocationValue(location);
  }, [location]);

  /* handle set active for location when had data */
  useEffect(() => {
    const btnCity = btnCityRef.current;
    const btnDistrict = btnDistrictRef.current;
    const btnWard = btnWardRef.current;
    const CityContent = cityWrapperRef.current;
    const DistrictContent = districtWrapperRef.current;
    const WardContent = wardWrapperRef.current;
    const CityItem = document.querySelectorAll('.city_item');
    const WardItem = document.querySelectorAll('.ward_item');
    const DistrictItem = document.querySelectorAll('.district_item');
    if (CityItem) {
      for (let i = 0; i < CityItem.length; i++) {
        if (CityItem[i].dataset.id === location.city_id) {
          CityItem[i].classList.add('btn_item_active');
        }
      }
    }
    if (WardItem) {
      for (let i = 0; i < WardItem.length; i++) {
        if (WardItem[i].dataset.id === location.ward_id) {
          WardItem[i].classList.add('btn_item_active');
        }
      }
    }

    if (DistrictItem) {
      for (let i = 0; i < DistrictItem.length; i++) {
        if (DistrictItem[i].dataset.id === location.district_id) {
          DistrictItem[i].classList.add('btn_item_active');
        }
      }
    }

    if (location.ward_id && WardContent && CityContent && btnWard && btnCity) {
      btnWard.classList.add('btn_active');
      btnCity.classList.remove('btn_active');
      CityContent.classList.remove('location_active');
      WardContent.classList.add('location_active');
    } else if (location.district_id && DistrictContent && CityContent && btnDistrict && btnCity) {
      btnDistrict.classList.add('btn_active');
      btnCity.classList.remove('btn_active');
      CityContent.classList.remove('location_active');
      DistrictContent.classList.add('location_active');
    }
  }, [selectLocation]);
  return (
    <div className={cx('location')}>
      <Tippy
        interactive
        visible={selectLocation}
        placement="bottom"
        offset={[0, 0]}
        render={(attrs) => (
          <div
            ref={locationTippyRef}
            id="seller_location_wrapper"
            className={cx('location_wrapper')}
            tabIndex={-1}
            {...attrs}
          >
            <div className={cx('location_header', 'd-flex flex-row')}>
              <Button ref={btnCityRef} className={cx('btn_location btn_active')} type="button" data-name="city">
                City
              </Button>
              <Button ref={btnDistrictRef} className={cx('btn_location')} type="button" data-name="district">
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
                    <Button className="city_item" type="button" data-id={c.id} data-name={c.name} transparent>
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
        <div ref={locationWrapperRef} name={name} className={cx('location_container', 'form-group')}>
          {useLabel === true ?? <label className="text-capitalize form-label">city/district/ward</label>}
          <div
            ref={ref}
            className={cx('location_value', 'd-flex flex-row justify-content-between align-items-center form-control')}
            onClick={handleSelectLocation}
          >
            <div>
              {location.city_name}
              {location.district_name ? '/' + location.district_name : ''}
              {location.ward_name ? '/' + location.ward_name : ''}
            </div>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <MessageText message={valid} className={cx('message', 'text-danger text-capitalize')} />
        </div>
      </Tippy>
    </div>
  );
});

export default Location;
