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
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone_number: '',
    status: '',
    gender: '',
    birthday: '',
    birthday_to: '',
    birthday_from: '',
    country_id: '',
    city_id: '',
    district_id: '',
    ward_id: '',
  });

  const [deleteSuccess, setDeleteSuccess] = useState(1);
  const [dataTable, setDataTable] = useState(null);

  const handleSetName = (value) => {
    setUser({
      ...user,
      name: value,
    });
  };
  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSetStatus = (value) => {
    setUser({
      ...user,
      status: value,
    });
  };
  const handleSetGender = (value) => {
    setUser({
      ...user,
      gender: value,
    });
  };

  const handleSetLocation = (e) => {
    const { name, id } = e.target.dataset;
    setUser({
      ...user,
      [name]: id,
    });
  };

  const handleDeleteSuccess = (value) => {
    setDeleteSuccess(deleteSuccess + value);
  };

  /* get data table  */
  useEffect(() => {
    GetData('admin', 'user', user)
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user, deleteSuccess]);

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
            <FormSearch title="name" name="name" useTippy={false} searchValue={handleSetName} />
            <FormSearch title="email" name="email" useTippy={false} handleOnchange={handleOnchange} />
            <FormSearch
              title="Phone"
              name="phone_number"
              inputType="number"
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <FormSelect title="gender" name="gender" handleSetValue={handleSetGender} />
            <FormSelect title="status" name="status" useStatus={true} handleSetValue={handleSetStatus} />
            <FormDate title="birthday" name="birthday" handleOnchange={handleOnchange} />
            <FormDate title="birthday to" name="birthday_to" handleOnchange={handleOnchange} />
            <FormDate title="birthday from" name="birthday_from" handleOnchange={handleOnchange} />
            <div className={cx('filter_address', 'd-flex flex-row flex-wrap')}>
              <Location title="country" name="country_id" handleOnclick={handleSetLocation} />
              <Location title="city" name="city_id" ValueID={user.country_id} handleOnclick={handleSetLocation} />
              <Location title="district" name="district_id" ValueID={user.city_id} handleOnclick={handleSetLocation} />
              <Location title="ward" name="ward_id" ValueID={user.district_id} handleOnclick={handleSetLocation} />
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
              <ListUser data={dataTable} handleDelete={handleDeleteSuccess} />
            </tbody>
          </table>
        </div>
      </WrapperMain>
    </>
  );
}
