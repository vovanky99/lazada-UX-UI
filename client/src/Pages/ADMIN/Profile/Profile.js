import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Images from '~/components/Images';
import Button from '~/components/Button';
import axios from '~/api/axios';
import CldUploadImg from '~/service/cloudinary/CldUploadImg';
import { SelectLocation } from '~/Layout/Component/SelectLocation';

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
  const [searchCountryValue, setSearchCountryValue] = useState(
    Admin.address_t.ward.districts.cities.countries.name || '',
  );
  const [searchCityValue, setSearchCityValue] = useState(Admin.address_t.ward.districts.cities.name || '');
  const [searchDistrictValue, setSearchDistrictValue] = useState(Admin.address_t.ward.districts.name || '');
  const [searchWardValue, setSearchWardValue] = useState(Admin.address_t.ward.name || '');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [countryID, setCountryID] = useState(Admin.address_t.ward.districts.cities.country_id || '');
  const [cityID, setCityID] = useState(Admin.address_t.ward.districts.city_id || '');
  const [districtID, setDistrictID] = useState(Admin.address_t.ward.district_id || '');
  const [wardID, setWardID] = useState(Admin.address_t.ward_id || '');

  /* handle upload image */
  const uploadImage = (img) => {
    let image = new FormData();
    image.append('file', img);
    const result = CldUploadImg(image);
    result.then((result) => {
      setUpload(result.url);
    });
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
  useEffect(() => {
    const a = document.querySelectorAll('.change-avatar');
    const inputFile = avatarRef.current;
    const handleClick = (e) => {
      inputFile.click();
    };
    if (a) {
      a.forEach((e) => e.addEventListener('click', handleClick));
    }
    return () => {
      if (a) {
        a.forEach((e) => e.removeEventListener('click', handleClick));
      }
    };
  }, [avatar]);

  /* get country value */
  useEffect(() => {
    const getCountry = async () => {
      try {
        const res = await axios.get('/api/get-country', {
          params: {
            name: searchCountryValue,
          },
        });
        if (res.data) {
          setCountry(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getCountry();
  }, [searchCountryValue]);

  /* get city value */
  useEffect(() => {
    const getCity = async () => {
      try {
        const res = await axios.get('/api/get-city', {
          params: {
            name: searchCityValue,
            country_id: countryID,
          },
        });
        if (res.data) {
          setCity(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getCity();
  }, [searchCityValue, countryID]);

  /* get district value */
  useEffect(() => {
    const getDistrict = async () => {
      try {
        const res = await axios.get('/api/get-district', {
          params: {
            name: searchDistrictValue,
            city_id: cityID,
          },
        });
        if (res.data) {
          setDistrict(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDistrict();
  }, [searchDistrictValue, cityID]);

  /* get ward value */
  useEffect(() => {
    const getWard = async () => {
      try {
        const res = await axios.get('/api/get-ward', {
          params: {
            name: searchWardValue,
            district_id: districtID,
          },
        });
        if (res.data) {
          setWard(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getWard();
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
            <Button className={cx('avatar_container', 'change-avatar')} type="button" transparent>
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
            <Button type="button" className={cx('avatar_btn-change', 'change-avatar')} gradient_primary>
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
              <SelectLocation
                IDValue={countryID}
                searchValue={searchCountryValue}
                isLabel={false}
                title="country"
                data={country}
                searchSelectValue={setSearchCountryValue}
                handleSetID={setCountryID}
              />
              <SelectLocation
                IDValue={cityID}
                searchValue={searchCityValue}
                isLabel={false}
                title="city"
                data={city}
                searchSelectValue={setSearchCityValue}
                handleSetID={setCityID}
              />
              <SelectLocation
                IDValue={districtID}
                searchValue={searchDistrictValue}
                isLabel={false}
                title="district"
                data={district}
                searchSelectValue={setSearchDistrictValue}
                handleSetID={setDistrictID}
              />
              <SelectLocation
                IDValue={wardID}
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
