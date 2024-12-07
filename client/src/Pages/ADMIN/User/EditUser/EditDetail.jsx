import classNames from 'classnames/bind';
import styles from '../User.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { EditData } from '~/api/General/HandleData';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import Location from '~/layout/Component/Location';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import CheckPhone from '~/api/Check/CheckPhone';
import CheckEmail from '~/api/Check/CheckEmail';

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

  const [user, setUser] = useState({
    name: data.name || '',
    email: data.email || '',
    password: '',
    phone_number: data.phone_number || '',
    avatar: data.avatar || '',
    status: data.status || '',
    gender: data.gender || '',
    birthday: data?.birthday || '',
    address_live: data.address?.street_address || '',
    ward_id: data.address?.ward_id || '',
  });
  const [checkEmail, setCheckEmail] = useState('');
  const [checkPhone, setCheckPhone] = useState('');
  const [countryID, setCountryID] = useState(data.address?.ward?.district?.city?.country?.id || '');
  const [cityID, setCityID] = useState(data.address?.ward?.district?.city?.id || '');
  const [districtID, setDistrictID] = useState(data.address?.ward?.district?.id || '');
  const [submitError, setSubmitError] = useState('');

  const handleSetAvatar = (value) => {
    setUser({
      ...user,
      avatar: value,
    });
  };
  const handleSetWardID = (value) => {
    setUser({
      ...user,
      ward_id: value,
    });
  };
  const handleSetGender = (value) => {
    setUser({
      ...user,
      gender: value,
    });
  };
  const handleSetStatus = (value) => {
    setUser({
      ...user,
      status: value,
    });
  };
  const handleSetBirthday = (value) => {
    setUser({
      ...user,
      birthday: value,
    });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const validate = (valid) => {
    // valid Name
    if (user.name.length < 6) {
      nameRef.current.classList.add('input_danger');
    } else {
      nameRef.current.classList.remove('input_danger');
    }

    if (user.email === '' || !valid) {
      emailRef.current.classList.add('input_danger');
    } else {
      emailRef.current.classList.remove('input_danger');
    }

    // valid Phone
    if (user.phone_number === '') {
      phoneRef.current.classList.add('input_danger');
    } else {
      phoneRef.current.classList.remove('input_danger');
    }

    // valid status
    if (user.status === '') {
      statusRef.current.classList.add('input_danger');
    } else {
      statusRef.current.classList.remove('input_danger');
    }

    // valid gender
    if (user.gender === '') {
      genderRef.current.classList.add('input_danger');
    } else {
      genderRef.current.classList.remove('input_danger');
    }

    // valid Birthday
    if (user.birthday === '') {
      birthdayRef.current.classList.add('input_danger');
    } else {
      birthdayRef.current.classList.remove('input_danger');
    }

    // valid  Ward
    if (user.ward_id === '') {
      wardRef.current.classList.add('input_danger');
    } else {
      wardRef.current.classList.remove('input_danger');
    }

    // valid Address live
    if (user.address_live === '') {
      addressRef.current.classList.add('input_danger');
    } else {
      addressRef.current.classList.remove('input_danger');
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    // valid email
    const validEmail = user.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
    );
    validate(validEmail);
    if (
      user.name.length >= 6 &&
      user.phone_number.length === 10 &&
      checkPhone === '' &&
      checkEmail === '' &&
      user.email &&
      user.birthday &&
      validEmail &&
      user.status &&
      user.gender &&
      user.ward_id &&
      user.address_live
    ) {
      setSubmitError('');
      EditData('admin', 'user', data.id, user)
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

  useEffect(() => {
    CheckPhone('admin', user.phone_number)
      .then((result) => {
        if (result.error) {
          setCheckPhone(result.error);
        } else {
          setCheckPhone('');
        }
      })
      .catch((e) => console.log(e));
  }, [user.phone_number]);

  useEffect(() => {
    CheckEmail('admin', user.email)
      .then((result) => {
        if (result.error) {
          setCheckEmail(result.error);
        } else {
          setCheckEmail('');
        }
      })
      .catch((e) => console.log(e));
  }, [user.email]);

  return (
    <>
      <WrapperMain title="Edit USer">
        <form
          className={cx('edit_user-content', 'd-flex flex-column align-items-center')}
          onSubmit={handleSubmitForm}
          noValidate
        >
          <FormImage title="avatar" name="avatar" data={user.avatar} handleSetValue={handleSetAvatar} />
          <div className={cx('form-content', 'd-flex flex-row flex-wrap')}>
            <div className={cx('form-content_name')}>
              <FormSearch
                ref={nameRef}
                title="full name"
                name="name"
                Value={user.name}
                useTippy={false}
                handleOnchange={handleOnchange}
              />
            </div>
            <div className={cx('form-content_email')}>
              <FormSearch
                ref={emailRef}
                title="email"
                name="email"
                Value={user.email}
                useTippy={false}
                handleOnchange={handleOnchange}
              />
            </div>
            <div className={cx('form-content_password')}>
              <FormSearch
                ref={passwordRef}
                Value={user.password}
                name="password"
                inputType="password"
                title="password"
                useTippy={false}
                handleOnchange={handleOnchange}
              />
            </div>
            <div className={cx('form-content_phone')}>
              <FormSearch
                ref={phoneRef}
                title="phone"
                name="phone_number"
                inputType="number"
                Value={user.phone_number}
                useTippy={false}
                handleOnchange={handleOnchange}
              />
            </div>
            <div className={cx('form-content_gender')}>
              <FormSelect ref={genderRef} title="gender" defaultValue={user.gender} handleSetValue={handleSetGender} />
            </div>
            <div className={cx('form-content_status')}>
              <FormSelect
                ref={statusRef}
                title="status"
                useStatus={true}
                defaultValue={user.status}
                handleSetValue={handleSetStatus}
              />
            </div>
            <div className={cx('form-content_birthday')}>
              <FormDate ref={birthdayRef} title="birthday" data={user.birthday} handleSetValue={handleSetBirthday} />
            </div>
          </div>
          <div className={cx('location', 'd-flex flex-row')}>
            <div className={cx('filter-element', 'form-group d-flex flex-column')}>
              <label className="form-label">Born</label>
              <div className={cx('born', 'form-group d-flex flex-row flex-wrap')}>
                <Location
                  title="country"
                  name="country_id"
                  ValueID={countryID}
                  SearchValue={data.address?.ward?.district?.city?.country?.name || ''}
                  useLabel={false}
                  handleSetID={setCountryID}
                />
                <Location
                  title="city"
                  name="city_id"
                  SearchValue={data.address?.ward?.district?.city?.name || ''}
                  foreignID={countryID}
                  ValueID={cityID}
                  useLabel={false}
                  handleSetID={setCityID}
                />
                <Location
                  title="district"
                  name="district_id"
                  SearchValue={data.address?.ward?.district?.name || ''}
                  foreignID={cityID}
                  ValueID={districtID}
                  useLabel={false}
                  handleSetID={setDistrictID}
                />
                <Location
                  title="ward"
                  name="ward_id"
                  ref={wardRef}
                  ValueID={user.ward_id}
                  SearchValue={data.address?.ward?.name || ''}
                  foreignID={districtID}
                  useLabel={false}
                  handleSetID={handleSetWardID}
                />
                <FormText
                  ref={addressRef}
                  data={user.address_live}
                  title="address"
                  name="address_live"
                  rows={3}
                  useLabel={false}
                  handleOnchange={handleOnchange}
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
