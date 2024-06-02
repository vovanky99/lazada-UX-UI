import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import styles from '../Admin.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import { FormSearch } from '~/layout/Component/FormSearch';
import Button from '~/components/Button';
import Images from '~/components/Images';
import CldUploadImg from '~/services/cloudinary/CldUploadImg';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import CreateAdmin from '~/api/Admin/CreateAdmin';
import CheckUsername from '~/api/Check/CheckUsername';
import useDebounce from '~/hooks/Debounce/Debounce';
import Location from '~/layout/Component/Location';
import Department from '../Department';
import Role from '../Role';

const cx = classNames.bind(styles);

export default function AddAdmin() {
  const nameRef = useRef();
  const avatarRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const genderRef = useRef();
  const birthdayRef = useRef();
  const citizenCardRef = useRef();
  const roleRef = useRef();
  const departmentRef = useRef();
  const addressLiveRef = useRef();
  const addressBornRef = useRef();
  const wardBornRef = useRef();
  const wardLiveRef = useRef();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validUsername, setvalidUsername] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthDay] = useState('');
  const [citizenIdentificationCard, setCitizenIdentificationCard] = useState('');
  const [bornCountryID, setBornCountryID] = useState('');
  const [searchBornCity, setSearchBornCity] = useState('');
  const [bornCityID, setBornCityID] = useState('');
  const [bornDistrictID, setBornDistrictID] = useState('');
  const [bornWardID, setBornWardID] = useState('');
  const [liveAtCountryID, setLiveAtCountryID] = useState('');
  const [liveAtCityID, setLiveAtCityID] = useState('');
  const [liveAtDistrictID, setLiveAtDistrictID] = useState('');
  const [liveAtWardID, setLiveAtWardID] = useState('');
  const [addressBorn, setAddressBorn] = useState('');
  const [addressLive, setAddressLive] = useState('');
  const [roleID, setRoleID] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [departmentID, setDepartmentID] = useState('');
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // valid Name
    if (name === '' || name.length < 6) {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }

    // valid Username
    if (username === '' || username.length < 6) {
      usernameRef.current.classList.add('border_danger');
    } else {
      usernameRef.current.classList.remove('border_danger');
    }

    // valid Password
    if (password === '' || password.length < 8) {
      passwordRef.current.classList.add('border_danger');
    } else {
      passwordRef.current.classList.remove('border_danger');
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

    // valid Citizen Card
    if (citizenIdentificationCard === '') {
      citizenCardRef.current.classList.add('border_danger');
    } else {
      citizenCardRef.current.classList.remove('border_danger');
    }

    // valid Role
    if (roleID === '' && role === '' && role.length < 5) {
      roleRef.current.classList.add('border_danger');
    } else {
      roleRef.current.classList.remove('border_danger');
    }

    // valid Department
    if (departmentID === '' && department === '' && department.length < 5) {
      departmentRef.current.classList.add('border_danger');
    } else {
      departmentRef.current.classList.remove('border_danger');
    }

    // valid born at Ward
    if (bornWardID === '') {
      wardBornRef.current.classList.add('border_danger');
    } else {
      wardBornRef.current.classList.remove('border_danger');
    }

    // valid live at Ward
    if (liveAtWardID === '') {
      wardLiveRef.current.classList.add('border_danger');
    } else {
      wardLiveRef.current.classList.remove('border_danger');
    }

    // valid Address born
    if (addressBorn === '') {
      addressBornRef.current.classList.add('border_danger');
    } else {
      addressBornRef.current.classList.remove('border_danger');
    }

    // valid Address live
    if (addressLive === '') {
      addressLiveRef.current.classList.add('border_danger');
    } else {
      addressLiveRef.current.classList.remove('border_danger');
    }
    // set data form
    const data = new FormData();
    data.append('name', name);
    data.append('username', username);
    data.append('password', password);
    data.append('avatar', avatar);
    data.append('phone', phone);
    data.append('birthday', birthday);
    data.append('citizen_card', citizenIdentificationCard);
    data.append('born_ward_id', bornWardID);
    data.append('live_ward_id', liveAtWardID);
    data.append('address_born', addressBorn);
    data.append('address_live', addressLive);
    data.append('gender', gender);

    //handle set role if Role haven't create
    if (roleID) {
      data.append('role_id', roleID);
    } else {
      data.append('role_name', role);
    }

    //handle set role if Department haven't create
    if (departmentID) {
      data.append('department_id', departmentID);
    } else {
      data.append('department_name', department);
    }

    if (
      name.length >= 6 &&
      username.length >= 6 &&
      password.length >= 8 &&
      phone &&
      birthday &&
      validUsername === false &&
      gender &&
      citizenIdentificationCard &&
      (roleID || role.length > 4) &&
      (departmentID || department.length > 4) &&
      bornWardID &&
      liveAtWardID &&
      addressBorn &&
      addressLive
    ) {
      CreateAdmin(data)
        .then((result) => {
          setSubmitSuccess(result.success);
        })
        .catch((e) => console.log(e));
      setSubmitError('');
    } else {
      setSubmitSuccess('');
      setSubmitError('please enter full!');
    }
  };

  /* handle check username */
  const CheckUser = useDebounce(username, 500);
  useEffect(() => {
    CheckUsername('admin', CheckUser)
      .then((result) => {
        if (result.error) {
          setvalidUsername(true);
          usernameRef.current.classList.add('border_danger');
        } else {
          setvalidUsername(false);
          usernameRef.current.classList.remove('border_danger');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [CheckUser]);

  return (
    <>
      <WrapperMain title="Add Admin">
        <form
          className={cx('add_admin-content', 'd-flex flex-column align-items-center')}
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
              <FormSearch ref={nameRef} title="full name" useTippy={false} searchValue={setName} />
            </div>
            <div className={cx('form-content_username')}>
              <FormSearch ref={usernameRef} title="username" useTippy={false} searchValue={setUsername} />
              {validUsername ? <div className="text-danger text-capitalize">{validUsername}</div> : ''}
            </div>
            <div className={cx('form-content_password')}>
              <FormSearch
                ref={passwordRef}
                inputType="password"
                title="password"
                useTippy={false}
                searchValue={setPassword}
              />
            </div>
            <div className={cx('form-content_phone')}>
              <FormSearch ref={phoneRef} title="phone" useTippy={false} searchValue={setPhone} />
            </div>
            <div className={cx('form-content_gender')}>
              <FormSelect ref={genderRef} title="gender" handleSetValue={setGender} />
            </div>
            <div className={cx('form-content_birthday')}>
              <FormDate ref={birthdayRef} title="birthday" handleSetValue={setBirthDay} />
            </div>
            <div className={cx('form-content_citizen-card')}>
              <FormSearch
                ref={citizenCardRef}
                inputType="number"
                title="Citizen Card"
                useTippy={false}
                searchValue={setCitizenIdentificationCard}
              />
            </div>
            <div className={cx('form-content_role')}>
              <Role ref={roleRef} title="role" useNull={false} handleSetName={setRole} handleSetID={setRoleID} />
            </div>
            <div className={cx('form-content_department')}>
              <Department
                useNull={false}
                ref={departmentRef}
                title="department"
                handleSetName={setDepartment}
                handleSetID={setDepartmentID}
              />
            </div>
          </div>
          <div className={cx('location', 'd-flex flex-row')}>
            <div className={cx('filter-element', 'form-group d-flex flex-column')}>
              <label className="form-label">Born</label>
              <div className={cx('born-at', 'form-group d-flex flex-row flex-wrap')}>
                <Location title="country" classTitle="country_born" useLabel={false} handleSetID={setBornCountryID} />
                <Location
                  title="city"
                  classTitle="city_born"
                  foreignID={bornCountryID}
                  useLabel={false}
                  handleSetID={setBornCityID}
                />
                <Location
                  title="district"
                  foreignID={bornCityID}
                  classTitle="district_born"
                  useLabel={false}
                  handleSetID={setBornDistrictID}
                />
                <Location
                  title="ward"
                  foreignID={bornDistrictID}
                  ref={wardBornRef}
                  classTitle="ward_born"
                  useLabel={false}
                  handleSetID={setBornWardID}
                />
                <FormText
                  ref={addressBornRef}
                  title="address"
                  rows={3}
                  useLabel={false}
                  handleSetValue={setAddressBorn}
                />
              </div>
            </div>
            <div className={cx('filter-element', 'form-group d-flex flex-column')}>
              <label className="form-label">Live</label>
              <div className={cx('live-at', 'form-group d-flex flex-row flex-wrap')}>
                <Location title="country" classTitle="country_live" useLabel={false} handleSetID={setLiveAtCountryID} />
                <Location
                  title="city"
                  classTitle="city_live"
                  foreignID={liveAtCountryID}
                  useLabel={false}
                  handleSetID={setLiveAtCityID}
                />
                <Location
                  title="district"
                  foreignID={liveAtCityID}
                  classTitle="district_live"
                  useLabel={false}
                  handleSetID={setLiveAtDistrictID}
                />
                <Location
                  title="ward"
                  foreignID={liveAtDistrictID}
                  ref={wardLiveRef}
                  classTitle="ward_live"
                  useLabel={false}
                  handleSetID={setLiveAtWardID}
                />
                <FormText
                  ref={addressLiveRef}
                  title="address"
                  rows={3}
                  useLabel={false}
                  handleSetValue={setAddressLive}
                />
              </div>
            </div>
          </div>
          {submitError ? <div className="text-danger text-capitalize fs-4 mx-3">{submitError}</div> : ''}
          {submitSuccess ? <div className="text-success text-capitalize fs-4 mx-3">{submitSuccess}</div> : ''}
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
