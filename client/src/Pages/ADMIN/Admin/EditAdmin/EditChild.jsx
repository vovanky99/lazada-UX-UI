import classNames from 'classnames/bind';
import styles from '../Admin.module.scss';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

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
import Department from '../Department';
import Role from '../Role';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import FormImage from '~/layout/Component/FormGroup/FormImage';

const cx = classNames.bind(styles);

export default function EditChild({ data }) {
  const navigate = useNavigate();
  const nameRef = useRef();
  const statusRef = useRef();
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

  const [admin, setAdmin] = useState({
    name: data.name || '',
    password: '',
    avatar: data.avatar || '',
    phone_number: data.phone_number || '',
    gender: data.gender || '',
    status: data.status || '',
    birthday: data.birthday || '',
    citizen_identification_card: data.citizen_identification_card || '',
    department_id: data.department_id || '',
    role_id: data.role_id || '',
    address_born: data.address_t.street_address || '',
    address_live: data.address_p.street_address || '',
    live_ward_id: data.address_p.ward.id || '',
    born_ward_id: data.address_t.ward.id || '',
  });
  const [bornCountryID, setBornCountryID] = useState(data.address_t.ward.district.city.country.id || '');
  const [bornCityID, setBornCityID] = useState(data.address_t.ward.district.city.id || '');
  const [bornDistrictID, setBornDistrictID] = useState(data.address_t.ward.district.id || '');
  const [liveAtCountryID, setLiveAtCountryID] = useState(data.address_p.ward.district.city.country.id || '');
  const [liveAtCityID, setLiveAtCityID] = useState(data.address_p.ward.district.city.id || '');
  const [liveAtDistrictID, setLiveAtDistrictID] = useState(data.address_p.ward.district.id || '');
  const [submitError, setSubmitError] = useState('');

  const handleSetAvatar = (value) => {
    setAdmin({
      ...admin,
      avatar: value,
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

  const handleSetStatus = (value) => {
    setAdmin({
      ...admin,
      status: value,
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

  const handleSetWardLiveID = (value) => {
    setAdmin({
      ...admin,
      live_ward_id: value,
    });
  };
  const handleSetWardBornID = (value) => {
    setAdmin({
      ...admin,
      born_ward_id: value,
    });
  };

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const validated = () => {
    // valid Name
    if (admin.name.length < 6) {
      nameRef.current.classList.add('input_danger');
    } else {
      nameRef.current.classList.remove('input_danger');
    }

    // valid Phone
    if (admin.phone_number === '') {
      phoneRef.current.classList.add('input_danger');
    } else {
      phoneRef.current.classList.remove('input_danger');
    }

    // valid status
    if (admin.status === '') {
      statusRef.current.classList.add('input_danger');
    } else {
      statusRef.current.classList.remove('input_danger');
    }

    // valid gender
    if (admin.gender === '') {
      genderRef.current.classList.add('input_danger');
    } else {
      genderRef.current.classList.remove('input_danger');
    }

    // valid Birthday
    if (admin.birthday === '') {
      birthdayRef.current.classList.add('input_danger');
    } else {
      birthdayRef.current.classList.remove('input_danger');
    }

    // valid Citizen Card
    if (admin.citizen_identification_card === '') {
      citizenCardRef.current.classList.add('input_danger');
    } else {
      citizenCardRef.current.classList.remove('input_danger');
    }

    // valid Role
    if (admin.role_id === '') {
      roleRef.current.classList.add('input_danger');
    } else {
      roleRef.current.classList.remove('input_danger');
    }

    // valid Department
    if (admin.department_id === '') {
      departmentRef.current.classList.add('input_danger');
    } else {
      departmentRef.current.classList.remove('input_danger');
    }

    // valid born at Ward
    if (admin.born_ward_id === '') {
      wardBornRef.current.classList.add('input_danger');
    } else {
      wardBornRef.current.classList.remove('input_danger');
    }

    // valid live at Ward
    if (admin.live_ward_id === '') {
      wardLiveRef.current.classList.add('input_danger');
    } else {
      wardLiveRef.current.classList.remove('input_danger');
    }

    // valid Address born
    if (admin.address_born === '') {
      addressBornRef.current.classList.add('input_danger');
    } else {
      addressBornRef.current.classList.remove('input_danger');
    }

    // valid Address live
    if (admin.address_live === '') {
      addressLiveRef.current.classList.add('input_danger');
    } else {
      addressLiveRef.current.classList.remove('input_danger');
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    validated();
    if (
      admin.name.length >= 6 &&
      admin.phone_number &&
      admin.birthday &&
      admin.status &&
      admin.gender &&
      admin.citizen_identification_card &&
      admin.role_id &&
      admin.department_id &&
      admin.born_ward_id &&
      admin.live_ward_id &&
      admin.address_born &&
      admin.address_live
    ) {
      setSubmitError('');
      EditData('admin', 'admin', data.id, admin)
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
      <WrapperMain title="Edit Admin">
        <form
          className={cx('add_admin-content', 'd-flex flex-column align-items-center')}
          onSubmit={handleSubmitForm}
          noValidate
        >
          <FormImage title="avatar" name="avatar" data={admin.avatar} handleSetValue={handleSetAvatar} />
          <div className={cx('form-content', 'd-flex flex-row flex-wrap')}>
            <FormSearch
              ref={nameRef}
              title="full name"
              name="name"
              Value={admin.name}
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <FormSearch
              ref={passwordRef}
              Value={admin.password}
              inputType="password"
              title="password"
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <FormSearch
              ref={phoneRef}
              title="phone"
              name="phone_number"
              inputType="number"
              Value={admin.phone_number}
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <FormSelect
              ref={genderRef}
              title="gender"
              name="gender"
              defaultValue={admin.gender}
              handleSetValue={handleSetGender}
            />
            <FormSelect
              ref={statusRef}
              title="status"
              name="status"
              useStatus={true}
              defaultValue={admin.status}
              handleSetValue={handleSetStatus}
            />
            <FormDate
              ref={birthdayRef}
              title="birthday"
              name="birthday"
              data={admin.birthday}
              handleSetValue={handleSetBirthday}
            />
            <FormSearch
              ref={citizenCardRef}
              title="Citizen Card"
              name="citizen_identification_card"
              inputType="number"
              Value={admin.citizen_identification_card}
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <Role
              title="role"
              ValueID={admin.role_id}
              ref={roleRef}
              SearchValue={data.role?.name || ''}
              handleSetID={handleSetRoleID}
            />
            <Department
              title="department"
              ref={departmentRef}
              ValueID={admin.department_id}
              SearchValue={data.department?.name || ''}
              handleSetID={handleSetDepartmentID}
            />
          </div>
          <div className={cx('location', 'd-flex flex-row')}>
            <div className={cx('filter-element', 'form-group d-flex flex-column')}>
              <label className="form-label">Born</label>
              <div className={cx('born-at', 'form-group d-flex flex-row flex-wrap')}>
                <Location
                  title="country"
                  SearchValue={data.address_t.ward.district.city.country.name || ''}
                  classTitle="country_born"
                  useLabel={false}
                  handleSetID={setBornCountryID}
                />
                <Location
                  title="city"
                  classTitle="city_born"
                  SearchValue={data.address_t.ward.district.city.name || ''}
                  foreignID={bornCountryID}
                  useLabel={false}
                  handleSetID={setBornCityID}
                />
                <Location
                  title="district"
                  SearchValue={data.address_t.ward.district.name || ''}
                  foreignID={bornCityID}
                  classTitle="district_born"
                  useLabel={false}
                  handleSetID={setBornDistrictID}
                />
                <Location
                  title="ward"
                  SearchValue={data.address_t.ward.name || ''}
                  foreignID={bornDistrictID}
                  classTitle="ward_born"
                  useLabel={false}
                  ref={wardBornRef}
                  handleSetID={handleSetWardBornID}
                />
                <FormText
                  ref={addressBornRef}
                  data={admin.address_born}
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
                <Location
                  title="country"
                  classTitle="country_live"
                  SearchValue={data.address_p.ward.district.city.country.name || ''}
                  useLabel={false}
                  handleSetID={setLiveAtCountryID}
                />
                <Location
                  title="city"
                  classTitle="city_live"
                  SearchValue={data.address_p.ward.district.city.name || ''}
                  foreignID={liveAtCountryID}
                  useLabel={false}
                  handleSetID={setLiveAtCityID}
                />
                <Location
                  title="district"
                  foreignID={liveAtCityID}
                  SearchValue={data.address_p.ward.district.name || ''}
                  classTitle="district_live"
                  useLabel={false}
                  handleSetID={setLiveAtDistrictID}
                />
                <Location
                  title="ward"
                  ref={wardLiveRef}
                  SearchValue={data.address_p.ward.name || ''}
                  foreignID={liveAtDistrictID}
                  classTitle="ward_live"
                  useLabel={false}
                  handleSetID={handleSetWardLiveID}
                />
                <FormText
                  ref={addressLiveRef}
                  title="address"
                  name="address_live"
                  data={admin.address_live}
                  rows={3}
                  useLabel={false}
                  handleOnchange={handleOnchange}
                />
              </div>
            </div>
          </div>
          <MessageDanger message={submitError} />
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
