import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from '../Admin.module.scss';
import Button from '~/components/Button';
import config from '~/config';
import Wrapper from '~/Layout/Component/Wrapper';
import { SearchSelect } from '~/Layout/Component/SearchSelect';
import { FormSelect } from '~/Layout/Component/FormGroup/FormSelect';
import { FormDate } from '~/Layout/Component/FormGroup/FormDate';
import GetLocation from '~/Services/Location/GetLocation';
import GetRole from '~/Services/Role/GetRole';
import GetDepartment from '~/Services/Department/GetDepartment';
import getAdmin from '~/Services/Admin/GetAdmin';
import ListAdmin from './ListAdmin';

const cx = classNames.bind(styles);

export default function AllAdmin() {
  const [dataTable, setDataTable] = useState([]);
  const [name, setName] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState(null);
  const [role, setRole] = useState('');
  const [roleData, setRoleData] = useState([]);
  const [department, setDepartment] = useState('');
  const [departmentData, setDepartmentData] = useState([]);
  const [workStartDate, setWorkStartDate] = useState('');
  const [leaveOffWork, setLeaveOffWork] = useState('');
  const [birthday, setBirthDay] = useState('');
  const [bornCountry, setBornCountry] = useState('');
  const [searchBornCountry, setSearchBornCountry] = useState('');
  const [bornCountryID, setBornCountryID] = useState('');
  const [bornCountryData, setBornCountryData] = useState('');
  const [bornCity, setBornCity] = useState('');
  const [searchBornCity, setSearchBornCity] = useState('');
  const [bornCityID, setBornCityID] = useState('');
  const [bornCityData, setBornCityData] = useState('');
  const [bornDistrict, setBornDistrict] = useState('');
  const [searchBornDistrict, setSearchBornDistrict] = useState('');
  const [bornDistrictID, setBornDistrictID] = useState('');
  const [bornDistrictData, setBornDistrictData] = useState('');
  const [bornWard, setBornWard] = useState('');
  const [searchBornWard, setSearchBornWard] = useState('');
  const [bornWardID, setBornWardID] = useState('');
  const [bornWardData, setBornWardData] = useState('');
  const [liveAtCountry, setLiveAtCountry] = useState('');
  const [searchLiveAtCountry, setSearchLiveAtCountry] = useState('');
  const [liveAtCountryID, setLiveAtCountryID] = useState('');
  const [liveAtCountryData, setLiveAtCountryData] = useState('');
  const [liveAtCity, setLiveAtCity] = useState('');
  const [searchLiveAtCity, setSearchLiveAtCity] = useState('');
  const [liveAtCityID, setLiveAtCityID] = useState('');
  const [liveAtCityData, setLiveAtCityData] = useState('');
  const [liveAtDistrict, setLiveAtDistrict] = useState('');
  const [searchLiveAtDistrict, setSearchLiveAtDistrict] = useState('');
  const [liveAtDistrictID, setLiveAtDistrictID] = useState('');
  const [liveAtDistrictData, setLiveAtDistrictData] = useState('');
  const [liveAtWard, setLiveAtWard] = useState('');
  const [searchLiveAtWard, setSearchLiveAtWard] = useState('');
  const [liveAtWardID, setLiveAtWardID] = useState('');
  const [liveAtWardData, setLiveAtWardData] = useState('');

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

  /* handle get role */
  useEffect(() => {
    GetRole()
      .then((result) => setRoleData(result))
      .catch((e) => console.log(e));
  }, []);

  // handle get department
  useEffect(() => {
    GetDepartment()
      .then((result) => setDepartmentData(result))
      .catch((e) => console.log(e));
  }, []);

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
    GetLocation('city', searchLiveAtDistrict, liveAtCityID)
      .then((result) => setLiveAtDistrictData(result))
      .catch((e) => {
        console.log(e);
      });
  }, [searchLiveAtDistrict, liveAtCityID]);

  /* handle get ward live at */
  useEffect(() => {
    GetLocation('city', searchLiveAtWard, liveAtDistrictID)
      .then((result) => setLiveAtWardData(result))
      .catch((e) => {
        console.log(e);
      });
  }, [searchLiveAtWard, liveAtDistrictID]);

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
      born_district: bornDistrict,
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
      <Wrapper
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
            <SearchSelect title="name" useTippy={false} searchSelectValue={setSearchName} />
            <FormDate title="birthday" handleSetValue={setBirthDay} />
            <FormSelect title="role" data={roleData} handleSetValue={setRole} />
            <FormSelect title="department" data={departmentData} handleSetValue={setDepartment} />
            <FormSelect title="gender" handleSetValue={setGender} />
            <FormSelect title="status" data={statusWork} handleSetValue={setStatus} />
            <FormDate title="work at" handleSetValue={setWorkStartDate} />
            <FormDate title="leave off work" handleSetValue={setLeaveOffWork} />
            <div className={cx('', 'd-flex flex-row flex-grow-1')}>
              <div className={cx('filter-element', 'form-group d-flex flex-column')}>
                <label className="form-label">Born</label>
                <div className={cx('born-at', 'form-group d-flex flex-row flex-wrap')}>
                  <SearchSelect
                    title="country"
                    isLabel={false}
                    data={bornCountryData}
                    NullValue={true}
                    handleSetID={setBornCountryID}
                    searchSelectValue={setSearchBornCountry}
                  />
                  <SearchSelect
                    title="city"
                    isLabel={false}
                    data={bornCityData}
                    NullValue={true}
                    handleSetID={setBornCityID}
                    searchSelectValue={setSearchBornCity}
                  />
                  <SearchSelect
                    title="district"
                    isLabel={false}
                    data={bornDistrictData}
                    NullValue={true}
                    handleSetID={setBornDistrictID}
                    searchSelectValue={setSearchBornDistrict}
                  />
                  <SearchSelect
                    title="ward"
                    isLabel={false}
                    data={bornWardData}
                    NullValue={true}
                    handleSetID={setBornWardID}
                    searchSelectValue={setSearchBornWard}
                  />
                </div>
              </div>
              <div className={cx('filter-element', 'form-group d-flex flex-column')}>
                <label className="form-label">Live</label>
                <div className={cx('live-at', 'form-group d-flex flex-row flex-wrap')}>
                  <SearchSelect
                    title="country"
                    classTitle="live-country"
                    isLabel={false}
                    data={liveAtCountryData}
                    NullValue={true}
                    handleSetID={setLiveAtCountryID}
                    searchSelectValue={setLiveAtCountry}
                  />
                  <SearchSelect
                    title="city"
                    classTitle="live-city"
                    isLabel={false}
                    data={liveAtCityData}
                    NullValue={true}
                    handleSetID={setLiveAtCityID}
                    searchSelectValue={setLiveAtCity}
                  />
                  <SearchSelect
                    title="district"
                    classTitle="live-district"
                    isLabel={false}
                    data={liveAtDistrictData}
                    NullValue={true}
                    handleSetID={setLiveAtDistrictID}
                    searchSelectValue={setLiveAtDistrict}
                  />
                  <SearchSelect
                    title="ward"
                    classTitle="live-ward"
                    isLabel={false}
                    data={liveAtWardData}
                    NullValue={true}
                    handleSetID={setLiveAtWardID}
                    searchSelectValue={setLiveAtWard}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className={cx('data-table')}>
          <ListAdmin data={dataTable} />
        </div>
      </Wrapper>
    </>
  );
}
