import classNames from 'classnames/bind';
import React from 'react';
import { useRef, useState, useEffect } from 'react';

import styles from '../Location.module.scss';
import { FormSearch } from '~/layout/Component/FormSearch';
import EditLocation from './EditLocation';
import GetLocation, { GetAllLocation } from '~/api/Location/GetLocation';
import Location from '~/layout/Component/Location';

const cx = classNames.bind(styles);

export default function ListLocation({ reloadData }) {
  const FilterRef = useRef();
  const [dataTable, setDataTable] = useState(null);
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

  /* get data for table */
  useEffect(() => {
    GetAllLocation(countryID, cityID, districtID)
      .then((result) => setDataTable(result))
      .catch((e) => console.log(e));
  }, [countryID, cityID, districtID, deleteLocation, reloadData]);

  return (
    <>
      <div className={cx('filter-data')}>
        <h4>
          <b>filter Location</b>
        </h4>
        <div ref={FilterRef} className={cx('filter-form', 'd-flex flex-row flex-wrap gap-3 align-items-end')}>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <Location title="country" classTitle="country-filter" handleSetID={setCountryID} />
          </div>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <Location title="city" classTitle="city-filter" foreignID={countryID} handleSetID={setCityID} />
          </div>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <Location title="district" classTitle="district-filter" foreignID={cityID} handleSetID={setDistrictID} />
          </div>
        </div>
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
