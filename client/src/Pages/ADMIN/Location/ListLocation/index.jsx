import classNames from 'classnames/bind';
import React from 'react';
import { useRef, useState, useEffect } from 'react';

import styles from '~/pages/ADMIN/Location/Location.module.scss';
import { GetAllLocation } from '~/api/Location/GetLocation';
import Location from '~/layout/Component/Location';
import Translate from '~/layout/Component/Translate';
import { useImmer } from 'use-immer';
import PaginationMain from '~/layout/Component/Pagination/PaginationMain';
import LocationItem from './LocationItem';
import EditLocation from '../EditLocation';

const cx = classNames.bind(styles);

export default function ListLocation({ reloadData = () => {} }) {
  const FilterRef = useRef();
  const [dataTable, setDataTable] = useState(null);

  const [filter, setFilter] = useImmer({
    country_id: '',
    city_id: '',
    district_id: '',
  });
  const [deleteLocation, setDeleteLocation] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  let pageSize = 30;
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  const [listData, setListData] = useState(null);
  const [toggleEdit, setToggleEdit] = useState(false);

  /* handle toggle edit  location*/
  const handleToggleEdit = () => {
    if (toggleEdit) {
      setToggleEdit(false);
    } else {
      setToggleEdit(true);
    }
  };

  /* handle onchage set Delete Location */
  const handleOnchangeDelete = (value) => {
    setDeleteLocation(deleteLocation + value);
  };

  /* handle set id */
  const handleSetFilter = (e) => {
    const { type, value, id } = e.currentTarget.dataset;
    if (type !== '') {
      setFilter((draft) => {
        draft[type] = id;
      });
    }
  };

  const handleResetValue = (e) => {
    const { type } = e.currentTarget.dataset;
    if (type !== '') {
      setFilter((draft) => {
        draft[type] = '';
      });
    }
  };

  /* function handle flat data table*/
  const renderDataTable = (data) => {
    let flattened = [];
    for (let i = 0; i < data?.length; i++) {
      const country = data[i];
      for (let j = 0; j < (country.cities?.length || 1); j++) {
        const city = country?.cities[j];
        for (let k = 0; k < (city?.districts?.length || 1); k++) {
          const district = city?.districts ? city?.districts[k] : null;
          // Check if district or wards are null or undefined
          for (let l = 0; l < (district?.wards?.length || 1); l++) {
            const ward = district?.wards ? district?.wards[l] : null;
            // Push the elements into the rows array
            flattened.push({
              country: country,
              city: city,
              district: district,
              ward: ward,
            });
          }
        }
      }
    }
    return flattened;
  };

  useEffect(() => {
    setListData(() => {
      return renderDataTable(dataTable).slice(firstPageIndex, lastPageIndex);
    });
  }, [dataTable, currentPage]);
  /* get data for table */
  useEffect(() => {
    GetAllLocation(filter)
      .then((result) => {
        if (result.countries) {
          setDataTable(result.countries);
        }
      })
      .catch((e) => console.log(e));
  }, [filter.city_id, filter.country_id, filter.district_id, deleteLocation, reloadData]);

  return (
    <>
      <div className={cx('filter-data')}>
        <h4>
          <b>
            <Translate>filter</Translate> <Translate>data</Translate>
          </b>
        </h4>
        <div ref={FilterRef} className={cx('filter-form', 'd-flex flex-row flex-wrap gap-3 align-items-end')}>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <Location
              useColumn
              title="country"
              type="country_id"
              classTitle="country-filter"
              handleResetValue={handleResetValue}
              handleOnclick={handleSetFilter}
            />
          </div>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <Location
              useColumn
              title="city"
              type="city_id"
              classTitle="city-filter"
              foreignID={filter.country_id}
              handleOnclick={handleSetFilter}
              handleResetValue={handleResetValue}
            />
          </div>
          <div className={cx('filter-container', 'form-group flex-grow-1')}>
            <Location
              useColumn
              type="district_id"
              title="district"
              classTitle="district-filter"
              foreignID={filter.city_id}
              handleResetValue={handleResetValue}
              handleOnclick={handleSetFilter}
            />
          </div>
        </div>
      </div>
      <table className={cx('table')}>
        <thead>
          <tr>
            <th>
              <Translate>country</Translate>
            </th>
            <th>
              <Translate>city</Translate>
            </th>
            <th>
              <Translate>district</Translate>
            </th>
            <th>
              <Translate>ward</Translate>
            </th>
            <th>
              <Translate>tools</Translate>
            </th>
          </tr>
        </thead>
        <tbody>
          {listData ? (
            listData?.map((dt) => (
              <LocationItem
                handleOnchangeDelete={handleOnchangeDelete}
                ward={dt?.ward}
                handleToggleEdit={handleToggleEdit}
                country={dt?.country}
                city={dt?.city}
                district={dt?.district}
                key={`${dt?.country.name}_${dt?.city?.name || ''}_${dt?.district?.name || ''}_${dt?.ward?.name || ''}`}
              />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <div className={cx('pagination')}>
        {listData ? (
          <>
            <PaginationMain
              className={cx('pagination_location')}
              pageSize={pageSize}
              currentPage={currentPage}
              totalCount={renderDataTable(dataTable)?.length}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <EditLocation
        id="edit_location"
        handleToggleEdit={handleToggleEdit}
        reloadData={reloadData}
        closeModal={toggleEdit}
      />
    </>
  );
}
