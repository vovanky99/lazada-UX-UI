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
  const [phone, setPhone] = useState(Admin.phone_number);
  const [address, setAddress] = useState(Admin.address_t.street_address || '');
  const [nameValid, setNameValid] = useState('');
  const [phoneValid, setPhoneValid] = useState('');
  const [addressValid, setAddressValid] = useState('');
  const [countryID, setCountryID] = useState(Admin.address_t.ward.district.city.country_id || '');
  const [cityID, setCityID] = useState(Admin.address_t.ward.district.city_id || '');
  const [districtID, setDistrictID] = useState(Admin.address_t.ward.district_id || '');
  const [wardID, setWardID] = useState(Admin.address_t.ward_id || '');
  const CountryName = Admin.address_t.ward.district.city.country.name || '';
  const CityName = Admin.address_t.ward.district.city.name || '';
  const DistrictName = Admin.address_t.ward.district.name || '';
  const WardName = Admin.address_t.ward.name || '';

  /* handle upload image */
  const uploadImage = (img) => {
    let image = new FormData();
    image.append('file', img);
    // handle upload file up cloudinary
    CldUploadImg(image).then((result) => setAvatar(result.url));
  };

  /* handle onsubmit form */
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    // handle upadte admin
    const updateAdmin = async () => {
      let data = new FormData();
      data.append('avatar', avatar);
      data.append('name', name);
      data.append('phone', phone);
      data.append('address', address);
      data.append('ward_id', wardID);
      try {
        UpdateProfile('admin', { data: data })
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
      uploadImage(file);
    };
    if (file) {
      render.readAsDataURL(file);
    }
  };

  /* handle name value */
  useEffect(() => {
    const n = nameRef.current;
    const handleKeyUp = (e) => {
      if (e.target.value === '') {
        setNameValid(`name don't empty`);
        n.classList.add('border_danger');
      } else if (nameValid !== '') {
        n.classList.add('border_danger');
        setNameValid('');
        n.classList.remove('border_danger');
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
        p.classList.add('border_danger');
      } else if (phoneValid !== '') {
        setPhoneValid('');
        p.classList.remove('border_danger');
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
        a.classList.add('border_danger');
      } else if (addressValid !== '') {
        setAddressValid('');
        a.classList.remove('border_danger');
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

  /* handle click select avatar */
  const handleBTNChangeAvatar = (e) => {
    const inputFile = avatarRef.current;
    inputFile.click();
  };

  return (
    <>
      <div className={cx('main_profile')}>
        <form onSubmit={handleSubmitProfile} noValidate className={cx('form-profile', 'd-flex flex-row flex-wrap')}>
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
            <FormSearch title="name" ref={nameRef} useTippy={false} Value={name} searchValue={setName} />
            {nameValid ? (
              <div className={cx('message-valid', 'text-danger text-capitalize ps-3')}>{nameValid}</div>
            ) : (
              ''
            )}
          </div>
          <div className={cx('form-group col-6 px-3 mb-3')}>
            <FormSearch
              ref={phoneRef}
              title="phone"
              inputType="number"
              useTippy={false}
              Value={phone}
              searchValue={setPhone}
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
                ForeignID={countryID}
                handleSetID={setCityID}
                SearchValue={CityName}
              />
              <Location
                title="district"
                useLabel={false}
                ValueID={districtID}
                ForeignID={cityID}
                handleSetID={setDistrictID}
                SearchValue={DistrictName}
              />
              <Location
                title="ward"
                useLabel={false}
                ValueID={wardID}
                ForeignID={districtID}
                handleSetID={setWardID}
                SearchValue={WardName}
              />
            </div>
          </div>
          <div className={cx('profile_address', 'form-group col-6 px-3 mb-3')}>
            <FormText title="Address" rows={5} handleSetValue={setAddress} data={address} ref={addressRef} />
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
