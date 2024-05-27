import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../User.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import config from '~/config';
import { SearchSelect } from '~/layout/Component/SearchSelect';
import GetLocation from '~/api/Location/GetLocation';

const cx = classNames.bind(styles);

export default function AllUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
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
  useEffect(() => {}, [countryID, cityID, districtID, wardID]);

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
          <div className={cx('filter_content')}>
            <SearchSelect />
          </div>
        </div>
      </WrapperMain>
    </>
  );
}
