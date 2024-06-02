import classNames from 'classnames/bind';
import React from 'react';
import Tippy from '@tippyjs/react/headless';
import { useState, useEffect } from 'react';

import styles from '../../Location.module.scss';
import axios from '~/api/axios';
import Button from '~/components/Button';
import EditElement from './EditElement';
import { Link } from 'react-router-dom';
import DeleteLocation, { DeleteSingleLocation } from '~/api/Location/DeleteLocation';
import EditLocation from '~/api/Location/EditLocation';

const cx = classNames.bind(styles);

export default function Element({ country, city, district, ward, handleOnchangeDelete = () => {} }) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [messageCountryError, setMessageCountryError] = useState('');
  const [messageCountrySuccess, setMessageCountrySuccess] = useState('');
  const [messageCityError, setMessageCityError] = useState('');
  const [messageCitySuccess, setMessageCitySuccess] = useState('');
  const [messageDistrictError, setMessageDistrictError] = useState('');
  const [messageDistrictSuccess, setMessageDistrictSuccess] = useState('');
  const [messageWardError, setMessageWardError] = useState('');
  const [messageWardSuccess, setMessageWardSuccess] = useState('');
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

  /* handle delete Country */
  const handleDeleteCountry = async (e) => {
    if (e.target.dataset.id) {
      DeleteLocation('country', e.target.dataset.id)
        .then((result) => {
          handleOnchangeDelete(1);
          setMessageCountrySuccess('delete country success!');
          if (messageCountryError) {
            setMessageCountryError('');
          }
        })
        .catch((e) => console.log(e));
    } else {
      if (messageCountrySuccess) {
        setMessageCountrySuccess('');
      }
      setMessageCountryError('country is value empty!');
    }
  };

  /* handle delete City */
  const handleDeleteCity = async (e) => {
    if (e.target.dataset.id) {
      DeleteLocation('city', e.target.dataset.id)
        .then((result) => {
          handleOnchangeDelete(1);
          setMessageCitySuccess('delete city success!');
          if (messageCityError) {
            setMessageCityError('');
          }
        })
        .catch((e) => console.log(e));
    } else {
      if (messageCitySuccess) {
        setMessageCitySuccess('');
      }
      setMessageCityError('city is value empty!');
    }
  };

  /* handle delete District */
  const handleDeleteDistrict = async (e) => {
    if (e.target.dataset.id) {
      DeleteLocation('district', e.target.dataset.id)
        .then((result) => {
          handleOnchangeDelete(1);
          setMessageDistrictSuccess('delete district success!');
          if (messageDistrictError) {
            setMessageDistrictError('');
          }
        })
        .catch((e) => console.log(e));
    } else {
      if (messageDistrictSuccess) {
        setMessageDistrictSuccess('');
      }
      setMessageDistrictError('district is value empty!');
    }
  };

  /* handle delete Ward */
  const handleDeleteWard = async (e) => {
    if (e.target.dataset.id) {
      DeleteLocation('ward', e.target.dataset.id)
        .then((e) => {
          handleOnchangeDelete(1);
          setMessageWardSuccess('delete ward Success');
          if (messageWardError) {
            setMessageWardError('');
          }
        })
        .catch((e) => console.log(e));
    } else {
      if (messageWardSuccess) {
        setMessageWardSuccess('');
      }
      setMessageWardError('ward is value empty!');
    }
  };

  /* handle edit Country */
  const handleEditCountry = async (e) => {
    if (e.target.dataset.id && e.target.dataset.name) {
      EditLocation('country', e.target.dataset.id, { name: e.target.dataset.name })
        .then((e) => {
          handleOnchangeDelete(1);
          setMessageCountrySuccess('edit country Success');
          if (messageCountryError) {
            setMessageCountryError('');
          }
        })
        .catch((e) => console.log(e));
    } else {
      setMessageCountrySuccess('');
      setMessageCountryError('country is value empty!');
    }
  };

  /* handle edit City */
  const handleEditCity = async (e) => {
    if (e.target.dataset.id && e.target.dataset.name) {
      EditLocation('city', e.target.dataset.id, { name: e.target.dataset.name, foreign_id: e.target.dataset.foreign })
        .then((e) => {
          handleOnchangeDelete(1);
          setMessageCitySuccess('edit city Success');
          if (messageCityError) {
            setMessageCityError('');
          }
        })
        .catch((e) => console.log(e));
    } else {
      setMessageCitySuccess('');
      setMessageCityError('city is value empty!');
    }
  };

  /* handle edit District */
  const handleEditDistrict = async (e) => {
    if (e.target.dataset.id && e.target.dataset.name) {
      EditLocation('district', e.target.dataset.id, {
        name: e.target.dataset.name,
        foreign_id: e.target.dataset.foreign,
      })
        .then((e) => {
          handleOnchangeDelete(1);
          setMessageDistrictSuccess('edit ditrict Success');
          if (messageDistrictError) {
            setMessageDistrictError('');
          }
        })
        .catch((e) => console.log(e));
    } else {
      setMessageDistrictSuccess('');
      setMessageDistrictError('ditrict is value empty!');
    }
  };

  /* handle edit ward */
  const handleEditWard = async (e) => {
    if (e.target.dataset.id && e.target.dataset.name) {
      EditLocation('ward', e.target.dataset.id, { name: e.target.dataset.name, foreign_id: e.target.dataset.foreign })
        .then((e) => {
          handleOnchangeDelete(1);
          setMessageWardSuccess('edit ward Success');
          if (messageWardError) {
            setMessageWardError('');
          }
        })
        .catch((e) => console.log(e));
    } else {
      setMessageWardSuccess('');
      setMessageWardError('ward is value empty!');
    }
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
                    messageError={messageCountryError}
                    messageSuccess={messageCountrySuccess}
                    handleDelete={handleDeleteCountry}
                    handleEdit={handleEditCountry}
                  />
                </div>
                <div className={cx('edit-city', 'flex-grow-1')}>
                  <EditElement
                    title="city"
                    data={city}
                    handleSetID={setCityID}
                    foreignID={countryID}
                    messageError={messageCityError}
                    messageSuccess={messageCitySuccess}
                    handleDelete={handleDeleteCity}
                    handleEdit={handleEditCity}
                  />
                </div>
                <div className={cx('edit-district', 'flex-grow-1')}>
                  <EditElement
                    title="district"
                    handleSetID={setDistrictID}
                    foreignID={cityID}
                    data={district}
                    messageError={messageDistrictError}
                    messageSuccess={messageDistrictSuccess}
                    handleDelete={handleDeleteDistrict}
                    handleEdit={handleEditDistrict}
                  />
                </div>
                <div className={cx('edit-ward', 'flex-grow-1')}>
                  <EditElement
                    title="ward"
                    data={ward}
                    foreignID={districtID}
                    messageError={messageWardError}
                    messageSuccess={messageWardSuccess}
                    handleDelete={handleDeleteWard}
                    handleEdit={handleEditWard}
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
        <tr
          className={cx(`tbody-element`)}
          key={`${country.name}_${city?.name || ''}_${district?.name || ''}_${ward?.name || ''}`}
        >
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
