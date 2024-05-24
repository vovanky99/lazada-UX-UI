import classNames from 'classnames/bind';
import React from 'react';
import { useRef, useState, useEffect } from 'react';

import styles from '../Location.module.scss';
import { SearchSelect } from '~/Layout/Component/SearchSelect';
import EditLocation from './EditLocation';
import GetLocation, { GetAllLocation } from '~/Services/Location/GetLocation';

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
              <EditLocation
                handleOnchangeDelete={handleOnchangeDelete}
                ward={ward}
                country={country}
                city={city}
                district={district}
                key={`${country.name}_${city?.name || ''}_${district?.name || ''}_${ward?.name || ''}`}
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
    GetLocation('country', country)
      .then((result) => setOptionCountry(result))
      .catch((e) => console.log(e));
  }, [country]);

  /* get City */
  useEffect(() => {
    GetLocation('city', city, countryID)
      .then((result) => setOptionCity(result))
      .catch((e) => console.log(e));
  }, [city, countryID]);

  /* get District */
  useEffect(() => {
    GetLocation('district', district, cityID)
      .then((result) => setOptionDistrict(result))
      .catch((e) => console.log(e));
  }, [district, cityID]);

  /* get data for table */
  useEffect(() => {
    GetAllLocation(countryID, cityID, districtID)
      .then((result) => setDataTable(result))
      .catch((e) => console.log(e));
  }, [countryID, cityID, districtID, deleteLocation]);

  return (
    <>
      <div className={cx('filter-data')}>
        <h4>
          <b>filter Location</b>
        </h4>
        <form ref={FilterRef} className={cx('filter-form', 'd-flex flex-row flex-wrap gap-3 align-items-end')}>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <SearchSelect
              NullValue
              handleSetID={setCountryID}
              searchSelectValue={setCountry}
              data={optionCountry}
              title="country"
              classTitle="country-filter"
            />
          </div>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <SearchSelect
              NullValue
              handleSetID={setCityID}
              searchSelectValue={setCity}
              data={optionCity}
              title="city"
              classTitle="city-filter"
            />
          </div>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <SearchSelect
              NullValue
              handleSetID={setDistrictID}
              searchSelectValue={setDistrict}
              data={optionDistrict}
              title="district"
              classTitle="district-filter"
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
