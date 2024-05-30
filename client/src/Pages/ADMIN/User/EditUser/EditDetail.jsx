import classNames from 'classnames/bind';
import styles from '../User.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { EditData } from '~/api/General/HandleData';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import CldUploadImg from '~/services/cloudinary/CldUploadImg';
import Images from '~/components/Images';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import Location from '~/layout/Component/Location';
import MessageDanger from '~/layout/Component/Message/MessageDanger';

const cx = classNames.bind(styles);

export default function EditDetail({ data }) {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const statusRef = useRef();
  const avatarRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const genderRef = useRef();
  const birthdayRef = useRef();
  const addressRef = useRef();
  const wardRef = useRef();

  const [name, setName] = useState(data.name || '');
  const [email, setEmail] = useState(data.email || '');
  const [checkEmail, setCheckEmail] = useState('');
  const [checkPhone, setCheckPhone] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(data.avatar || '');
  const [phone, setPhone] = useState(data.phone_number || '');
  const [gender, setGender] = useState(data.gender || '');
  const [status, setStatus] = useState(data.status || '');
  const [birthday, setBirthDay] = useState(data?.birthday || '');
  const [countryID, setCountryID] = useState(data.address?.ward?.district?.city?.country?.id || '');
  const [cityID, setCityID] = useState(data.address?.ward?.district?.city?.id || '');
  const [districtID, setDistrictID] = useState(data.address?.ward?.district?.id || '');
  const [wardID, setWardID] = useState(data.address?.ward_id || '');
  const [address, setAddress] = useState(data.address?.street_address || '');
  const [submitError, setSubmitError] = useState('');

  /* set data value */
  const NameCountry = data.address?.ward?.district?.city?.country?.name || '';
  const NameCity = data.address?.ward?.district?.city?.name || '';
  const NameDistrict = data.address?.ward?.district?.name || '';
  const NameWard = data.address?.ward?.name || '';
  // handle click avatar
  const handleSelectAvatar = (e) => {
    const a = avatarRef.current;
    a.click();
  };

  // handle upload file avatar
  const uploadAvatar = (img) => {
    let image = new FormData();
    image.append('file', img);
    CldUploadImg(image)
      .then((result) => {
        setAvatar(result.url);
      })
      .catch((e) => console.log(e));
  };

  // handle change avatar
  const handleChangeAvatar = (e) => {
    const files = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadAvatar(files);
    };
    if (reader) {
      reader.readAsDataURL(files);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // valid Name
    if (name === '' || name.length < 6) {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }

    // valid email
    const validEmail = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
    );
    if (email === '' || !validEmail) {
      emailRef.current.classList.add('border_danger');
    } else {
      emailRef.current.classList.remove('border_danger');
    }

    // valid Phone
    if (phone === '') {
      phoneRef.current.classList.add('border_danger');
    } else {
      phoneRef.current.classList.remove('border_danger');
    }

    // valid status
    if (status === '') {
      statusRef.current.classList.add('border_danger');
    } else {
      statusRef.current.classList.remove('border_danger');
    }

    // valid gender
    if (gender === '') {
      genderRef.current.classList.add('border_danger');
    } else {
      genderRef.current.classList.remove('border_danger');
    }

    // valid Birthday
    if (birthday === '') {
      birthdayRef.current.classList.add('border_danger');
    } else {
      birthdayRef.current.classList.remove('border_danger');
    }

    // valid  Ward
    if (wardID === '') {
      wardRef.current.classList.add('border_danger');
    } else {
      wardRef.current.classList.remove('border_danger');
    }

    // valid Address live
    if (address === '') {
      addressRef.current.classList.add('border_danger');
    } else {
      addressRef.current.classList.remove('border_danger');
    }

    if (
      name.length >= 6 &&
      phone.length === 10 &&
      checkPhone === '' &&
      email &&
      birthday &&
      validEmail &&
      status &&
      gender &&
      wardID &&
      address
    ) {
      setSubmitError('');
      EditData('admin', 'user', data.id, {
        name: name,
        email: email,
        password: password,
        status: status,
        avatar: avatar,
        phone: phone,
        birthday: birthday,
        ward_id: wardID,
        address: address,
        gender: gender,
      })
        .then((result) => {
          if (result.success) {
            navigate(-1);
          }
        })
        .catch((e) => {
          setSubmitError('Save admin have issue!');
          console.log(e);
        });
    } else {
      setSubmitError('please enter full!');
    }
  };

  return (
    <>
      <WrapperMain title="Edit USer">
        <form
          className={cx('edit_user-content', 'd-flex flex-column align-items-center')}
          onSubmit={handleSubmitForm}
          noValidate
        >
          <div className={cx('avatar', 'd-flex form-group  flex-column align-items-center')}>
            <Button className={cx('select-avatar')} type="button" onClick={handleSelectAvatar} transparent>
              <Images src={avatar} alt={avatar} />
            </Button>
            <input ref={avatarRef} type="file" onChange={handleChangeAvatar} accept="image/*" />
            <label className="text-capitalize form-label">avatar</label>
          </div>
          <div className={cx('form-content', 'd-flex flex-row flex-wrap')}>
            <div className={cx('form-content_name')}>
              <FormSearch ref={nameRef} title="full name" Value={name} useTippy={false} searchValue={setName} />
            </div>
            <div className={cx('form-content_email')}>
              <FormSearch ref={emailRef} title="email" Value={email} useTippy={false} searchValue={setEmail} />
            </div>
            <div className={cx('form-content_password')}>
              <FormSearch
                ref={passwordRef}
                Value={password}
                inputType="password"
                title="password"
                useTippy={false}
                searchValue={setPassword}
              />
            </div>
            <div className={cx('form-content_phone')}>
              <FormSearch
                ref={phoneRef}
                title="phone"
                inputType="number"
                Value={phone}
                useTippy={false}
                searchValue={setPhone}
              />
            </div>
            <div className={cx('form-content_gender')}>
              <FormSelect ref={genderRef} title="gender" defaultValue={gender} handleSetValue={setGender} />
            </div>
            <div className={cx('form-content_status')}>
              <FormSelect
                ref={statusRef}
                title="status"
                useStatus={true}
                defaultValue={status}
                handleSetValue={setStatus}
              />
            </div>
            <div className={cx('form-content_birthday')}>
              <FormDate ref={birthdayRef} title="birthday" data={birthday} handleSetValue={setBirthDay} />
            </div>
          </div>
          <div className={cx('location', 'd-flex flex-row')}>
            <div className={cx('filter-element', 'form-group d-flex flex-column')}>
              <label className="form-label">Born</label>
              <div className={cx('born', 'form-group d-flex flex-row flex-wrap')}>
                <Location
                  title="country"
                  ValueID={countryID}
                  SearchValue={NameCountry}
                  useLabel={false}
                  handleSetID={setCountryID}
                />
                <Location
                  title="city"
                  SearchValue={NameCity}
                  ForeignID={countryID}
                  ValueID={cityID}
                  useLabel={false}
                  handleSetID={setCityID}
                />
                <Location
                  title="district"
                  SearchValue={NameDistrict}
                  ForeignID={cityID}
                  ValueID={districtID}
                  useLabel={false}
                  handleSetID={setDistrictID}
                />
                <Location
                  title="ward"
                  ref={wardRef}
                  ValueID={wardID}
                  SearchValue={NameWard}
                  ForeignID={districtID}
                  useLabel={false}
                  handleSetID={setWardID}
                />
                <FormText
                  ref={addressRef}
                  data={address}
                  title="address"
                  rows={3}
                  useLabel={false}
                  handleSetValue={setAddress}
                />
              </div>
            </div>
          </div>
          <MessageDanger className="fs-4 mx-3" message={submitError} />
          <div className={cx('btn-submit')}>
            <Button type="submit" gradient_primary>
              Save
            </Button>
          </div>
        </form>
      </WrapperMain>
    </>
  );
}
