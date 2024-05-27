import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../User.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import config from '~/config';
import { SearchSelect } from '~/layout/Component/SearchSelect';
import GetLocation from '~/api/Location/GetLocation';
import GetUser from '~/api/User/GetUser';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import ListUser from './LisUser';

const cx = classNames.bind(styles);

export default function AllUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthdayTo, setBirthdayTo] = useState('');
  const [birthdayFrom, setBirthdayFrom] = useState('');
  const [countryID, setCountryID] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [countryData, setCountryData] = useState('');
  const [cityID, setCityID] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [cityData, setCityData] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [districtData, setDistrictData] = useState('');
  const [wardID, setWardID] = useState('');
  const [searchWard, setSearchWard] = useState('');
  const [wardData, setWardData] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(1);
  const [dataTable, setDataTable] = useState(null);

  const handleDeleteSuccess = (value) => {
    setDeleteSuccess(deleteSuccess + value);
  };

  /* get Country */
  useEffect(() => {
    GetLocation('country', searchCountry)
      .then((result) => {
        setCountryData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchCountry]);

  /* get City */
  useEffect(() => {
    GetLocation('city', searchCity, countryID)
      .then((result) => {
        setCityData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchCity, countryID]);

  /* get District */
  useEffect(() => {
    GetLocation('district', searchDistrict, cityID)
      .then((result) => {
        setDistrictData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchDistrict, cityID]);

  /* get Ward */
  useEffect(() => {
    GetLocation('ward', searchWard, districtID)
      .then((result) => {
        setWardData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchWard, districtID]);

  /* get data table  */
  useEffect(() => {
    GetUser({
      country: countryID,
      city: cityID,
      district: districtID,
      ward: wardID,
      birthday_to: birthdayTo,
      birthday_from: birthdayFrom,
      name,
      phone,
      email,
      status,
      gender,
      birthday,
    })
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [
    countryID,
    cityID,
    districtID,
    wardID,
    name,
    phone,
    email,
    status,
    gender,
    birthday,
    birthdayTo,
    birthdayFrom,
    deleteSuccess,
  ]);

  return (
    <>
      <WrapperMain
        title="All User"
        BtnAddRender={
          <>
            <div className={cx('add_user')}>
              <Button gradient_primary to={`${config.adminRoutes.AddUser}`}>
                Add User
              </Button>
            </div>
          </>
        }
      >
        <div className={cx('filter_data')}>
          <h4 className={cx('text-capitalize')}>
            <b>Filter User</b>
          </h4>
          <div className={cx('filter_content', 'd-flex flex-row flex-wrap')}>
            <SearchSelect title="name" useTippy={false} searchSelectValue={setName} />
            <SearchSelect title="email" useTippy={false} searchSelectValue={setEmail} />
            <SearchSelect title="Phone" inputType="number" useTippy={false} searchSelectValue={setPhone} />
            <FormSelect title="gender" handleSetValue={setGender} />
            <FormSelect title="status" isStatus={true} handleSetValue={setStatus} />
            <FormDate title="birthday" handleSetValue={setBirthday} />
            <div className={cx('filter_address', 'd-flex flex-row flex-wrap')}>
              <SearchSelect
                title="country"
                NullValue={true}
                data={countryData}
                searchSelectValue={setSearchCountry}
                handleSetID={setCountryID}
              />
              <SearchSelect
                title="city"
                NullValue={true}
                data={cityData}
                searchSelectValue={setSearchCity}
                handleSetID={setCityID}
              />
              <SearchSelect
                title="district"
                NullValue={true}
                data={districtData}
                searchSelectValue={setSearchDistrict}
                handleSetID={setDistrictID}
              />
              <SearchSelect
                title="ward"
                NullValue={true}
                data={wardData}
                searchSelectValue={setSearchWard}
                handleSetID={setWardID}
              />
            </div>
          </div>
        </div>
        <div className={cx('data_table')}>
          <table>
            <thead>
              <tr className="text-capitalize">
                <th>name</th>
                <th>avatar</th>
                <th>status</th>
                <th>gender</th>
                <th>email</th>
                <th>phone number</th>
                <th>address</th>
                <th>birthday</th>
                <th>Tolls</th>
              </tr>
            </thead>
            <tbody>
              <ListUser data={dataTable} handleDeleteSuccess={handleDeleteSuccess} />
            </tbody>
          </table>
        </div>
      </WrapperMain>
    </>
  );
}
