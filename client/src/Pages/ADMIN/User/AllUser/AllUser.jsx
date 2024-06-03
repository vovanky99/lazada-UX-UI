import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../User.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import config from '~/config';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import ListUser from './ListUser';
import Location from '~/layout/Component/Location';
import { GetData } from '~/api/General/HandleData';

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
  const [cityID, setCityID] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [wardID, setWardID] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(1);
  const [dataTable, setDataTable] = useState(null);

  const handleDeleteSuccess = (value) => {
    setDeleteSuccess(deleteSuccess + value);
  };

  /* get data table  */
  useEffect(() => {
    GetData('admin', 'user', {
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
            <FormSearch title="name" useTippy={false} searchValue={setName} />
            <FormSearch title="email" useTippy={false} searchValue={setEmail} />
            <FormSearch title="Phone" inputType="number" useTippy={false} searchValue={setPhone} />
            <FormSelect title="gender" handleSetValue={setGender} />
            <FormSelect title="status" useStatus={true} handleSetValue={setStatus} />
            <FormDate title="birthday" handleSetValue={setBirthday} />
            <FormDate title="birthday to" handleSetValue={setBirthdayTo} />
            <FormDate title="birthday from" handleSetValue={setBirthdayFrom} />
            <div className={cx('filter_address', 'd-flex flex-row flex-wrap')}>
              <Location title="country" handleSetID={setCountryID} />
              <Location title="city" ValueID={countryID} handleSetID={setCityID} />
              <Location title="district" ValueID={cityID} handleSetID={setDistrictID} />
              <Location title="ward" ValueID={districtID} handleSetID={setWardID} />
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
