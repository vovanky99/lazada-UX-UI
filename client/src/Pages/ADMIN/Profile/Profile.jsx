import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Images from '~/components/Images';
import Button from '~/components/Button';
import axios from '~/api/axios';
import CldUploadImg from '~/services/cloudinary/CldUploadImg';
import { SearchSelect } from '~/layout/Component/SearchSelect';
import GetLocation from '~/api/Location/GetLocation';

const cx = classNames.bind(styles);

export default function Profile() {
  const nameRef = useRef();
  const phoneRef = useRef();
  const avatarRef = useRef();
  const addressRef = useRef();
  const Admin = useSelector((state) => state.Auth.admin);
  const [name, setName] = useState(Admin.name);
  const [avatar, setAvatar] = useState(Admin.avatar);
  const [upload, setUpload] = useState('');
  const [changeAvatar, setChangeAvatar] = useState(null);
  const [phone, setPhone] = useState(Admin.phone_number);
  const [address, setAddress] = useState(Admin.address_t.street_address || '');
  const [nameValid, setNameValid] = useState('');
  const [phoneValid, setPhoneValid] = useState('');
  const [addressValid, setAddressValid] = useState('');
  const [searchCountryValue, setSearchCountryValue] = useState(Admin.address_t.ward.district.city.country.name || '');
  const [searchCityValue, setSearchCityValue] = useState(Admin.address_t.ward.district.city.name || '');
  const [searchDistrictValue, setSearchDistrictValue] = useState(Admin.address_t.ward.district.name || '');
  const [searchWardValue, setSearchWardValue] = useState(Admin.address_t.ward.name || '');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [countryID, setCountryID] = useState(Admin.address_t.ward.district.city.country_id || '');
  const [cityID, setCityID] = useState(Admin.address_t.ward.district.city_id || '');
  const [districtID, setDistrictID] = useState(Admin.address_t.ward.district_id || '');
  const [wardID, setWardID] = useState(Admin.address_t.ward_id || '');

  /* handle upload image */
  const uploadImage = (img) => {
    let image = new FormData();
    image.append('file', img);
    // handle upload file up cloudinary
    CldUploadImg(image).then((result) => setUpload(result.url));
  };

  /* handle onsubmit form */
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    // handle upadte admin
    const updateAdmin = async () => {
      let data = new FormData();
      data.append('avatar', upload || avatar);
      data.append('name', name);
      data.append('phone', phone);
      data.append('address', address);
      data.append('ward_id', wardID);
      try {
        const res = await axios.post('/api/admin/update', data);
        if (res.data.success) {
          window.location.reload();
        }
      } catch (e) {
        console.log(e);
      }
    };
    // submit update profile when value haven't empty
    if (
      name !== '' &&
      phone !== '' &&
      address !== '' &&
      nameValid === '' &&
      phoneValid === '' &&
      addressValid === '' &&
      wardID !== ''
    ) {
      // submit update profile when admin have change value
      if (
        wardID !== Admin.address_t.ward_id ||
        name !== Admin.name ||
        phone !== Admin.phone_number ||
        upload !== '' ||
        address !== Admin.address_t.street_address
      ) {
        updateAdmin();
      }
    }
  };

  /* handle avatar change value */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const render = new FileReader();
    render.onload = (e) => {
      setAvatar(render.result);
      uploadImage(file);
    };
    if (file) {
      render.readAsDataURL(file);
      setChangeAvatar(file);
    }
  };

  /* handle name value */
  useEffect(() => {
    const n = nameRef.current;
    const handleKeyUp = (e) => {
      if (e.target.value === '') {
        setNameValid(`name don't empty`);
      } else if (nameValid !== '') {
        setNameValid('');
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
  }, [name]);

  /* handle phone value */
  useEffect(() => {
    const p = phoneRef.current;
    const handleKeyUp = (e) => {
      if (e.target.value === '') {
        setPhoneValid(`phone don't empty`);
      } else if (phoneValid !== '') {
        setPhoneValid('');
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
  }, [phone]);

  /* handle address value */
  useEffect(() => {
    const a = addressRef.current;
    const handleKeyUp = (e) => {
      if (e.target.value === '') {
        setAddressValid(`address don't empty`);
      } else if (addressValid !== '') {
        setAddressValid('');
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
  }, [address]);

  /* handle avatar value */
  const handleBTNChangeAvatar = (e) => {
    const inputFile = avatarRef.current;
    inputFile.click();
  };

  /* get country value */
  useEffect(() => {
    GetLocation('country', searchCountryValue)
      .then((result) => setCountry(result))
      .catch((e) => console.log(e));
  }, [searchCountryValue]);

  /* get city value */
  useEffect(() => {
    GetLocation('city', searchCityValue, countryID)
      .then((result) => setCity(result))
      .catch((e) => console.log(e));
  }, [searchCityValue, countryID]);

  /* get district value */
  useEffect(() => {
    GetLocation('district', searchDistrictValue, cityID)
      .then((result) => setDistrict(result))
      .catch((e) => console.log(e));
  }, [searchDistrictValue, cityID]);

  /* get ward value */
  useEffect(() => {
    GetLocation('ward', searchWardValue, districtID)
      .then((result) => setWard(result))
      .catch((e) => console.log(e));
  }, [searchWardValue, districtID]);

  return (
    <>
      <div className={cx('main_profile')}>
        <form
          onSubmit={handleSubmitProfile}
          noValidate
          className={cx('form-profile', 'd-flex flex-row flex-wrap')}
          encType="multipart/form-data"
        >
          <div
            className={cx(
              'avatar',
              'form-group col-12 d-flex justify-content-center align-items-center mb-5 flex-column',
            )}
          >
            <Button onClick={handleBTNChangeAvatar} className={cx('avatar_container')} type="button" transparent>
              <Images src={`${avatar}`} alt={avatar} />
            </Button>
            <input
              ref={avatarRef}
              type="file"
              name="avatar"
              value={''}
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <Button onClick={handleBTNChangeAvatar} type="button" className={cx('avatar_btn-change')} gradient_primary>
              Change Avatar
            </Button>
          </div>
          <div className={cx('form-group col-6 px-3 mb-3')}>
            <label className="form-label text-capitalize">name:</label>
            <input
              ref={nameRef}
              name="name"
              value={name}
              type="text"
              className="form-control py-2"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {nameValid ? (
              <div className={cx('message-valid', 'text-danger text-capitalize ps-3')}>{nameValid}</div>
            ) : (
              ''
            )}
          </div>
          <div className={cx('form-group col-6 px-3 mb-3')}>
            <label className="form-label text-capitalize">phone:</label>
            <input
              ref={phoneRef}
              name="phone"
              value={phone}
              type="number"
              className="form-control  py-2 mb-3"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            {phoneValid ? (
              <div className={cx('message-valid', 'text-danger text-capitalize ps-3')}>{phoneValid}</div>
            ) : (
              ''
            )}
          </div>
          <div className={cx('profile_location', 'form-group col-6 px-3 mb-3')}>
            <label className={cx('input_title', 'form-label')}>Select Location</label>
            <div className={cx('form-group d-flex flex-row gap-3 flex-wrap')}>
              <SearchSelect
                valueID={countryID}
                searchValue={searchCountryValue}
                isLabel={false}
                title="country"
                data={country}
                searchSelectValue={setSearchCountryValue}
                handleSetID={setCountryID}
              />
              <SearchSelect
                valueID={cityID}
                searchValue={searchCityValue}
                isLabel={false}
                title="city"
                data={city}
                searchSelectValue={setSearchCityValue}
                handleSetID={setCityID}
              />
              <SearchSelect
                valueID={districtID}
                searchValue={searchDistrictValue}
                isLabel={false}
                title="district"
                data={district}
                searchSelectValue={setSearchDistrictValue}
                handleSetID={setDistrictID}
              />
              <SearchSelect
                valueID={wardID}
                searchValue={searchWardValue}
                isLabel={false}
                title="ward"
                data={ward}
                searchSelectValue={setSearchWardValue}
                handleSetID={setWardID}
              />
            </div>
            {phoneValid ? (
              <div className={cx('message-valid', 'text-danger text-capitalize ps-3')}>{phoneValid}</div>
            ) : (
              ''
            )}
          </div>
          <div className={cx('profile_address', 'form-group col-6 px-3 mb-3')}>
            <label className="form-label text-capitalize">address:</label>
            <textarea
              ref={addressRef}
              name="address"
              value={address}
              className="form-control py-2"
              rows={5}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Please Enter Street Address... "
            />
            {addressValid ? (
              <div className={cx('message-valid', 'text-danger ps-3 text-capitalize')}>{addressValid}</div>
            ) : (
              ''
            )}
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
