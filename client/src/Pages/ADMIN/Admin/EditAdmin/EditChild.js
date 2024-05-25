import classNames from 'classnames/bind';
import styles from '../Admin.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { EditData } from '~/Services/General/HandleData';
import WrapperMain from '~/Layout/Component/WrapperMain';
import Button from '~/components/Button';
import CldUploadImg from '~/Services/cloudinary/CldUploadImg';
import GetRole from '~/Services/Role/GetRole';
import GetDepartment from '~/Services/Department/GetDepartment';
import GetLocation from '~/Services/Location/GetLocation';
import Images from '~/components/Images';
import { SearchSelect } from '~/Layout/Component/SearchSelect';
import { FormSelect } from '~/Layout/Component/FormGroup/FormSelect';
import { FormDate } from '~/Layout/Component/FormGroup/FormDate';
import { FormText } from '~/Layout/Component/FormGroup/FormText';

const cx = classNames.bind(styles);

export default function EditChild({ data }) {
  const navigate = useNavigate();
  const nameRef = useRef();
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
  const [birthday, setBirthDay] = useState(data.birthday || '');
  const [citizenIdentificationCard, setCitizenIdentificationCard] = useState(data.citizen_identification_card || '');
  const [searchBornCountry, setSearchBornCountry] = useState(data.address_t.ward.district.city.country.name || '');
  const [bornCountryID, setBornCountryID] = useState(data.address_t.ward.district.city.country.id || '');
  const [bornCountryData, setBornCountryData] = useState('');
  const [searchBornCity, setSearchBornCity] = useState(data.address_t.ward.district.city.name || '');
  const [bornCityID, setBornCityID] = useState(data.address_t.ward.district.city.id || '');
  const [bornCityData, setBornCityData] = useState('');
  const [searchBornDistrict, setSearchBornDistrict] = useState(data.address_t.ward.district.name || '');
  const [bornDistrictID, setBornDistrictID] = useState(data.address_t.ward.district.id || '');
  const [bornDistrictData, setBornDistrictData] = useState('');
  const [searchBornWard, setSearchBornWard] = useState(data.address_t.ward.name || '');
  const [bornWardID, setBornWardID] = useState(data.address_t.ward.id || '');
  const [bornWardData, setBornWardData] = useState('');
  const [searchLiveAtCountry, setSearchLiveAtCountry] = useState(data.address_p.ward.district.city.country.name || '');
  const [liveAtCountryID, setLiveAtCountryID] = useState(data.address_p.ward.district.city.country.id || '');
  const [liveAtCountryData, setLiveAtCountryData] = useState('');
  const [searchLiveAtCity, setSearchLiveAtCity] = useState(data.address_p.ward.district.city.name || '');
  const [liveAtCityID, setLiveAtCityID] = useState(data.address_p.ward.district.city.id || '');
  const [liveAtCityData, setLiveAtCityData] = useState('');
  const [searchLiveAtDistrict, setSearchLiveAtDistrict] = useState(data.address_p.ward.district.name || '');
  const [liveAtDistrictID, setLiveAtDistrictID] = useState(data.address_p.ward.district.id || '');
  const [liveAtDistrictData, setLiveAtDistrictData] = useState('');
  const [searchLiveAtWard, setSearchLiveAtWard] = useState(data.address_p.ward.name || '');
  const [liveAtWardID, setLiveAtWardID] = useState(data.address_p.ward.id || '');
  const [liveAtWardData, setLiveAtWardData] = useState('');
  const [addressBorn, setAddressBorn] = useState(data.address_t.street_address || '');
  const [addressLive, setAddressLive] = useState(data.address_p.street_address || '');
  const [role, setRole] = useState(data.role.name || '');
  const [roleID, setRoleID] = useState(data.role_id || '');
  const [roleData, setRoleData] = useState('');
  const [department, setDepartment] = useState(data.department.name || '');
  const [departmentID, setDepartmentID] = useState(data.department_id || '');
  const [departmentData, setDepartmentData] = useState('');
  const [submitError, setSubmitError] = useState('');
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
    // let datas = new FormData();
    // datas.append('name', name);
    // datas.append('password', password);
    // datas.append('avatar', avatar);
    // datas.append('phone', phone);
    // datas.append('birthday', birthday);
    // datas.append('citizen_card', citizenIdentificationCard);
    // datas.append('born_ward_id', bornWardID);
    // datas.append('live_ward_id', liveAtWardID);
    // datas.append('address_born', addressBorn);
    // datas.append('address_live', addressLive);
    // datas.append('gender', gender);
    // datas.append('role_id', roleID);
    // datas.append('department_id', departmentID);

    if (
      name.length >= 6 &&
      phone &&
      birthday &&
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

  /* handle get role */
  useEffect(() => {
    GetRole(role)
      .then((result) => {
        setRoleData(result);
      })
      .catch((e) => console.log(e));
  }, [role]);

  /* handle get department */
  useEffect(() => {
    GetDepartment(department)
      .then((result) => {
        setDepartmentData(result);
      })
      .catch((e) => console.log(e));
  }, [department]);

  /* handle get Country born */
  useEffect(() => {
    GetLocation('country', searchBornCountry)
      .then((result) => setBornCountryData(result))
      .catch((e) => {
        console.log(e);
      });
  }, [searchBornCountry]);

  /* handle get City born */
  useEffect(() => {
    GetLocation('city', searchBornCity, bornCountryID)
      .then((result) => setBornCityData(result))
      .catch((e) => {
        console.log(e);
      });
  }, [searchBornCity, bornCountryID]);

  /* handle get District born */
  useEffect(() => {
    GetLocation('district', searchBornDistrict, bornCityID)
      .then((result) => setBornDistrictData(result))
      .catch((e) => {
        console.log(e);
      });
  }, [searchBornDistrict, bornCityID]);

  /* handle get Ward born */
  useEffect(() => {
    GetLocation('ward', searchBornWard, bornDistrictID)
      .then((result) => setBornWardData(result))
      .catch((e) => {
        console.log(e);
      });
  }, [searchBornWard, bornDistrictID]);

  /* handle get Country live at */
  useEffect(() => {
    GetLocation('country', searchLiveAtCountry)
      .then((result) => setLiveAtCountryData(result))
      .catch((e) => {
        console.log(e);
      });
  }, [searchLiveAtCountry]);

  /* handle get City live at */
  useEffect(() => {
    GetLocation('city', searchLiveAtCity, liveAtCountryID)
      .then((result) => setLiveAtCityData(result))
      .catch((e) => {
        console.log(e);
      });
  }, [searchLiveAtCity, liveAtCountryID]);

  /* handle get District live at */
  useEffect(() => {
    GetLocation('district', searchLiveAtDistrict, liveAtCityID)
      .then((result) => setLiveAtDistrictData(result))
      .catch((e) => {
        console.log(e);
      });
  }, [searchLiveAtDistrict, liveAtCityID]);

  /* handle get ward live at */
  useEffect(() => {
    GetLocation('ward', searchLiveAtWard, liveAtDistrictID)
      .then((result) => setLiveAtWardData(result))
      .catch((e) => {
        console.log(e);
      });
  }, [searchLiveAtWard, liveAtDistrictID]);

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
              <input ref={avatarRef} type="file" onChange={handleChangeAvatar} />
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
                <SearchSelect
                  ref={roleRef}
                  title="role"
                  valueID={roleID}
                  searchValue={role}
                  data={roleData}
                  searchSelectValue={setRole}
                  handleSetID={setRoleID}
                />
              </div>
              <div className={cx('form-content_department')}>
                <SearchSelect
                  valueID={departmentID}
                  searchValue={department}
                  ref={departmentRef}
                  title="department"
                  data={departmentData}
                  searchSelectValue={setDepartment}
                  handleSetID={setDepartmentID}
                />
              </div>
            </div>
            <div className={cx('location', 'd-flex flex-row')}>
              <div className={cx('filter-element', 'form-group d-flex flex-column')}>
                <label className="form-label">Born</label>
                <div className={cx('born-at', 'form-group d-flex flex-row flex-wrap')}>
                  <SearchSelect
                    title="country"
                    valueID={bornCountryID}
                    searchValue={searchBornCountry}
                    isLabel={false}
                    data={bornCountryData}
                    handleSetID={setBornCountryID}
                    searchSelectValue={setSearchBornCountry}
                  />
                  <SearchSelect
                    title="city"
                    valueID={bornCityID}
                    searchValue={searchBornCity}
                    isLabel={false}
                    data={bornCityData}
                    handleSetID={setBornCityID}
                    searchSelectValue={setSearchBornCity}
                  />
                  <SearchSelect
                    title="district"
                    valueID={bornDistrictID}
                    searchValue={searchBornCity}
                    isLabel={false}
                    data={bornDistrictData}
                    handleSetID={setBornDistrictID}
                    searchSelectValue={setSearchBornDistrict}
                  />
                  <SearchSelect
                    ref={wardBornRef}
                    valueID={bornWardID}
                    searchValue={searchBornWard}
                    title="ward"
                    isLabel={false}
                    data={bornWardData}
                    handleSetID={setBornWardID}
                    searchSelectValue={setSearchBornWard}
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
                  <SearchSelect
                    title="country"
                    classTitle="live-country"
                    valueID={liveAtCountryID}
                    searchValue={searchLiveAtCountry}
                    isLabel={false}
                    data={liveAtCountryData}
                    handleSetID={setLiveAtCountryID}
                    searchSelectValue={setSearchLiveAtCountry}
                  />
                  <SearchSelect
                    title="city"
                    classTitle="live-city"
                    valueID={liveAtCityID}
                    searchValue={searchLiveAtCity}
                    isLabel={false}
                    data={liveAtCityData}
                    handleSetID={setLiveAtCityID}
                    searchSelectValue={setSearchLiveAtCity}
                  />
                  <SearchSelect
                    title="district"
                    classTitle="live-district"
                    valueID={liveAtDistrictID}
                    searchValue={searchLiveAtDistrict}
                    isLabel={false}
                    data={liveAtDistrictData}
                    handleSetID={setLiveAtDistrictID}
                    searchSelectValue={setSearchLiveAtDistrict}
                  />
                  <SearchSelect
                    title="ward"
                    classTitle="live-ward"
                    valueID={liveAtWardID}
                    searchValue={searchLiveAtWard}
                    ref={wardLiveRef}
                    isLabel={false}
                    data={liveAtWardData}
                    handleSetID={setLiveAtWardID}
                    searchSelectValue={setSearchLiveAtWard}
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
