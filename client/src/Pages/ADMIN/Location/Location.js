import classNames from 'classnames/bind';

import styles from './Location.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import { AddLocationToggle } from './AddLocationToggle';
import ListLocation from './ListLocation';

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
      try {
        const res = await axios.post('/api/create-country', data);
        if (res.data) {
          if (res.data.error) {
            setAddCountryError(res.data.error);
            if (addCountrySuccess !== '') {
              setAddCountrySuccess('');
            }
          } else {
            setAddCountrySuccess(res.data.success);
            if (addCountryError !== '') {
              setAddCountryError('');
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  /* add city */
  const handleAddCity = async () => {
    const data = new FormData();
    data.append('country_id', CountryID);
    data.append('name', nameCity);
    if (nameCity !== '' && CountryID !== '') {
      try {
        const res = await axios.post('/api/create-city', data);
        if (res.data) {
          if (res.data.error) {
            setAddCityError(res.data.error);
            if (addCitySuccess !== '') {
              setAddCitySuccess('');
            }
          } else {
            setAddCitySuccess(res.data.success);
            if (addCityError !== '') {
              setAddCityError('');
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
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
      try {
        const res = await axios.post('/api/create-district', data);
        if (res.data) {
          if (res.data.error) {
            setAddDistrictError(res.data.error);
            if (addDistrictSuccess !== '') {
              setAddDistrictSuccess('');
            }
          } else {
            setAddDistrictSuccess(res.data.success);
            if (addDistrictError !== '') {
              setAddDistrictError('');
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
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
      try {
        const res = await axios.post('/api/create-ward', data);
        if (res.data) {
          if (res.data.error) {
            setAddWardError(res.data.error);
            if (addWardSuccess !== '') {
              setAddWardSuccess('');
            }
          } else {
            setAddWardSuccess(res.data.success);
            if (addWardError !== '') {
              setAddWardError('');
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  /* get Country */
  useEffect(() => {
    const getCountry = async () => {
      try {
        const res = await axios.get('/api/get-country', {
          params: {
            name: searchCountry,
          },
        });
        if (res.data) {
          setCountryValue(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getCountry();
  }, [searchCountry, city]);

  /* get City */
  useEffect(() => {
    const getCity = async () => {
      try {
        const res = await axios.get('/api/get-city', {
          params: {
            name: searchCity,
            country_id: CountryID,
          },
        });
        if (res.data) {
          setCityValue(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getCity();
  }, [searchCity, CountryID, district]);

  /* get District */
  useEffect(() => {
    const getDistrict = async () => {
      try {
        const res = await axios.get('/api/get-district', {
          params: {
            name: searchDistrict,
            city_id: CityID,
          },
        });
        if (res.data) {
          setDistrictValue(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDistrict();
  }, [searchDistrict, CityID, ward]);

  return (
    <div className={cx('location')}>
      <h3 className={cx('location_title', 'text-capitalize')}>location</h3>
      <section className={cx('location_header', 'd-flex flex-row')}>
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
      </section>
      <section className={cx('location_footer')}>
        <ListLocation />
      </section>
    </div>
  );
}
