import classNames from 'classnames/bind';
import React from 'react';
import Tippy from '@tippyjs/react/headless';
import { useRef, useState, useEffect } from 'react';

import styles from '../Location.module.scss';
import axios from '~/api/axios';
import Button from '~/components/Button';

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
  const [nameCountry, setNameCountry] = useState(country?.name);
  const [nameCity, setNameCity] = useState(city?.name);
  const [nameDistrict, setNameDistrict] = useState(district?.name);
  const [nameWard, setNameWard] = useState(ward?.name);

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
      <tr
        className={cx(`tbody-element`)}
        key={`${country.name}_${city?.name || ''}_${district?.name || ''}_${ward?.name || ''}`}
      >
        <Tippy
          interactive
          visible={toggleEdit}
          placement="bottom"
          offset={[0, 0]}
          render={(attrs) => (
            <div className={cx('toggle-edit', 'edit-element')} {...attrs}>
              <h5>Edit Location</h5>
              <div className={cx('edit-content', 'd-flex flex-row ')}>
                <div className={cx('flex-grow-1 d-flex flex-column')}>
                  <div className={cx('form-group d-flex flex-column')}>
                    <label className="form-label">Country</label>
                    <input
                      value={nameCountry}
                      className="form-control"
                      onChange={(e) => {
                        setNameCountry(e.target.value);
                      }}
                    />
                  </div>
                  {messageCountryError ? <div className="text-warning fs-5">{messageCountryError}</div> : ''}
                  {messageCountrySuccess ? <div className="text-success fs-5">{messageCountrySuccess}</div> : ''}
                  <div>
                    <Button
                      data-name={nameCountry}
                      data-id={country?.id || ''}
                      transparent
                      type="button"
                      className={cx('text-primary')}
                      onClick={handleEditCountry}
                    >
                      Edit Country
                    </Button>
                    <Button
                      onClick={handleDeleteCountry}
                      data-id={country?.id || ''}
                      transparent
                      type="button"
                      className={cx('text-danger')}
                    >
                      Delete Country
                    </Button>
                  </div>
                </div>
                <div className={cx('flex-grow-1 d-flex flex-column')}>
                  <div className={cx('form-group d-flex flex-column')}>
                    <label className="form-label">City</label>
                    <input
                      value={nameCity}
                      className="form-control"
                      onChange={(e) => {
                        setNameCity(e.target.value);
                      }}
                    />
                  </div>
                  {messageCityError ? <div className="text-warning fs-5">{messageCityError}</div> : ''}
                  {messageCitySuccess ? <div className="text-success fs-5">{messageCitySuccess}</div> : ''}
                  <div>
                    <Button
                      data-name={nameCity}
                      data-id={city?.id || ''}
                      transparent
                      type="button"
                      className={cx('text-primary')}
                      onClick={handleEditCity}
                    >
                      Edit City
                    </Button>

                    <Button
                      onClick={handleDeleteCity}
                      data-id={city?.id || ''}
                      transparent
                      type="button"
                      className={cx('text-danger')}
                    >
                      Delete City
                    </Button>
                  </div>
                </div>
                <div className={cx('flex-grow-1 d-flex flex-column')}>
                  <div className={cx('form-group d-flex flex-column')}>
                    <label className="form-label">District</label>
                    <input
                      value={nameDistrict}
                      className="form-control"
                      onChange={(e) => {
                        setNameDistrict(e.target.value);
                      }}
                    />
                  </div>
                  {messageDistrictError ? <div className="text-warning fs-5">{messageDistrictError}</div> : ''}
                  {messageDistrictSuccess ? <div className="text-success fs-5">{messageDistrictSuccess}</div> : ''}
                  <div>
                    <Button
                      data-name={nameDistrict}
                      data-id={district?.id || ''}
                      transparent
                      type="button"
                      onClick={handleEditDistrict}
                      className={cx('text-primary')}
                    >
                      Edit District
                    </Button>

                    <Button
                      onClick={handleDeleteDistrict}
                      data-id={district?.id || ''}
                      transparent
                      type="button"
                      className={cx('text-danger')}
                    >
                      Delete District
                    </Button>
                  </div>
                </div>
                <div className={cx('flex-grow-1 d-flex flex-column')}>
                  <div className={cx('form-group d-flex flex-column')}>
                    <label className="form-label">Ward</label>
                    <input
                      value={nameWard}
                      className="form-control"
                      onChange={(e) => {
                        setNameWard(e.target.value);
                      }}
                    />
                  </div>
                  {messageWardError ? <div className="text-warning fs-5">{messageWardError}</div> : ''}
                  {messageWardSuccess ? <div className="text-success fs-5">{messageWardSuccess}</div> : ''}
                  <div>
                    <Button
                      data-name={nameWard}
                      data-id={ward?.id || ''}
                      transparent
                      type="button"
                      className={cx('text-primary')}
                      onClick={handleEditWard}
                    >
                      Edit Ward
                    </Button>

                    <Button
                      onClick={handleDeleteWard}
                      data-id={ward?.id || ''}
                      transparent
                      type="button"
                      className={cx('text-danger')}
                    >
                      Delete Ward
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          onClickOutside={handleToggleEditOutside}
        >
          <tr>
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
      </tr>
    </>
  );
}
