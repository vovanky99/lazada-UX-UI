import classNames from 'classnames/bind';

import styles from '../Location.module.scss';
import Button from '~/components/Button';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { SelectLocation } from '../SelectLocation';

const cx = classNames.bind(styles);

export const AddLocationToggle = forwardRef(function AddToggle(
  {
    title,
    countryData,
    cityData,
    districtData,
    searchSelectCountryValue = () => {},
    searchSelectCityValue = () => {},
    searchSelectDistrictValue = () => {},
    setFeeShipValue = () => {},
    setNameValue = () => {},
    onSubmitForm = () => {},
    handleSetCountryID = () => {},
    handleSetCityID = () => {},
    handleSetDistrictID = () => {},
    messageSuccess = '',
    messageError = '',
  },
  ref,
) {
  const nameRef = useRef();
  const feeRef = useRef();

  const [name, setName] = useState('');
  const [feeShip, setFeeShip] = useState('');

  /* set name value */
  useEffect(() => {
    setNameValue(name);
  });

  /* set fee ship value */
  useEffect(() => {
    setFeeShipValue(feeShip);
  });

  /*submit form */
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (name === '') {
      nameRef.current.style['border-color'] = 'red';
    } else {
      nameRef.current.style['border-color'] = '#dee2e6';
      onSubmitForm();
    }
  };

  return (
    <>
      <div className={cx('add-container')}>
        <form onSubmit={handleSubmitForm} className={cx('d-flex flex-column')}>
          <div className={cx('form-group d-flex flex-row flex-wrap mb-3 ')}>
            {countryData ? (
              <SelectLocation
                searchSelectValue={searchSelectCountryValue}
                data={countryData}
                handleSetID={handleSetCountryID}
                title="country"
              />
            ) : (
              ''
            )}
            {cityData ? (
              <SelectLocation
                searchSelectValue={searchSelectCityValue}
                data={cityData}
                handleSetID={handleSetCityID}
                title="city"
              />
            ) : (
              ''
            )}
            {districtData ? (
              <SelectLocation
                handleSetID={handleSetDistrictID}
                searchSelectValue={searchSelectDistrictValue}
                data={districtData}
                title="district"
              />
            ) : (
              ''
            )}
            {title === 'District' ? (
              <div className={cx('form-group flex-grow-1')}>
                <label className="form-label">Fee Ship</label>
                <input
                  ref={feeRef}
                  value={feeShip}
                  className={cx('form-control py-2')}
                  placeholder={`Enter Fee Ship`}
                  onChange={(e) => {
                    const re = /^[a-z\b]+$/;
                    setFeeShip(e.target.value.replace(re, ''));
                  }}
                />
              </div>
            ) : (
              ''
            )}
            <div className={cx('form-group flex-grow-1')}>
              <label className="form-label">Name</label>
              <input
                ref={nameRef}
                value={name}
                className={cx('form-control py-2')}
                placeholder={`Enter Name ${title}`}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          {messageSuccess ? (
            <div className={cx('message', 'text-success px-3 mb-3 text-capitalize')}>{messageSuccess}</div>
          ) : (
            ''
          )}
          {messageError ? (
            <div className={cx('message', 'text-danger px-3 mb-3 text-capitalize')}>{messageError}</div>
          ) : (
            ''
          )}
          <Button gradient_primary type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
});
