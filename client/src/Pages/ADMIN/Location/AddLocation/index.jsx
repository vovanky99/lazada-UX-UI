import classNames from 'classnames/bind';

import styles from '~/pages/ADMIN/Location/Location.module.scss';
import Button from '~/components/Button';
import { forwardRef, useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import Location from '~/layout/Component/Location';
import { CreateData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function AddLocation({
  title,
  useCountry = false,
  useCity = false,
  useDistrict = false,
  useWard = false,
  handleReloadData = () => {},
}) {
  const nameRef = useRef();
  const feeRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const districtRef = useRef();

  const [createSuccess, setCreateSuccess] = useState('');
  const [createError, setCreateError] = useState('');
  const [addLocation, setAddLocation] = useState({
    name: '',
    fee_ship: '',
    country_id: '',
    city_id: '',
    district_id: '',
  });

  const handleSetLocation = (e) => {
    const { name, id } = e.target.dataset;
    setAddLocation({
      ...addLocation,
      [name]: id,
    });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setAddLocation({
      ...addLocation,
      [name]: value,
    });
  };

  const validate = () => {
    if (addLocation.name === '') {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }
    // valid country
    if (countryRef && useCity) {
      const t = countryRef.current;
      if (t.dataset.id === '') {
        t.classList.add('border_danger');
      } else {
        t.classList.remove('border_danger');
      }
    }

    //valid city
    if (cityRef && useDistrict) {
      const t = cityRef.current;
      if (t.dataset.id === '') {
        t.classList.add('border_danger');
      } else {
        t.classList.remove('border_danger');
      }
    }

    // //valid district
    if (districtRef && useWard) {
      const t = districtRef.current;
      if (t.dataset.id === '') {
        t.classList.add('border_danger');
      } else {
        t.classList.remove('border_danger');
      }
    }
  };

  /*submit form */
  const handleSubmitForm = (e) => {
    e.preventDefault();
    validate();
    if (addLocation.name !== '') {
      if (
        (addLocation.district_id && useWard) ||
        (addLocation.city_id && useDistrict) ||
        (addLocation.country_id && useCity) ||
        useCountry
      ) {
        CreateData('admin', title, addLocation)
          .then((result) => {
            if (result.success) {
              setCreateError('');
              setCreateSuccess(result.success);
              handleReloadData(1);
            } else {
              setCreateSuccess('');
              setCreateError('create failed!');
            }
          })
          .catch((e) => console.log(e));
      }
    }
  };

  return (
    <>
      <div className={cx('add-container')}>
        <form onSubmit={handleSubmitForm} className={cx('d-flex flex-column')} noValidate>
          <div className={cx('form-group d-flex flex-row flex-wrap mb-3 ')}>
            {!useCountry || useCity || useDistrict || useWard ? (
              <Location ref={countryRef} title="country" name="country_id" handleOnclick={handleSetLocation} />
            ) : (
              ''
            )}
            {(!useCountry && !useCity) || useDistrict || useWard ? (
              <Location
                ref={cityRef}
                title="city"
                name="city_id"
                foreignID={addLocation.country_id}
                handleOnclick={handleSetLocation}
              />
            ) : (
              ''
            )}
            {(!useCountry && !useCity && !useDistrict) || useWard ? (
              <Location
                ref={districtRef}
                title="district"
                name="district_id"
                foreignID={addLocation.city_id}
                handleOnclick={handleSetLocation}
              />
            ) : (
              <></>
            )}
            {useDistrict ? (
              <FormSearch
                ref={feeRef}
                title="fee ship"
                name="fee_ship"
                inputType="number"
                classTitle="fee_ship"
                handleOnchange={handleOnchange}
                useTippy={false}
              />
            ) : (
              ''
            )}
            <FormSearch ref={nameRef} title="name" name="name" handleOnchange={handleOnchange} useTippy={false} />
          </div>
          <MessageSuccess message={createSuccess} />
          <MessageDanger message={createError} />
          <Button gradient_primary small type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
