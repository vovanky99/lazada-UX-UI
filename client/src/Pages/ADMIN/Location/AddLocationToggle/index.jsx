import classNames from 'classnames/bind';

import styles from '../Location.module.scss';
import Button from '~/components/Button';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';

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
  const countryRef = useRef();
  const cityRef = useRef();
  const districtRef = useRef();

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
    const n = nameRef.current;

    // valid country
    if (countryRef && countryData) {
      const t = countryRef.current;
      if (t.value === '') {
        t.classList.add('border_danger');
      } else {
        t.classList.remove('border_danger');
      }
    }

    //valid city
    if (cityRef && cityData) {
      const t = cityRef.current;
      if (t.value === '') {
        t.classList.add('border_danger');
      } else {
        t.classList.remove('border_danger');
      }
    }

    // //valid district
    if (districtRef && districtData) {
      const t = districtRef.current;
      if (t.value === '') {
        t.classList.add('border_danger');
      } else {
        t.classList.remove('border_danger');
      }
    }

    if (name === '') {
      n.classList.add('border_danger');
    } else {
      n.classList.remove('border_danger');
      onSubmitForm();
    }
  };

  return (
    <>
      <div className={cx('add-container')}>
        <form onSubmit={handleSubmitForm} className={cx('d-flex flex-column')} noValidate>
          <div className={cx('form-group d-flex flex-row flex-wrap mb-3 ')}>
            {countryData ? (
              <FormSearch
                ref={countryRef}
                searchValue={searchSelectCountryValue}
                data={countryData}
                handleSetID={handleSetCountryID}
                title="country"
              />
            ) : (
              ''
            )}
            {cityData ? (
              <FormSearch
                ref={cityRef}
                searchValue={searchSelectCityValue}
                data={cityData}
                handleSetID={handleSetCityID}
                title="city"
              />
            ) : (
              ''
            )}
            {districtData ? (
              <FormSearch
                ref={districtRef}
                handleSetID={handleSetDistrictID}
                searchValue={searchSelectDistrictValue}
                data={districtData}
                title="district"
              />
            ) : (
              ''
            )}
            {title === 'District' ? (
              <FormSearch
                ref={feeRef}
                title="fee ship"
                classTitle="fee_ship"
                searchValue={setFeeShip}
                Value={feeShip}
                inputType="number"
                useTippy={false}
              />
            ) : (
              ''
            )}
            <FormSearch ref={nameRef} title="name" searchValue={setName} Value={name} useTippy={false} />
          </div>
          <MessageSuccess message={messageSuccess} />
          <MessageDanger message={messageError} />
          <Button gradient_primary type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
});
