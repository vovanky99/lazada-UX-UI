import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from '../Admin.module.scss';
import Button from '~/components/Button';
import config from '~/config';
import WrapperMain from '~/layout/Component/WrapperMain';
import { SearchSelect } from '~/layout/Component/SearchSelect';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import GetLocation from '~/api/Location/GetLocation';
import GetRole from '~/api/Role/GetRole';
import GetDepartment from '~/api/Department/GetDepartment';
import getAdmin from '~/api/Admin/GetAdmin';
import ListAdmin from './ListAdmin';
import Department from '../Department';
import Role from '../Role';
import Location from '~/layout/Component/Location';

const cx = classNames.bind(styles);

export default function AllAdmin() {
  const [dataTable, setDataTable] = useState([]);
  const [name, setName] = useState(null);
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  // const [phone, setPhone] = useState(null);
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [workStartDate, setWorkStartDate] = useState('');
  const [leaveOffWork, setLeaveOffWork] = useState('');
  const [birthday, setBirthDay] = useState('');
  const [bornCountryID, setBornCountryID] = useState('');
  const [bornCityID, setBornCityID] = useState('');
  const [bornDistrictID, setBornDistrictID] = useState('');
  const [bornWardID, setBornWardID] = useState('');
  const [liveAtCountryID, setLiveAtCountryID] = useState('');
  const [liveAtCityID, setLiveAtCityID] = useState('');
  const [liveAtDistrictID, setLiveAtDistrictID] = useState('');
  const [liveAtWardID, setLiveAtWardID] = useState('');

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
    getAdmin({
      name,
      birthday,
      role,
      department,
      gender,
      status,
      work_at: workStartDate,
      leave_off_work: leaveOffWork,
      born_country: bornCountryID,
      born_city: bornCityID,
      born_district: bornDistrictID,
      born_ward: bornWardID,
      live_at_country: liveAtCountryID,
      live_at_city: liveAtCityID,
      live_at_district: liveAtDistrictID,
      live_at_ward: liveAtWardID,
    })
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => console.log(e));
  }, [
    liveAtCityID,
    liveAtCountryID,
    liveAtDistrictID,
    liveAtWardID,
    bornCityID,
    bornCountryID,
    bornDistrictID,
    bornWardID,
    name,
    birthday,
    role,
    gender,
    status,
    workStartDate,
    leaveOffWork,
    department,
  ]);

  return (
    <>
      <WrapperMain
        title="Admin"
        BtnAddRender={
          <div className={cx('btn-add')}>
            <Button to={`${config.adminRoutes.AddAdmin}`} className={cx('py-2')} gradient_primary>
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
            <SearchSelect title="name" useTippy={false} searchSelectValue={setName} />
            <FormDate title="birthday" handleSetValue={setBirthDay} />
            <Role title="role" handleSetID={setRole} />
            <Department title="department" handleSetID={setDepartment} />
            <FormSelect title="gender" handleSetValue={setGender} />
            <FormSelect title="status" data={statusWork} handleSetValue={setStatus} />
            <FormDate title="work at" handleSetValue={setWorkStartDate} />
            <FormDate title="leave off work" handleSetValue={setLeaveOffWork} />
            <div className={cx('', 'd-flex flex-row flex-grow-1')}>
              <div className={cx('filter-element', 'form-group d-flex flex-column')}>
                <label className="form-label">Born</label>
                <div className={cx('born-at', 'form-group d-flex flex-row flex-wrap')}>
                  <Location title="country" classTitle="country_born" useLabel={false} handleSetID={setBornCountryID} />
                  <Location
                    title="city"
                    classTitle="city_born"
                    ForeignID={bornCountryID}
                    useLabel={false}
                    handleSetID={setBornCityID}
                  />
                  <Location
                    title="district"
                    ForeignID={bornCityID}
                    classTitle="district_born"
                    useLabel={false}
                    handleSetID={setBornDistrictID}
                  />
                  <Location
                    title="ward"
                    ForeignID={bornDistrictID}
                    classTitle="ward_born"
                    useLabel={false}
                    handleSetID={setBornWardID}
                  />
                </div>
              </div>
              <div className={cx('filter-element', 'form-group d-flex flex-column')}>
                <label className="form-label">Live</label>
                <div className={cx('live-at', 'form-group d-flex flex-row flex-wrap')}>
                  <Location
                    title="country"
                    classTitle="country_live"
                    useLabel={false}
                    handleSetID={setLiveAtCountryID}
                  />
                  <Location
                    title="city"
                    classTitle="city_live"
                    ForeignID={liveAtCountryID}
                    useLabel={false}
                    handleSetID={setLiveAtCityID}
                  />
                  <Location
                    title="district"
                    ForeignID={liveAtCityID}
                    classTitle="district_live"
                    useLabel={false}
                    handleSetID={setLiveAtDistrictID}
                  />
                  <Location
                    title="ward"
                    ForeignID={liveAtDistrictID}
                    classTitle="ward_live"
                    useLabel={false}
                    handleSetID={setLiveAtWardID}
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
