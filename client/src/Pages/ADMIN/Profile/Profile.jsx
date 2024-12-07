import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import styles from '~/pages/ADMIN/Profile/Profile.module.scss';
import Images from '~/components/Images';
import Button from '~/components/Button';
import CldUploadImg from '~/services/cloudinary/CldUploadImg';
import { FormSearch } from '~/layout/Component/FormSearch';
import Location from '~/layout/Component/Location';
import { UpdateProfile } from '~/api/General/HandleData';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import MessageDanger from '~/layout/Component/Message/MessageDanger';

const cx = classNames.bind(styles);

export default function Profile() {
  const nameRef = useRef();
  const phoneRef = useRef();
  const avatarRef = useRef();
  const addressRef = useRef();
  const Admin = useSelector((state) => state.Auth.admin);
  const [admin, setAdmin] = useState({
    name: Admin.name || '',
    avatar: Admin.avatar || '',
    phone_number: Admin.phone_number || '',
    address_live: Admin.address_t.street_address || '',
    ward_id: Admin.address_t.ward_id || '',
  });
  const [nameValid, setNameValid] = useState('');
  const [phoneValid, setPhoneValid] = useState('');
  const [addressValid, setAddressValid] = useState('');
  const [countryID, setCountryID] = useState(Admin.address_t.ward.district.city.country_id || '');
  const [cityID, setCityID] = useState(Admin.address_t.ward.district.city_id || '');
  const [districtID, setDistrictID] = useState(Admin.address_t.ward.district_id || '');

  //set name for location
  const CountryName = Admin.address_t.ward.district.city.country.name || '';
  const CityName = Admin.address_t.ward.district.city.name || '';
  const DistrictName = Admin.address_t.ward.district.name || '';
  const WardName = Admin.address_t.ward.name || '';

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const handleSetWardID = (value) => {
    setAdmin({
      ...admin,
      ward_id: value,
    });
  };

  /* handle onsubmit form */
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    // handle upadte admin
    const updateAdmin = async () => {
      try {
        UpdateProfile('admin', { data: admin })
          .then((result) => {
            if (result.success) {
              window.location.reload();
            }
          })
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
    };
    // submit update profile when value haven't empty
    if (
      admin.name !== '' &&
      admin.phone_number !== '' &&
      admin.address_live !== '' &&
      nameValid === '' &&
      phoneValid === '' &&
      addressValid === '' &&
      admin.ward_id !== ''
    ) {
      // submit update profile when admin have change value
      if (
        admin.ward_id !== Admin.address_t.ward_id ||
        admin.name !== Admin.name ||
        admin.phone_number !== Admin.phone_number ||
        admin.avatar !== Admin.avatar ||
        admin.address_live !== Admin.address_t.street_address
      ) {
        updateAdmin();
      }
    }
  };

  /* handle name value */
  useEffect(() => {
    const n = nameRef.current;
    const handleKeyUp = (e) => {
      if (e.target.value === '') {
        setNameValid(`name don't empty`);
        n.classList.add('input_danger');
      } else if (nameValid !== '') {
        n.classList.add('input_danger');
        setNameValid('');
        n.classList.remove('input_danger');
      }
    };
    if (n) {
      n.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      if (n) {
        n.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, [admin.name]);

  /* handle phone value */
  useEffect(() => {
    const p = phoneRef.current;
    const handleKeyUp = (e) => {
      if (e.target.value === '') {
        setPhoneValid(`phone don't empty`);
        p.classList.add('input_danger');
      } else if (phoneValid !== '') {
        setPhoneValid('');
        p.classList.remove('input_danger');
      }
    };
    if (p) {
      p.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      if (p) {
        p.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, [admin.phone_number]);

  /* handle address value */
  useEffect(() => {
    const a = addressRef.current;
    const handleKeyUp = (e) => {
      if (e.target.value === '') {
        setAddressValid(`address don't empty`);
        a.classList.add('input_danger');
      } else if (addressValid !== '') {
        setAddressValid('');
        a.classList.remove('input_danger');
      }
    };
    if (a) {
      a.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      if (a) {
        a.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, [admin.address_live]);

  return (
    <>
      <div className={cx('main_profile')}>
        <form onSubmit={handleSubmitProfile} noValidate className={cx('form-profile', 'd-flex flex-row flex-wrap')}>
          <FormImage title="avatar" data={admin.avatar} />
          <div className={cx('form-group col-6 px-3 mb-3')}>
            <FormSearch
              title="name"
              name="name"
              ref={nameRef}
              useTippy={false}
              Value={admin.name}
              handleOnchange={handleOnchange}
            />
            <MessageDanger message={nameValid} />
          </div>
          <div className={cx('form-group col-6 px-3 mb-3')}>
            <FormSearch
              ref={phoneRef}
              title="phone"
              name="phone_number"
              inputType="number"
              useTippy={false}
              Value={admin.phone_number}
              handleOnchange={handleOnchange}
            />
            <MessageDanger message={phoneValid} />
          </div>
          <div className={cx('profile_location', 'form-group col-6 px-3 mb-3')}>
            <label className={cx('input_title', 'form-label')}>Select Location</label>
            <div className={cx('form-group d-flex flex-row gap-3 flex-wrap')}>
              <Location
                title="country"
                useLabel={false}
                ValueID={countryID}
                handleSetID={setCountryID}
                SearchValue={CountryName}
              />
              <Location
                title="city"
                useLabel={false}
                ValueID={cityID}
                foreignID={countryID}
                handleSetID={setCityID}
                SearchValue={CityName}
              />
              <Location
                title="district"
                useLabel={false}
                ValueID={districtID}
                foreignID={cityID}
                handleSetID={setDistrictID}
                SearchValue={DistrictName}
              />
              <Location
                title="ward"
                useLabel={false}
                ValueID={admin.ward_id}
                foreignID={districtID}
                handleSetID={handleSetWardID}
                SearchValue={WardName}
              />
            </div>
          </div>
          <div className={cx('profile_address', 'form-group col-6 px-3 mb-3')}>
            <FormText
              title="Address"
              name="address_live"
              rows={5}
              handleOnchange={handleOnchange}
              data={admin.address_live}
              ref={addressRef}
            />
            <MessageDanger message={addressValid} />
          </div>
          <div className={cx('form-group col-12 d-flex justify-content-end')}>
            <Button type="submit" gradient_primary>
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
