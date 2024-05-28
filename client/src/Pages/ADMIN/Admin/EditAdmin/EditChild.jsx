import classNames from 'classnames/bind';
import styles from '../Admin.module.scss';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import { EditData } from '~/api/General/HandleData';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import CldUploadImg from '~/services/cloudinary/CldUploadImg';
import Images from '~/components/Images';
import { SearchSelect } from '~/layout/Component/SearchSelect';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import Location from '~/layout/Component/Location';
import Department from '../Department';
import Role from '../Role';

const cx = classNames.bind(styles);

export default function EditChild({ data }) {
  const navigate = useNavigate();
  const nameRef = useRef();
  const statusRef = useRef();
  const avatarRef = useRef();
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

  const [name, setName] = useState(data.name || '');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(data.avatar || '');
  const [phone, setPhone] = useState(data.phone_number || '');
  const [gender, setGender] = useState(data.gender || '');
  const [status, setStatus] = useState(data.status || '');
  const [birthday, setBirthDay] = useState(data.birthday || '');
  const [citizenIdentificationCard, setCitizenIdentificationCard] = useState(data.citizen_identification_card || '');
  const [bornCountryID, setBornCountryID] = useState(data.address_t.ward.district.city.country.id || '');
  const [bornCityID, setBornCityID] = useState(data.address_t.ward.district.city.id || '');
  const [bornDistrictID, setBornDistrictID] = useState(data.address_t.ward.district.id || '');
  const [bornWardID, setBornWardID] = useState(data.address_t.ward.id || '');
  const [liveAtCountryID, setLiveAtCountryID] = useState(data.address_p.ward.district.city.country.id || '');
  const [liveAtCityID, setLiveAtCityID] = useState(data.address_p.ward.district.city.id || '');
  const [liveAtDistrictID, setLiveAtDistrictID] = useState(data.address_p.ward.district.id || '');
  const [liveAtWardID, setLiveAtWardID] = useState(data.address_p.ward.id || '');
  const [addressBorn, setAddressBorn] = useState(data.address_t.street_address || '');
  const [addressLive, setAddressLive] = useState(data.address_p.street_address || '');
  const [roleID, setRoleID] = useState(data.role_id || '');
  const [departmentID, setDepartmentID] = useState(data.department_id || '');
  const [submitError, setSubmitError] = useState('');

  /* set data value */
  const role = data.role?.name || '';
  const department = data.department?.name || '';
  const LiveAtNameCountry = data.address_p.ward.district.city.country.name || '';
  const LiveAtNameCity = data.address_p.ward.district.city.name || '';
  const LiveAtNameDistrict = data.address_p.ward.district.name || '';
  const LiveAtNameWard = data.address_p.ward.name || '';
  const BornNameCountry = data.address_t.ward.district.city.country.name || '';
  const BornNameCity = data.address_t.ward.district.city.name || '';
  const BornNameWard = data.address_t.ward.name || '';
  const BornNameDistrict = data.address_t.ward.district.name || '';

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

    if (
      name.length >= 6 &&
      phone &&
      birthday &&
      status &&
      gender &&
      citizenIdentificationCard &&
      roleID &&
      departmentID &&
      bornWardID &&
      liveAtWardID &&
      addressBorn &&
      addressLive
    ) {
      setSubmitError('');
      EditData('admin', 'admin', data.id, {
        name: name,
        password: password,
        status: status,
        avatar: avatar,
        phone: phone,
        birthday: birthday,
        citizen_card: citizenIdentificationCard,
        born_ward_id: bornWardID,
        live_ward_id: liveAtWardID,
        address_born: addressBorn,
        address_live: addressLive,
        gender: gender,
        role_id: roleID,
        department_id: departmentID,
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
      {data ? (
        <WrapperMain title="Edit Admin">
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
                <SearchSelect
                  ref={nameRef}
                  title="full name"
                  searchValue={name}
                  useTippy={false}
                  searchSelectValue={setName}
                />
              </div>
              <div className={cx('form-content_password')}>
                <SearchSelect
                  ref={passwordRef}
                  searchValue={password}
                  inputType="password"
                  title="password"
                  useTippy={false}
                  searchSelectValue={setPassword}
                />
              </div>
              <div className={cx('form-content_phone')}>
                <SearchSelect
                  ref={phoneRef}
                  title="phone"
                  searchValue={phone}
                  useTippy={false}
                  searchSelectValue={setPhone}
                />
              </div>
              <div className={cx('form-content_gender')}>
                <FormSelect ref={genderRef} title="gender" defaultValue={gender} handleSetValue={setGender} />
              </div>
              <div className={cx('form-content_status')}>
                <FormSelect
                  ref={statusRef}
                  title="status"
                  isStatus={true}
                  defaultValue={status}
                  handleSetValue={setStatus}
                />
              </div>
              <div className={cx('form-content_birthday')}>
                <FormDate ref={birthdayRef} title="birthday" data={birthday} handleSetValue={setBirthDay} />
              </div>
              <div className={cx('form-content_citizen-card')}>
                <SearchSelect
                  ref={citizenCardRef}
                  searchValue={citizenIdentificationCard}
                  inputType="number"
                  title="Citizen Card"
                  useTippy={false}
                  searchSelectValue={setCitizenIdentificationCard}
                />
              </div>
              <div className={cx('form-content_role')}>
                <Role
                  title="role"
                  ValueID={departmentID}
                  ref={roleRef}
                  SearchValue={department}
                  handleSetID={setRoleID}
                />
              </div>
              <div className={cx('form-content_department')}>
                <Department
                  title="department"
                  ref={departmentRef}
                  ValueID={departmentID}
                  SearchValue={department}
                  handleSetID={setDepartmentID}
                />
              </div>
            </div>
            <div className={cx('location', 'd-flex flex-row')}>
              <div className={cx('filter-element', 'form-group d-flex flex-column')}>
                <label className="form-label">Born</label>
                <div className={cx('born-at', 'form-group d-flex flex-row flex-wrap')}>
                  <Location
                    title="country"
                    SearchValue={BornNameCountry}
                    classTitle="country_born"
                    useLabel={false}
                    handleSetID={setBornCountryID}
                  />
                  <Location
                    title="city"
                    classTitle="city_born"
                    SearchValue={BornNameCity}
                    ForeignID={bornCountryID}
                    useLabel={false}
                    handleSetID={setBornCityID}
                  />
                  <Location
                    title="district"
                    SearchValue={BornNameDistrict}
                    ForeignID={bornCityID}
                    classTitle="district_born"
                    useLabel={false}
                    handleSetID={setBornDistrictID}
                  />
                  <Location
                    title="ward"
                    SearchValue={BornNameWard}
                    ForeignID={bornDistrictID}
                    classTitle="ward_born"
                    useLabel={false}
                    ref={wardBornRef}
                    handleSetID={setBornWardID}
                  />
                  <FormText
                    ref={addressBornRef}
                    data={addressBorn}
                    title="address"
                    rows={3}
                    isLabel={false}
                    handleSetValue={setAddressBorn}
                  />
                </div>
              </div>
              <div className={cx('filter-element', 'form-group d-flex flex-column')}>
                <label className="form-label">Live</label>
                <div className={cx('live-at', 'form-group d-flex flex-row flex-wrap')}>
                  <Location
                    title="country"
                    classTitle="country_live"
                    SearchValue={LiveAtNameCountry}
                    useLabel={false}
                    handleSetID={setLiveAtCountryID}
                  />
                  <Location
                    title="city"
                    classTitle="city_live"
                    SearchValue={LiveAtNameCity}
                    ForeignID={liveAtCountryID}
                    useLabel={false}
                    handleSetID={setLiveAtCityID}
                  />
                  <Location
                    title="district"
                    ForeignID={liveAtCityID}
                    SearchValue={LiveAtNameDistrict}
                    classTitle="district_live"
                    useLabel={false}
                    handleSetID={setLiveAtDistrictID}
                  />
                  <Location
                    title="ward"
                    ref={wardLiveRef}
                    SearchValue={LiveAtNameWard}
                    ForeignID={liveAtDistrictID}
                    classTitle="ward_live"
                    useLabel={false}
                    handleSetID={setLiveAtWardID}
                  />
                  <FormText
                    ref={addressLiveRef}
                    data={addressLive}
                    title="address"
                    rows={3}
                    isLabel={false}
                    handleSetValue={setAddressLive}
                  />
                </div>
              </div>
            </div>
            {submitError ? <div className="text-danger text-capitalize fs-4 mx-3">{submitError}</div> : ''}
            <div className={cx('btn-submit')}>
              <Button type="submit" gradient_primary>
                Save
              </Button>
            </div>
          </form>
        </WrapperMain>
      ) : (
        ''
      )}
    </>
  );
}
