import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from '~/pages/ADMIN/Admin/Admin.module.scss';
import Button from '~/components/Button';
import config from '~/config';
import WrapperMain from '~/layout/Component/WrapperMain';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import ListAdmin from '~/pages/ADMIN/Admin/AllAdmin/ListAdmin';
import Department from '~/pages/ADMIN/Admin/Department';
import Role from '~/pages/ADMIN/Admin/Role';
import Location from '~/layout/Component/Location';
import { GetData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function AllAdmin() {
  const [dataTable, setDataTable] = useState([]);
  const [admin, setAdmin] = useState({
    name: '',
    status: '',
    gender: '',
    role_id: '',
    department_id: '',
    work_start_date: '',
    leave_off_work: '',
    birthday: '',
    born_country: '',
    born_city: '',
    born_district: '',
    born_ward: '',
    live_country: '',
    live_city: '',
    live_district: '',
    live_ward: '',
  });

  const handleSetName = (value) => {
    setAdmin({
      ...admin,
      name: value,
    });
  };

  const handleSetBirthday = (value) => {
    setAdmin({
      ...admin,
      birthday: value,
    });
  };

  const handleOnclick = (e) => {
    const { name, value } = e.target.dataset;
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
  const handleSetStatus = (value) => {
    setAdmin({
      ...admin,
      status: value,
    });
  };
  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  // create data for select status
  const statusWork = [
    {
      name: 'Work',
      id: '1',
    },
    {
      name: 'Has Retired',
      id: '0',
    },
  ];

  /* handle get data for table */
  useEffect(() => {
    GetData('admin', 'admin', admin)
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => console.log(e));
  }, [admin]);

  return (
    <>
      <WrapperMain
        title="Admin"
        BtnAddRender={
          <div className={cx('btn-add')}>
            <Button to={`${config.adminRoutes.AddAdmin}`} className={cx('py-2')} small gradient_primary>
              Add Admin
            </Button>
          </div>
        }
      >
        <div className={cx('filter-data')}>
          <h4 className={cx('filter-title')}>
            <b>Filter Admin</b>
          </h4>
          <form className={cx('filter-content', 'd-flex flex-row flex-wrap')}>
            <FormSearch title="name" useTippy={false} searchValue={handleSetName} />
            <FormDate title="birthday" handleSetValue={handleSetBirthday} />
            <Role title="role" name="role_id" handleOnclick={handleOnclick} />
            <Department title="department" name="department_id" handleOnclick={handleOnclick} />
            <FormSelect title="gender" handleSetValue={handleSetGender} />
            <FormSelect title="status" data={statusWork} handleSetValue={handleSetStatus} />
            <FormDate title="work at" name="work_start_date" handleOnchange={handleOnchange} />
            <FormDate title="leave off work" name="leave_off_work" handleOnchange={handleOnchange} />
            <div className={cx('', 'd-flex flex-row flex-grow-1')}>
              <div className={cx('filter-element', 'form-group d-flex flex-column')}>
                <label className="form-label">Born</label>
                <div className={cx('born-at', 'form-group d-flex flex-row flex-wrap')}>
                  <Location
                    title="country"
                    name="born_country"
                    classTitle="country_born"
                    useLabel={false}
                    handleOnclick={handleOnclick}
                  />
                  <Location
                    title="city"
                    classTitle="city_born"
                    name="born_city"
                    foreignID={admin.born_country}
                    useLabel={false}
                    handleOnclick={handleOnclick}
                  />
                  <Location
                    title="district"
                    classTitle="district_born"
                    name="born_district"
                    foreignID={admin.born_city}
                    useLabel={false}
                    handleOnclick={handleOnclick}
                  />
                  <Location
                    title="ward"
                    classTitle="ward_born"
                    name="born_ward"
                    foreignID={admin.born_district}
                    useLabel={false}
                    handleOnclick={handleOnclick}
                  />
                </div>
              </div>
              <div className={cx('filter-element', 'form-group d-flex flex-column')}>
                <label className="form-label">Live</label>
                <div className={cx('live-at', 'form-group d-flex flex-row flex-wrap')}>
                  <Location
                    title="country"
                    name="live_country"
                    classTitle="country_live"
                    useLabel={false}
                    handleOnclick={handleOnclick}
                  />
                  <Location
                    title="city"
                    name="live_city"
                    classTitle="city_live"
                    foreignID={admin.live_country}
                    useLabel={false}
                    handleOnclick={handleOnclick}
                  />
                  <Location
                    title="district"
                    name="live_district"
                    foreignID={admin.live_city}
                    classTitle="district_live"
                    useLabel={false}
                    handleOnclick={handleOnclick}
                  />
                  <Location
                    title="ward"
                    name="live_ward"
                    classTitle="ward_live"
                    foreignID={admin.live_district}
                    useLabel={false}
                    handleOnclick={handleOnclick}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className={cx('data-table')}>
          <ListAdmin data={dataTable} />
        </div>
      </WrapperMain>
    </>
  );
}
