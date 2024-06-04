import classNames from 'classnames/bind';
import React from 'react';
import Tippy from '@tippyjs/react/headless';
import { useState, useEffect } from 'react';

import styles from '~/pages/ADMIN/Location/Location.module.scss';
import Button from '~/components/Button';
import EditElement from '~/pages/ADMIN/Location/ListLocation/EditLocation/EditElement';
import DeleteLocation, { DeleteSingleLocation } from '~/api/Location/DeleteLocation';
import EditLocation from '~/api/Location/EditLocation';

const cx = classNames.bind(styles);

export default function Element({ country, city, district, ward, handleOnchangeDelete = () => {} }) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [countryID, setCountryID] = useState(country?.id || '');
  const [cityID, setCityID] = useState(city?.id || '');
  const [districtID, setDistrictID] = useState(district?.id || '');

  /* handle toggle edit  location*/
  const handleToggleEditLocation = () => {
    setToggleEdit(true);
  };
  const handleToggleEditOutside = () => {
    setToggleEdit(false);
  };

  /* handle render width tippy */
  useEffect(() => {
    const t = document.querySelector('.tbody-element');
    const children = document.querySelectorAll('.edit-element');
    if (children) {
      children.forEach((e) => {
        const handleResize = () => {
          e.style.width = `${t.offsetWidth}px`;
        };
        if (t && children) {
          handleResize();
        }
        if (t && children) {
          window.addEventListener('resize', handleResize);
        }
        return () => {
          if (t && children) {
            window.removeEventListener('resize', handleResize);
          }
        };
      });
    }
  });
  /* handle delete location*/
  const handleDeleteLocation = async (e) => {
    DeleteSingleLocation(e.target.dataset.value, e.target.dataset.id)
      .then(() => {
        handleOnchangeDelete(1);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Tippy
        interactive
        visible={toggleEdit}
        placement="bottom"
        offset={[0, 0]}
        render={(attrs, index) => (
          <div className={cx('toggle-edit', 'edit-element text-center')} {...attrs} tabIndex="-1">
            <h5>
              <b> Edit Location</b>
            </h5>
            {/* use toggle edit to avoid  premature api calls */}
            {toggleEdit ? (
              <div className={cx('edit-content', 'd-flex flex-row')}>
                <div className={cx('edit-country', 'flex-grow-1')}>
                  <EditElement
                    title="country"
                    data={country}
                    handleSetID={setCountryID}
                    handleOnchangeDelete={handleOnchangeDelete}
                    useTippy={city ? true : false}
                  />
                </div>
                <div className={cx('edit-city', 'flex-grow-1')}>
                  <EditElement
                    title="city"
                    data={city}
                    handleSetID={setCityID}
                    foreignID={countryID}
                    handleOnchangeDelete={handleOnchangeDelete}
                    useTippy={district ? true : false}
                  />
                </div>
                <div className={cx('edit-district', 'flex-grow-1')}>
                  <EditElement
                    title="district"
                    handleSetID={setDistrictID}
                    foreignID={cityID}
                    data={district}
                    handleOnchangeDelete={handleOnchangeDelete}
                    useTippy={ward ? true : false}
                  />
                </div>
                <div className={cx('edit-ward', 'flex-grow-1')}>
                  <EditElement
                    title="ward"
                    data={ward}
                    foreignID={districtID}
                    handleOnchangeDelete={handleOnchangeDelete}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
        onClickOutside={handleToggleEditOutside}
      >
        <tr className={cx(`tbody-element`)}>
          <td>{country?.name}</td>
          <td>{city?.name || ''}</td>
          <td>{district?.name || ''}</td>
          <td>{ward?.name || ''}</td>
          <td>
            <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
              <Button gradient_primary type="button" onClick={handleToggleEditLocation}>
                Edit
              </Button>
              <Button
                data-value={ward ? `ward` : district ? 'district' : city ? 'city' : 'country'}
                data-id={ward?.id || district?.id || city?.id || country?.id}
                gradient_danger
                type="button"
                onClick={handleDeleteLocation}
              >
                Delete
              </Button>
            </div>
          </td>
        </tr>
      </Tippy>
    </>
  );
}
