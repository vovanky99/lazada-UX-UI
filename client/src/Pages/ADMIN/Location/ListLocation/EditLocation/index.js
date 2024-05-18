import classNames from 'classnames/bind';
import React from 'react';
import Tippy from '@tippyjs/react/headless';
import { useState, useEffect } from 'react';

import styles from '../../Location.module.scss';
import axios from '~/api/axios';
import Button from '~/components/Button';
import EditElement from './EditElement';
import { Link } from 'react-router-dom';

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
    try {
      const res = await axios.delete(`/api/delete-location/${e.target.dataset.value}/${e.target.dataset.id}`);
      if (res.data) {
        handleOnchangeDelete(1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /* handle delete country */
  const handleDeleteCountry = async (e) => {
    if (e.target.dataset.id) {
      try {
        const res = await axios.delete(`/api/delete-country/${e.target.dataset.id}`);
        if (res.data) {
          handleOnchangeDelete(1);
        }
      } catch (e) {
        console.log(e);
      }
      setMessageCountrySuccess('delete city success!');
      setMessageCountryError('');
    } else {
      setMessageCountrySuccess('');
      setMessageCountryError('country is value empty!');
    }
  };

  /* handle delete city */
  const handleDeleteCity = async (e) => {
    if (e.target.dataset.id) {
      try {
        const res = await axios.delete(`/api/delete-city/${e.target.dataset.id}`);
        if (res.data) {
          handleOnchangeDelete(1);
        }
      } catch (e) {
        console.log(e);
      }
      setMessageCitySuccess('delete city success!');
      setMessageCityError('');
    } else {
      setMessageCitySuccess('');
      setMessageCityError('city is value empty!');
    }
  };

  /* handle delete district */
  const handleDeleteDistrict = async (e) => {
    if (e.target.dataset.id) {
      try {
        const res = await axios.delete(`/api/delete-district/${e.target.dataset.id}`);
        if (res.data) {
          handleOnchangeDelete(1);
        }
      } catch (e) {
        console.log(e);
      }
      setMessageDistrictSuccess('delete district success!');
      setMessageDistrictError('');
    } else {
      setMessageDistrictSuccess('');
      setMessageDistrictError('district is value empty!');
    }
  };

  /* handle delete ward */
  const handleDeleteWard = async (e) => {
    if (e.target.dataset.id) {
      try {
        const res = await axios.delete(`/api/delete-ward/${e.target.dataset.id}`);
        if (res.data) {
          handleOnchangeDelete(1);
        }
      } catch (e) {
        console.log(e);
      }
      setMessageWardSuccess('delete ward Success');
      setMessageWardError('');
    } else {
      setMessageWardSuccess('');
      setMessageWardError('ward is value empty!');
    }
  };

  /* handle edit ward */
  const handleEditCountry = async (e) => {
    if (e.target.dataset.id && e.target.dataset.name) {
      const data = new FormData();
      data.append('name', e.target.dataset.name);
      try {
        const res = await axios.patch(`/api/edit-country/${e.target.dataset.id}`, data);
        if (res.data) {
          handleOnchangeDelete(1);
        }
      } catch (e) {
        console.log(e);
      }
      setMessageCountrySuccess('edit country Success');
      setMessageCountryError('');
    } else {
      setMessageCountrySuccess('');
      setMessageCountryError('country is value empty!');
    }
  };

  /* handle edit ward */
  const handleEditCity = async (e) => {
    if (e.target.dataset.id && e.target.dataset.name) {
      const data = new FormData();
      data.append('name', e.target.dataset.name);
      try {
        const res = await axios.patch(`/api/edit-city/${e.target.dataset.id}`, data);
        if (res.data) {
          handleOnchangeDelete(1);
        }
      } catch (e) {
        console.log(e);
      }
      setMessageCitySuccess('edit city Success');
      setMessageCityError('');
    } else {
      setMessageCitySuccess('');
      setMessageCityError('city is value empty!');
    }
  };

  /* handle edit ward */
  const handleEditDistrict = async (e) => {
    if (e.target.dataset.id && e.target.dataset.name) {
      const data = new FormData();
      data.append('name', e.target.dataset.name);
      try {
        const res = await axios.patch(`/api/edit-ditrict/${e.target.dataset.id}`, data);
        if (res.data) {
          handleOnchangeDelete(1);
        }
      } catch (e) {
        console.log(e);
      }
      setMessageDistrictError('');
      setMessageDistrictSuccess('edit ditrict Success');
    } else {
      setMessageDistrictSuccess('');
      setMessageDistrictError('ditrict is value empty!');
    }
  };

  /* handle edit ward */
  const handleEditWard = async (e) => {
    if (e.target.dataset.id && e.target.dataset.name) {
      const data = new FormData();
      data.append('name', e.target.dataset.name);
      try {
        const res = await axios.patch(`/api/edit-ward/${e.target.dataset.id}`, data);
        if (res.data) {
          handleOnchangeDelete(1);
        }
      } catch (e) {
        console.log(e);
      }
      setMessageWardSuccess('edit ward Success');
      setMessageWardError('');
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
            <h5>Edit Location</h5>
            <div className={cx('edit-content', 'd-flex flex-row')}>
              <div className={cx('edit-country', 'flex-grow-1')}>
                <EditElement
                  title="country"
                  data={country}
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
                  messageError={messageCityError}
                  messageSuccess={messageCitySuccess}
                  handleDelete={handleDeleteCity}
                  handleEdit={handleEditCity}
                />
              </div>
              <div className={cx('edit-district', 'flex-grow-1')}>
                <EditElement
                  title="district"
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
                  messageError={messageWardError}
                  messageSuccess={messageWardSuccess}
                  handleDelete={handleDeleteWard}
                  handleEdit={handleEditWard}
                />
              </div>
            </div>
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
          <td className={cx('toll-edit')}>
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
          </td>
        </tr>
      </Tippy>
    </>
  );
}
