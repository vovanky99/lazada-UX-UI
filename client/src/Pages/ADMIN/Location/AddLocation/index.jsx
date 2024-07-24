import classNames from 'classnames/bind';

import styles from '~/pages/ADMIN/Location/Location.module.scss';
import Button from '~/components/Button';
import { forwardRef, Fragment, useEffect, useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import Location from '~/layout/Component/Location';
import { CreateData } from '~/api/General/HandleData';
import Modal from '~/layout/Component/Modal';
import Translate from '~/layout/Component/Translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useImmer } from 'use-immer';

const cx = classNames.bind(styles);

export default function AddLocation({
  title,
  useCountry = false,
  useCity = false,
  useDistrict = false,
  useWard = false,
  closeModal,
  handleCloseLocation = () => {},
  id,
  handleReloadData = () => {},
}) {
  const nameRef = useRef();
  const feeRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const districtRef = useRef();
  const acronymRef = useRef();
  const InternationCodeRef = useRef();

  const messageValid = {
    name: Translate({ children: 'valid.name' }),
    international_codes: Translate({ children: 'valid.international_codes' }),
    acronym: Translate({ children: 'valid.acronym' }),
    district: Translate({ children: 'valid.district' }),
    city: Translate({ children: 'valid.city' }),
    ward: Translate({ children: 'valid.ward' }),
    country: Translate({ children: 'valid.country' }),
    createError: Translate({ children: 'valid.create_error' }),
    createSuccess: Translate({ children: 'valid.create_success' }),
  };
  const [valid, setValid] = useState({});
  const [createSuccess, setCreateSuccess] = useState('');
  const [createError, setCreateError] = useState('');
  const [addLocation, setAddLocation] = useImmer({
    name: '',
    international_codes: '',
    acronym: '',
    language: '',
    fee_ship: '',
    country_id: '',
    city_id: '',
    district_id: '',
  });

  const handleSetLocation = (e) => {
    const { name, id } = e.target.dataset;
    setAddLocation((darft) => {
      darft[name] = id;
    });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setAddLocation((darft) => {
      darft[name] = value;
    });
  };

  const validate = async (filed = addLocation) => {
    const messageError = { ...valid };
    if ('name' in filed) {
      messageError.name = !filed.name ? messageValid.name : '';
    }
    if (useCountry && 'international_codes' in filed) {
      messageError.international_codes = !filed.international_codes ? messageValid.international_codes : '';
    }
    if (useCountry && 'acronym' in filed) {
      messageError.acronym = !filed.acronym ? messageValid.acronym : '';
    }
    if (useCity && 'country_id' in filed) {
      messageError.country = !filed.country_id ? messageValid.country : '';
    }
    if (useDistrict && 'city_id' in filed) {
      messageError.city = !filed.city_id ? messageValid.city : '';
    }
    if (useWard && 'district_id' in filed) {
      messageError.district = !filed.district_id ? messageValid.district : '';
    }

    if (filed === addLocation) {
      Object.entries(messageError).map(([key, value]) => {
        if (value === '') {
          delete messageError[key];
        }
      });
    }

    if (useCountry && messageError.name) {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }

    if (useCountry && InternationCodeRef) {
      if (messageError.international_codes) {
        InternationCodeRef.current.classList.add('border_danger');
      } else {
        InternationCodeRef.current.classList.remove('border_danger');
      }
    }

    if (useCountry && acronymRef) {
      if (messageError.acronym) {
        acronymRef.current.classList.add('border_danger');
      } else {
        acronymRef.current.classList.remove('border_danger');
      }
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
    setValid(messageError);
    return messageError;
  };

  /*submit form */
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let val = await validate();
    if (addLocation.name !== '') {
      if (Object.keys(val).length === 0) {
        CreateData('admin', title, addLocation)
          .then((result) => {
            if (result.success) {
              setCreateError('');
              setCreateSuccess(createSuccess);
              handleReloadData(1);
            } else {
              setCreateSuccess('');
              setCreateError(messageValid.createError);
            }
          })
          .catch((e) => console.log(e));
      }
    }
  };

  /* reset value location */
  useEffect(() => {
    Object.entries(addLocation).map(([key, value]) => {
      setAddLocation((draft) => {
        key = '';
      });
    });
  }, [closeModal]);
  return (
    <Modal id={id} closeModal={closeModal}>
      <div className={cx('add-container')}>
        <form onSubmit={handleSubmitForm} className={cx('d-flex flex-column')} noValidate>
          <div className={cx('form_header', 'd-flex flex-row justify-content-between')}>
            <h4 className="text-capitalize">
              <Translate>{title}</Translate>
            </h4>
            <Button type="button" transparent none_size>
              <FontAwesomeIcon icon={faClose} onClick={handleCloseLocation} />
            </Button>
          </div>
          <div className={cx('form_content', 'form-group d-flex flex-row flex-wrap mb-3  ')}>
            {!useCountry || useCity || useDistrict || useWard ? (
              <Location
                ref={countryRef}
                useColumn
                title="country"
                name="country_id"
                handleOnclick={handleSetLocation}
              />
            ) : (
              ''
            )}

            {(!useCountry && !useCity) || useDistrict || useWard ? (
              <Location
                ref={cityRef}
                useColumn
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
                useColumn
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
                useColumn
                inputType="number"
                classTitle="fee_ship"
                handleOnchange={handleOnchange}
                useTippy={false}
              />
            ) : (
              ''
            )}
            <FormSearch
              ref={nameRef}
              useColumn
              title="name"
              name="name"
              handleOnchange={handleOnchange}
              useTippy={false}
            />
            {useCountry ? (
              <>
                <FormSearch
                  ref={InternationCodeRef}
                  inputType="number"
                  title="international_codes"
                  name="international_codes"
                  useColumn
                  handleOnchange={handleOnchange}
                  useTippy={false}
                />
                <FormSearch
                  ref={acronymRef}
                  title="acronym"
                  name="acronym"
                  useColumn
                  handleOnchange={handleOnchange}
                  useTippy={false}
                />
                <FormSearch
                  title="language"
                  name="language"
                  useColumn
                  handleOnchange={handleOnchange}
                  useTippy={false}
                />
              </>
            ) : (
              <Fragment></Fragment>
            )}
          </div>
          <MessageSuccess message={createSuccess} />
          <MessageDanger message={createError} />
          <div className={cx('btn_submit', 'text-center')}>
            <Button className="text-capitalize" gradient_primary small type="submit">
              <Translate>create</Translate>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
