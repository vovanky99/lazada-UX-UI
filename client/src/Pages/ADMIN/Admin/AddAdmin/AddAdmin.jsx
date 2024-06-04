import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import styles from '~/pages/ADMIN/Admin/Admin.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import { FormSearch } from '~/layout/Component/FormSearch';
import Button from '~/components/Button';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import CheckUsername from '~/api/Check/CheckUsername';
import Location from '~/layout/Component/Location';
import Department from '~/pages/ADMIN/Admin/Department';
import Role from '~/pages/ADMIN/Admin/Role';
import { CreateData } from '~/api/General/HandleData';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import MessageDanger from '~/layout/Component/Message/MessageDanger';

const cx = classNames.bind(styles);

export default function Addadmin() {
  const nameRef = useRef();
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
  const [validUsername, setvalidUsername] = useState(false);
  const [bornCountryID, setBornCountryID] = useState('');
  const [bornCityID, setBornCityID] = useState('');
  const [bornDistrictID, setBornDistrictID] = useState('');
  const [liveAtCountryID, setLiveAtCountryID] = useState('');
  const [liveAtCityID, setLiveAtCityID] = useState('');
  const [liveAtDistrictID, setLiveAtDistrictID] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [admin, setAdmin] = useState({
    name: '',
    username: '',
    password: '',
    avatar: '',
    phone_number: '',
    gender: '',
    birthday: '',
    citizen_identification_card: '',
    address_born: '',
    address_live: '',
    department_id: '',
    role_id: '',
    live_at_ward_id: '',
    born_ward_id: '',
    department_name: '',
    role_name: '',
  });

  const handleSetAvatar = (value) => {
    setAdmin({
      ...admin,
      avatar: value,
    });
  };

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const handleSetGender = (value) => {
    setAdmin({
      ...admin,
      gender: value,
    });
  };
  const handleSetBirthday = (value) => {
    setAdmin({
      ...admin,
      birthday: value,
    });
  };

  const handleSetRoleID = (value) => {
    setAdmin({
      ...admin,
      role_id: value,
    });
  };

  const handleSetDepartmentID = (value) => {
    setAdmin({
      ...admin,
      department_id: value,
    });
  };

  const handleSetWardBornID = (value) => {
    setAdmin({
      ...admin,
      born_ward_id: value,
    });
  };

  const handleSetWardLiveID = (value) => {
    setAdmin({
      ...admin,
      live_at_ward_id: value,
    });
  };

  const validated = () => {
    if (admin.name === '' || admin.name.length < 6) {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }

    // valid Username
    if (admin.username === '' || admin.username.length < 6) {
      usernameRef.current.classList.add('border_danger');
    } else {
      usernameRef.current.classList.remove('border_danger');
    }

    // valid Password
    if (admin.password === '' || admin.password.length < 8) {
      passwordRef.current.classList.add('border_danger');
    } else {
      passwordRef.current.classList.remove('border_danger');
    }

    // valid Phone
    if (admin.phone_number === '') {
      phoneRef.current.classList.add('border_danger');
    } else {
      phoneRef.current.classList.remove('border_danger');
    }

    // valid gender
    if (admin.gender === '') {
      genderRef.current.classList.add('border_danger');
    } else {
      genderRef.current.classList.remove('border_danger');
    }

    // valid Birthday
    if (admin.birthday === '') {
      birthdayRef.current.classList.add('border_danger');
    } else {
      birthdayRef.current.classList.remove('border_danger');
    }

    // valid Citizen Card
    if (admin.citizen_identification_card === '') {
      citizenCardRef.current.classList.add('border_danger');
    } else {
      citizenCardRef.current.classList.remove('border_danger');
    }

    // valid Role
    if (admin.role_id === '' && admin.role_name.length < 5) {
      roleRef.current.classList.add('border_danger');
    } else {
      roleRef.current.classList.remove('border_danger');
    }

    // valid Department
    if (admin.department_id === '' && admin.department_name.length < 5) {
      departmentRef.current.classList.add('border_danger');
    } else {
      departmentRef.current.classList.remove('border_danger');
    }

    // valid born at Ward
    if (admin.born_ward_id === '') {
      wardBornRef.current.classList.add('border_danger');
    } else {
      wardBornRef.current.classList.remove('border_danger');
    }

    // valid live at Ward
    if (admin.live_at_ward_id === '') {
      wardLiveRef.current.classList.add('border_danger');
    } else {
      wardLiveRef.current.classList.remove('border_danger');
    }

    // valid Address born
    if (admin.address_born === '') {
      addressBornRef.current.classList.add('border_danger');
    } else {
      addressBornRef.current.classList.remove('border_danger');
    }

    // valid Address live
    if (admin.address_live === '') {
      addressLiveRef.current.classList.add('border_danger');
    } else {
      addressLiveRef.current.classList.remove('border_danger');
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    validated();
    if (
      admin.name.length >= 6 &&
      admin.username.length >= 6 &&
      admin.password.length >= 8 &&
      admin.phone_number &&
      admin.birthday &&
      validUsername === false &&
      admin.gender &&
      admin.citizen_identification_card &&
      (admin.role_id || admin.role_name.length > 4) &&
      (admin.department_id || admin.department_name.length > 4) &&
      admin.born_ward_id &&
      admin.live_at_ward_id &&
      admin.address_born &&
      admin.address_live
    ) {
      CreateData('admin', 'admin', admin)
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
  useEffect(() => {
    CheckUsername('admin', admin.username)
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
  }, [admin.username]);

  return (
    <>
      <WrapperMain title="Add admin">
        <form
          className={cx('add_admin-content', 'd-flex flex-column align-items-center')}
          onSubmit={handleSubmitForm}
          noValidate
        >
          <FormImage title="avatar" name="avatar" handleSetValue={handleSetAvatar} />
          <div className={cx('form-content', 'd-flex flex-row flex-wrap')}>
            <FormSearch ref={nameRef} title="full name" name="name" useTippy={false} handleOnchange={handleOnchange} />
            <FormSearch
              ref={usernameRef}
              title="username"
              name="username"
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <FormSearch
              ref={passwordRef}
              inputType="password"
              title="password"
              name="password"
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <FormSearch
              ref={phoneRef}
              title="phone"
              name="phone_number"
              inputType="number"
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <FormSelect ref={genderRef} title="gender" handleSetValue={handleSetGender} />
            <FormDate ref={birthdayRef} title="birthday" handleSetValue={handleSetBirthday} />
            <FormSearch
              ref={citizenCardRef}
              inputType="number"
              title="Citizen Card"
              name="citizen_identification_card"
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <Role
              ref={roleRef}
              title="role"
              name="role"
              useNull={false}
              handleOnchange={handleOnchange}
              handleSetID={handleSetRoleID}
            />
            <Department
              useNull={false}
              ref={departmentRef}
              title="department"
              handleOnchange={handleOnchange}
              handleSetID={handleSetDepartmentID}
            />
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
                  handleSetID={handleSetWardBornID}
                />
                <FormText
                  ref={addressBornRef}
                  title="address"
                  name="address_born"
                  rows={3}
                  useLabel={false}
                  handleOnchange={handleOnchange}
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
                  handleSetID={handleSetWardLiveID}
                />
                <FormText
                  ref={addressLiveRef}
                  title="address"
                  name="address_live"
                  rows={3}
                  useLabel={false}
                  handleOnchange={handleOnchange}
                />
              </div>
            </div>
          </div>
          <MessageSuccess message={submitSuccess} classNames={cx('text-capitalize fs-4 mx-3')} />
          <MessageDanger message={submitError} classNames={cx('text-capitalize fs-4 mx-3')} />
          <div className={cx('btn-submit')}>
            <Button type="submit" small gradient_primary>
              Create
            </Button>
          </div>
        </form>
      </WrapperMain>
    </>
  );
}
