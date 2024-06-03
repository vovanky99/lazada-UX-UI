import classNames from 'classnames/bind';
import styles from '../User.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { CreateData, EditData } from '~/api/General/HandleData';
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
import CheckEmail from '~/api/Check/CheckEmail';
import CheckPhone from '~/api/Check/CheckPhone';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';

const cx = classNames.bind(styles);

export default function EditDetail() {
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState('');
  const [checkPhone, setCheckPhone] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [birthday, setBirthDay] = useState('');
  const [countryID, setCountryID] = useState('');
  const [cityID, setCityID] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [wardID, setWardID] = useState('');
  const [address, setAddress] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

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

  const validated = (valid) => {
    // valid Name
    if (name === '' || name.length < 6) {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }
    // valid password
    if (password === '' || name.length < 6) {
      passwordRef.current.classList.add('border_danger');
    } else {
      passwordRef.current.classList.remove('border_danger');
    }

    // valid email
    if (email === '' || !valid) {
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
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const validEmail = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
    );
    validated(validEmail);

    const CreateUsers = () => {
      const data = new FormData();
      data.append('name', name);
      data.append('phone', phone);
      data.append('email', email);
      data.append('password', password);
      data.append('avatar', avatar);
      data.append('gender', gender);
      data.append('birthday', birthday);
      data.append('ward_id', wardID);
      data.append('address', address);

      CreateData('admin', 'user', data)
        .then((result) => {
          if (result.success) {
            setSubmitSuccess(result.success);
          }
        })
        .catch((e) => console.log(e));
    };

    if (
      name.length >= 6 &&
      phone.length === 10 &&
      checkPhone === '' &&
      email &&
      password &&
      validEmail &&
      birthday &&
      gender &&
      wardID &&
      address
    ) {
      setSubmitError('');
      setSubmitSuccess('');
      CreateUsers();
      console.log(1);
    } else {
      setSubmitError('please enter full!');
    }
  };

  // check email
  useEffect(() => {
    CheckEmail('user', email)
      .then((result) => {
        if (result.error) {
          setCheckEmail(result.error);
          emailRef.current.classList.add('border_danger');
        } else {
          setCheckEmail('');
          emailRef.current.classList.remove('border_danger');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [email]);

  // check phone
  useEffect(() => {
    CheckPhone('user', phone)
      .then((result) => {
        if (result.error) {
          setCheckPhone(result.error);
          phoneRef.current.classList.add('border_danger');
        } else {
          setCheckPhone('');
          phoneRef.current.classList.remove('border_danger');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [phone]);

  return (
    <>
      <WrapperMain title="Add USer">
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
              <FormSelect ref={genderRef} title="gender" defaultValue="1" handleSetValue={setGender} />
            </div>
            <div className={cx('form-content_birthday')}>
              <FormDate ref={birthdayRef} title="birthday" data={birthday} handleSetValue={setBirthDay} />
            </div>
          </div>
          <div className={cx('location', 'd-flex flex-row')}>
            <div className={cx('filter-element', 'form-group d-flex flex-column')}>
              <label className="form-label">Born</label>
              <div className={cx('born', 'form-group d-flex flex-row flex-wrap')}>
                <Location title="country" useLabel={false} handleSetID={setCountryID} />
                <Location title="city" foreignID={countryID} useLabel={false} handleSetID={setCityID} />
                <Location title="district" foreignID={cityID} useLabel={false} handleSetID={setDistrictID} />
                <Location title="ward" ref={wardRef} foreignID={districtID} useLabel={false} handleSetID={setWardID} />
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
          <MessageSuccess className="fs-4 mx-3" message={submitSuccess} />
          <div className={cx('btn-submit')}>
            <Button type="submit" gradient_primary>
              Create
            </Button>
          </div>
        </form>
      </WrapperMain>
    </>
  );
}
