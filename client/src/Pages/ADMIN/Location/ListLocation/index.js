import classNames from 'classnames/bind';
import React from 'react';
import Tippy from '@tippyjs/react/headless';
import { useRef, useState, useEffect } from 'react';

import styles from '../Location.module.scss';
import axios from '~/api/axios';
import Button from '~/components/Button';
import { SelectLocation } from '../SelectLocation';
import Element from './Element';

const cx = classNames.bind(styles);

export default function ListLocation() {
  const FilterRef = useRef();
  const [dataTable, setDataTable] = useState([]);
  const [optionCountry, setOptionCountry] = useState([]);
  const [optionCity, setOptionCity] = useState([]);
  const [optionDistrict, setOptionDistrict] = useState([]);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [countryID, setCountryID] = useState('');
  const [cityID, setCityID] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [deleteLocation, setDeleteLocation] = useState(1);

  /* set Country ID */
  const handleSetCountryID = (id) => {
    setCountryID(id);
  };

  /* set Country ID */
  const handleSetCityID = (id) => {
    setCityID(id);
  };

  /* set Country ID */
  const handleSetDistrictID = (id) => {
    setDistrictID(id);
  };

  /* set Country ID */
  const handleSetCountry = (id) => {
    setCountry(id);
  };

  /* set City ID */
  const handleSetCity = (id) => {
    setCity(id);
  };

  /* set District ID */
  const handleSetDistrict = (id) => {
    setDistrict(id);
  };

  /* handle onchage set Delete Location */

  const handleOnchangeDelete = (value) => {
    setDeleteLocation(deleteLocation + value);
  };

  /* function to render data table*/
  const renderDataTable = (data) => {
    const rows = [];
    for (let i = 0; i < data.length; i++) {
      const country = data[i];
      for (let j = 0; j < (country.cities?.length || 1); j++) {
        const city = country?.cities[j];
        for (let k = 0; k < (city?.districts?.length || 1); k++) {
          const district = city?.districts ? city?.districts[k] : null;
          // Check if district or wards are null or undefined
          for (let l = 0; l < (district?.wards?.length || 1); l++) {
            const ward = district?.wards ? district?.wards[l] : null;
            // Push the elements into the rows array
            rows.push(
              <Element
                handleOnchangeDelete={handleOnchangeDelete}
                ward={ward}
                country={country}
                city={city}
                district={district}
              />,
            );
          }
        }
      }
    }

    return rows;
  };

  /* get Country */
  useEffect(() => {
    const getCountry = async () => {
      try {
        const res = await axios.get('/api/get-country', {
          params: {
            name: country,
          },
        });
        if (res.data) {
          setOptionCountry(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getCountry();
  }, [country]);

  /* get City */
  useEffect(() => {
    const getCity = async () => {
      try {
        const res = await axios.get('/api/get-city', {
          params: {
            name: city,
            country_id: countryID,
          },
        });
        if (res.data) {
          setOptionCity(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getCity();
  }, [city, countryID, district]);

  /* get District */
  useEffect(() => {
    const getDistrict = async () => {
      try {
        const res = await axios.get('/api/get-district', {
          params: {
            name: district,
            city_id: cityID,
          },
        });
        if (res.data) {
          setOptionDistrict(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDistrict();
  }, [district, cityID]);

  /* get data for table */
  useEffect(() => {
    // const formFilter = FilterRef.current;
    const getDataTable = async () => {
      try {
        const res = await axios.get('/api/all-location', {
          params: {
            country_id: countryID,
            city_id: cityID,
            district_id: districtID,
          },
        });
        if (res.data) {
          setDataTable(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDataTable();
  }, [countryID, cityID, districtID, deleteLocation]);

  return (
    <>
      <div className={cx('filter-data')}>
        <h4>filter Location</h4>
        <form ref={FilterRef} className={cx('filter-form', 'd-flex flex-row flex-wrap gap-3 align-items-end')}>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <SelectLocation
              NullValue
              handleSetID={handleSetCountryID}
              searchSelectValue={handleSetCountry}
              data={optionCountry}
              title="country"
            />
          </div>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <SelectLocation
              NullValue
              handleSetID={handleSetCityID}
              searchSelectValue={handleSetCity}
              data={optionCity}
              title="city"
            />
          </div>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <SelectLocation
              NullValue
              handleSetID={handleSetDistrictID}
              searchSelectValue={handleSetDistrict}
              data={optionDistrict}
              title="district"
            />
          </div>
        </form>
      </div>
      <table className={cx('table')}>
        <thead>
          <tr>
            <th>Country</th>
            <th>City</th>
            <th>District</th>
            <th>Ward</th>
            <th>Tolls</th>
          </tr>
        </thead>
        <tbody>{dataTable ? renderDataTable(dataTable) : ''}</tbody>
      </table>
    </>
  );
}
