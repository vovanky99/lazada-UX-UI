import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Location.module.scss';
import Button from '~/components/Button';
import { AddLocationToggle } from './AddLocationToggle';
import ListLocation from './ListLocation';
import WrapperMain from '~/layout/Component/WrapperMain';
import CreateLocation from '~/api/Location/CreateLocation';
import GetLocation from '~/api/Location/GetLocation';

const cx = classNames.bind(styles);

export default function Location() {
  /* state for country  */
  const [nameCountry, setNameCountry] = useState('');
  const [country, setCountry] = useState(false);
  const [addCountrySuccess, setAddCountrySuccess] = useState('');
  const [addCountryError, setAddCountryError] = useState('');

  /* state for city */
  const [nameCity, setNameCity] = useState('');
  const [city, setCity] = useState(false);
  const [addCitySuccess, setAddCitySuccess] = useState('');
  const [addCityError, setAddCityError] = useState('');
  const [countryValue, setCountryValue] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');

  /* state for district */
  const [nameDistrict, setNameDistrict] = useState('');
  const [feeShip, setFeeShip] = useState('');
  const [district, setDistrict] = useState(false);
  const [addDistrictSuccess, setAddDistrictSuccess] = useState('');
  const [addDistrictError, setAddDistrictError] = useState('');
  const [cityValue, setCityValue] = useState([]);
  const [searchCity, setSearchCity] = useState('');

  /* state for ward */
  const [nameWard, setNameWard] = useState('');
  const [ward, setWard] = useState(false);
  const [addWardSuccess, setAddWardSuccess] = useState('');
  const [addWardError, setAddWardError] = useState('');
  const [districtValue, setDistrictValue] = useState([]);
  const [searchDistrict, setSearchDistrict] = useState('');

  /* state use general */
  const [CountryID, setCountryID] = useState('');
  const [CityID, setCityID] = useState('');
  const [districtID, setDistrictID] = useState('');

  /* toggle add country  */
  const handleBTNCountryClick = () => {
    if (country) {
      setCountry(false);
    } else {
      setCountry(true);
    }
    setDistrict(false);
    setCity(false);
    setWard(false);
  };

  /* toggle add city  */
  const handleBTNCityClick = () => {
    if (city) {
      setCity(false);
    } else {
      setCity(true);
    }
    setDistrict(false);
    setCountry(false);
    setWard(false);
  };

  /* toggle add district  */
  const handleBTNDistrictClick = () => {
    if (district) {
      setDistrict(false);
    } else {
      setDistrict(true);
    }
    setCity(false);
    setCountry(false);
    setWard(false);
  };

  /* toggle add ward  */
  const handleBTNWardClick = () => {
    if (ward) {
      setWard(false);
    } else {
      setWard(true);
    }
    setCity(false);
    setCountry(false);
    setDistrict(false);
  };

  /* add contry */
  const handleAddContry = async () => {
    const data = new FormData();
    data.append('name', nameCountry);
    if (nameCountry !== '') {
      CreateLocation('country', data)
        .then((result) => {
          if (result.error) {
            setAddCountryError(result.error);
            if (addCountrySuccess !== '') {
              setAddCountrySuccess('');
            }
          } else {
            setAddCountrySuccess(result.success);
            if (addCountryError !== '') {
              setAddCountryError('');
            }
          }
        })
        .catch((e) => console.log(e));
    }
  };

  /* add city */
  const handleAddCity = async () => {
    const data = new FormData();
    data.append('country_id', CountryID);
    data.append('name', nameCity);
    if (nameCity !== '' && CountryID !== '') {
      CreateLocation('city', data)
        .then((result) => {
          if (result.error) {
            setAddCityError(result.error);
            if (addCitySuccess !== '') {
              setAddCitySuccess('');
            }
          } else {
            setAddCitySuccess(result.success);
            if (addCityError !== '') {
              setAddCityError('');
            }
          }
        })
        .catch((e) => console.log(e));
    }
  };

  /* add district */
  const handleAddDistrict = async () => {
    const data = new FormData();
    data.append('name', nameDistrict);
    data.append('country_id', CountryID);
    data.append('city_id', CityID);
    data.append('fee_ship', feeShip);
    if (nameDistrict !== '' && CityID !== '' && CountryID !== '' && feeShip !== '') {
      CreateLocation('district', data)
        .then((result) => {
          if (result.error) {
            setAddDistrictError(result.error);
            if (addDistrictSuccess !== '') {
              setAddDistrictSuccess('');
            }
          } else {
            setAddDistrictSuccess(result.success);
            if (addDistrictError !== '') {
              setAddDistrictError('');
            }
          }
        })
        .catch((e) => console.log(e));
    }
  };

  /* add ward */
  const handleAddWard = async () => {
    const data = new FormData();
    data.append('name', nameWard);
    data.append('country_id', CountryID);
    data.append('city_id', CityID);
    data.append('district_id', districtID);
    if (nameWard && districtID && CityID && CountryID) {
      CreateLocation('ward', data)
        .then((result) => {
          if (result.error) {
            setAddWardError(result.error);
            if (addWardSuccess !== '') {
              setAddWardSuccess('');
            }
          } else {
            setAddWardSuccess(result.success);
            if (addWardError !== '') {
              setAddWardError('');
            }
          }
        })
        .catch((e) => console.log(e));
    }
  };

  /* get Country */
  useEffect(() => {
    GetLocation('country', searchCountry)
      .then((result) => setCountryValue(result))
      .catch((e) => console.log(e));
  }, [searchCountry]);

  /* get City */
  useEffect(() => {
    GetLocation('city', searchCity, CountryID)
      .then((result) => setCityValue(result))
      .catch((e) => console.log(e));
  }, [searchCity, CountryID]);

  /* get District */
  useEffect(() => {
    GetLocation('district', searchDistrict, CityID)
      .then((result) => setDistrictValue(result))
      .catch((e) => console.log(e));
  }, [searchDistrict, CityID]);

  return (
    <>
      <WrapperMain
        title="location"
        BtnAddRender={
          <>
            <div className={cx('add-country')}>
              <Button onClick={handleBTNCountryClick} gradient_primary type="button">
                Add Country
              </Button>
              {country ? (
                <AddLocationToggle
                  title="Country"
                  messageError={addCountryError}
                  messageSuccess={addCountrySuccess}
                  onSubmitForm={handleAddContry}
                  setNameValue={setNameCountry}
                />
              ) : (
                ''
              )}
            </div>
            <div className={cx('add-city')}>
              <Button onClick={handleBTNCityClick} gradient_primary type="button">
                Add City
              </Button>
              {city ? (
                <AddLocationToggle
                  title="City"
                  searchSelectCountryValue={setSearchCountry}
                  messageSuccess={addCitySuccess}
                  messageError={addCityError}
                  countryData={countryValue}
                  handleSetCountryID={setCountryID}
                  onSubmitForm={handleAddCity}
                  setNameValue={setNameCity}
                />
              ) : (
                ''
              )}
            </div>
            <div className={cx('add-district')}>
              <Button onClick={handleBTNDistrictClick} gradient_primary type="button">
                Add District
              </Button>
              {district ? (
                <AddLocationToggle
                  title="District"
                  searchSelectCountryValue={setSearchCountry}
                  searchSelectCityValue={setSearchCity}
                  messageSuccess={addDistrictSuccess}
                  messageError={addDistrictError}
                  countryData={countryValue}
                  cityData={cityValue}
                  handleSetCountryID={setCountryID}
                  handleSetCityID={setCityID}
                  onSubmitForm={handleAddDistrict}
                  setNameValue={setNameDistrict}
                  setFeeShipValue={setFeeShip}
                />
              ) : (
                ''
              )}
            </div>
            <div className={cx('add-ward')}>
              <Button onClick={handleBTNWardClick} gradient_primary type="button">
                Add Ward
              </Button>
              {ward ? (
                <AddLocationToggle
                  title="Ward"
                  searchSelectCountryValue={setSearchCountry}
                  searchSelectCityValue={setSearchCity}
                  searchSelectDistrictValue={setSearchDistrict}
                  messageSuccess={addWardSuccess}
                  messageError={addWardError}
                  countryData={countryValue}
                  cityData={cityValue}
                  districtData={districtValue}
                  onSubmitForm={handleAddWard}
                  handleSetCountryID={setCountryID}
                  handleSetCityID={setCityID}
                  handleSetDistrictID={setDistrictID}
                  setNameValue={setNameWard}
                />
              ) : (
                ''
              )}
            </div>
          </>
        }
      >
        <ListLocation />
      </WrapperMain>
    </>
  );
}
