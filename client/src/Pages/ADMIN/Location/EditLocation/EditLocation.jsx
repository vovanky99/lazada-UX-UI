import classNames from 'classnames/bind';
import React, { Fragment, useEffect, useRef, useState } from 'react';

import styles from '~/pages/ADMIN/Location/Location.module.scss';
import Button from '~/components/Button';
import Translate from '~/layout/Component/Translate';
import Modal from '~/layout/Component/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FormSearch } from '~/layout/Component/FormSearch';
import { useImmer } from 'use-immer';
import MessageText from '~/layout/Component/Message/MessageText';
import { useSearchParams } from 'react-router-dom';
import { ShowLocation } from '~/api/Location/GetLocation';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { getLanguages } from '~/api/General/HandleData';
import ScrollY from '~/layout/Component/ScrollY';
import { EditData } from '~/api/Location/EditData';
import DeleteLocation from '~/api/Location/DeleteLocation';

const cx = classNames.bind(styles);

export default function EditLocation({ id, handleToggleEdit, reloadData = () => {}, closeModal = false }) {
  const selectTypeRef = useRef();
  const nameCountryRef = useRef();
  const nameCityRef = useRef();
  const nameDistrictRef = useRef();
  const nameWardRef = useRef();
  const internationalRef = useRef();
  const acronymRef = useRef();
  const languageRef = useRef();

  const [dataEdit, setDataEdit] = useImmer({});
  const [search] = useSearchParams();
  const messageValid = {
    name_country: Translate({ children: 'valid.name_country' }),
    name_city: Translate({ children: 'valid.name_city' }),
    name_district: Translate({ children: 'valid.name_district' }),
    name_ward: Translate({ children: 'valid.ward' }),
    language: Translate({ children: 'valid.language' }),
    type_location: Translate({ children: 'valid.type_location' }),
    delete: Translate({ children: 'valid.delete_location' }),
    international_codes: Translate({ children: 'valid.international_codes' }),
    acronym: Translate({ children: 'valid.acronym' }),
    delete_success: Translate({ children: 'valid.delete_success' }),
    delete_error: Translate({ children: 'valid.delete_error' }),
  };
  const [valid, setValid] = useImmer({});
  const [success, setSucess] = useState('');
  const [error, setError] = useState('');
  const [typeEdit, setTypeEdit] = useImmer('');
  const editType = [
    { id: 'country', name: 'country' },
    { id: 'city', name: 'city' },
    { id: 'district', name: 'district' },
    { id: 'ward', name: 'ward' },
  ];
  const [searchLanguage, setSearchLanguage] = useState('');
  const [languages, setlanguages] = useImmer(null);
  const handleOnchangeCountry = (e) => {
    const { name, value } = e.currentTarget;
    setDataEdit((draft) => {
      draft.country[name] = value;
    });
  };

  const handleOnchangeWard = (e) => {
    const { name, value } = e.currentTarget;
    setDataEdit((draft) => {
      draft.ward[name] = value;
    });
  };
  const handleOnchangeCity = (e) => {
    const { name, value } = e.currentTarget;
    setDataEdit((draft) => {
      draft.city[name] = value;
    });
  };
  const handleOnchangeDistrict = (e) => {
    const { name, value } = e.currentTarget;
    setDataEdit((draft) => {
      draft.district[name] = value;
    });
  };
  const handleOnclickLanguage = (e) => {
    const { type, name, value, id } = e.currentTarget.dataset;
    setDataEdit((draft) => {
      draft.country['language_id'] = id;
    });
    setSearchLanguage(value);
  };

  const handleClearLanguage = (e) => {
    const { type } = e.currentTarget.dataset;
    setDataEdit((draft) => {
      draft.country.language_id = '';
    });
    setSearchLanguage('');
  };

  const handleSelectType = (e) => {
    const { value } = e.currentTarget;
    setTypeEdit(value);
  };

  const validate = async (type, location, field = dataEdit) => {
    let message = { ...valid };
    if (typeEdit === '') {
      message.type_edit = messageValid.type_location;
      selectTypeRef.current.classList.add('border_danger');
    } else {
      if (selectTypeRef.current.classList.contains('border_danger')) {
        selectTypeRef.current.classList.remove('border_danger');
        message.type_edit = '';
      }
      if (type === 'delete') {
        if (!dataEdit[location]?.id) {
          message.delete = messageValid?.delete;
        }
      } else {
        if (location) {
          if ('name' in field[location]) {
            message[`name_${location}`] = !field[location].name ? messageValid[`name_${location}`] : '';
            if (message?.name_country) {
              nameCountryRef.current.classList.add('border_danger');
            } else {
              if (nameCountryRef) {
                nameCountryRef.current.classList.remove('border_danger');
              }
            }
            if (message?.name_city) {
              nameCityRef.current.classList.add('border_danger');
            } else {
              if (nameCityRef) {
                nameCityRef.current.classList.remove('border_danger');
              }
            }
            if (message?.name_district) {
              nameDistrictRef.current.classList.add('border_danger');
            } else {
              if (nameDistrictRef) {
                nameDistrictRef.current.classList.remove('border_danger');
              }
            }
            if (message?.name_ward) {
              nameWardRef.current.classList.add('border_danger');
            } else {
              if (nameWardRef) {
                nameWardRef.current.classList.remove('border_danger');
              }
            }
          }
          if ('language_id' in field[location]) {
            message.language = !field[location].language_id ? messageValid.language : '';
            if (languageRef && message?.language) {
              languageRef.current.classList.add('border_danger');
            } else {
              languageRef.current.classList.remove('border_danger');
            }
          }
          if ('international_codes' in field[location]) {
            message.international_codes = !field[location].international_codes ? messageValid.international_codes : '';
            if (internationalRef && message?.international_codes) {
              internationalRef.current.classList.add('border_danger');
            } else {
              internationalRef.current.classList.remove('border_danger');
            }
          }
          if ('acronym' in field[location]) {
            message.acronym = !field[location].acronym ? messageValid.acronym : '';
            if (acronymRef && message?.acronym) {
              acronymRef.current.classList.add('border_danger');
            } else {
              acronymRef.current.classList.remove('border_danger');
            }
          }
        }
      }
    }
    Object.entries(message).map(([key, value]) => {
      if (value === '') {
        delete message[key];
        setValid((draft) => {
          delete draft[key];
        });
      } else {
        setValid((draft) => {
          draft[key] = value;
        });
      }
    });
    return message;
  };

  /* submit for update location */
  const handleSave = async (e) => {
    setSucess('');
    setError('');
    const val = await validate('update', typeEdit);
    if (Object.keys(val).length === 0) {
      let id = '';
      let data = [];
      if (typeEdit === 'ward') {
        id = dataEdit?.ward?.id;
        data = dataEdit?.ward;
      }
      if (typeEdit === 'district') {
        id = dataEdit?.district?.id;
        data = dataEdit?.district;
      }
      if (typeEdit === 'city') {
        id = dataEdit?.city?.id;
        data = dataEdit?.city;
      }
      if (typeEdit === 'country') {
        id = dataEdit?.country?.id;
        data = dataEdit?.country;
      }
      EditData(typeEdit, id, data)
        .then((result) => {
          if (result.success) {
            setSucess();
            reloadData(1);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  /* submit for delete location */
  const handleDelete = async (e) => {
    setSucess('');
    setError('');
    await validate('delete', typeEdit);
    if (typeEdit !== '' && dataEdit[typeEdit].id) {
      DeleteLocation(typeEdit, dataEdit[typeEdit].id).then((result) => {
        if (result.success) {
          setSucess(messageValid.delete_success);
          reloadData(1);
        } else {
          setError(messageValid.delete_error);
        }
      });
    }
  };

  /* get data for edit */
  useEffect(() => {
    ShowLocation(search.get('location_type'), search.get('location_id'))
      .then((result) => {
        if (result?.ward) {
          setDataEdit((draft) => {
            draft['country'] = result?.ward?.district?.city?.country;
            draft['city'] = result?.ward?.district?.city;
            draft['district'] = result?.ward?.district;
            draft['ward'] = result?.ward;
          });
        } else if (result?.district) {
          setDataEdit((draft) => {
            draft['country'] = result?.district?.city?.country;
            draft['city'] = result?.district?.city;
            draft['district'] = result?.district;
          });
        } else if (result?.city) {
          setDataEdit((draft) => {
            draft['country'] = result?.city?.country;
            draft['city'] = result?.city;
          });
        } else if (result?.country) {
          setDataEdit((draft) => {
            draft['country'] = result?.country;
          });
        } else {
          setDataEdit({});
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [search.get('location_id'), search.get('location_type'), search.get('uuid')]);

  useEffect(() => {
    getLanguages(searchLanguage, dataEdit?.country?.language_id)
      .then((result) => {
        if (result) {
          setlanguages(result);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchLanguage, dataEdit?.country?.language_id]);

  useEffect(() => {
    if (!closeModal) {
      setValid({});
    }
  }, [closeModal]);
  return (
    <Modal id={id} modalEdit closeModal={closeModal}>
      <ScrollY>
        {dataEdit.length !== 0 ? (
          <div className={cx('toggle-edit', 'edit-element text-center')} tabIndex="-1">
            <div className={cx('edit_location_header', 'd-flex flex-row justify-content-between align-items-center')}>
              <h4 className="text-capitalize">
                <b>
                  <Translate>edit_location</Translate>
                </b>
              </h4>
              <Button
                className={cx('close')}
                onClick={(e) => {
                  setDataEdit({});
                  handleToggleEdit();
                }}
                none_size
                transparent
              >
                <FontAwesomeIcon icon={faClose} />
              </Button>
            </div>
            <div className={cx('edit_location_content', 'd-flex flex-column')}>
              {dataEdit?.country ? (
                <form className={cx('country', 'd-flex flex-column')} noValidate>
                  <h5 className={cx('title', 'text-capitalize')}>
                    <Translate>country</Translate>
                  </h5>
                  <div className={cx('content', 'text-capitalize d-flex flex-row flex-wrap')}>
                    <div className={cx('country_name')}>
                      <FormSearch
                        ref={nameCountryRef}
                        title="name"
                        name="name"
                        type="name"
                        Value={dataEdit?.country?.name}
                        handleOnchange={handleOnchangeCountry}
                        useColumn
                        useTippy={false}
                      />
                      <MessageText message={valid?.name_country} className={cx('message', 'text-danger')} />
                    </div>
                    <div className={cx('acronym_country')}>
                      <FormSearch
                        ref={acronymRef}
                        title="acronym"
                        type="acronym"
                        name="acronym"
                        Value={dataEdit?.country?.acronym}
                        handleOnchange={handleOnchangeCountry}
                        useColumn
                        useTippy={false}
                      />
                      <MessageText message={valid?.acronym} className={cx('message', 'text-danger')} />
                    </div>
                    <div className={cx('internation_code_country')}>
                      <FormSearch
                        ref={internationalRef}
                        type="international_codes"
                        title="international_codes"
                        name="international_codes"
                        Value={dataEdit?.country?.international_codes}
                        handleOnchange={handleOnchangeCountry}
                        useColumn
                        useTippy={false}
                      />
                      <MessageText message={valid?.international_codes} className={cx('message', 'text-danger')} />
                    </div>
                    <div className={cx('language_country')}>
                      <FormSearch
                        ref={languageRef}
                        title="language"
                        name="language"
                        data={languages}
                        type="language"
                        handleOnclick={handleOnclickLanguage}
                        handleResetValue={handleClearLanguage}
                        valueID={dataEdit?.country?.language_id}
                        Value={dataEdit?.country?.language?.name}
                        inputClass={cx('text-capitalize form-control py-2')}
                        searchValue={(value) => {
                          setSearchLanguage(value);
                          if (value === '') {
                            setDataEdit((draft) => {
                              draft.country.language_id = '';
                            });
                          }
                        }}
                        useColumn
                      />
                      <MessageText message={valid?.language} className={cx('message', 'text-danger')} />
                    </div>
                  </div>
                </form>
              ) : (
                <Fragment></Fragment>
              )}
              {dataEdit?.city ? (
                <form className={cx('city', 'd-flex flex-column')} noValidate>
                  <h5 className={cx('title', 'text-capitalize')}>
                    <Translate>city</Translate>
                  </h5>
                  <div className={cx('content', 'd-flex flex-row flex-wrap')}>
                    <div className={cx('name_city')}>
                      <FormSearch
                        ref={nameCityRef}
                        title="name"
                        name="name"
                        type="name"
                        Value={dataEdit?.city?.name}
                        useTippy={false}
                        handleOnchange={handleOnchangeCity}
                        useColumn
                      />
                      <MessageText message={valid?.name_city} className={cx('message', 'text-danger')} />
                    </div>
                    <div className={cx('area_city')}>
                      <FormSearch
                        title="area"
                        name="area"
                        type="area"
                        useTippy={false}
                        Value={dataEdit?.city?.area}
                        handleOnchange={handleOnchangeCity}
                        useColumn
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <Fragment></Fragment>
              )}
              {dataEdit?.district ? (
                <form className={cx('district', 'd-flex flex-column')} noValidate>
                  <h5 className={cx('title', 'text-capitalize')}>
                    <Translate>district</Translate>
                  </h5>
                  <div className={cx('content', 'd-flex flex-row flex-wrap')}>
                    <div className={cx('name_district')}>
                      <FormSearch
                        ref={nameDistrictRef}
                        title="name"
                        name="name"
                        type="name"
                        Value={dataEdit?.district?.name}
                        useTippy={false}
                        handleOnchange={handleOnchangeDistrict}
                        useColumn
                      />
                      <MessageText message={valid?.name_district} className={cx('message', 'text-danger')} />
                    </div>
                    <div className={cx('fee_ship_district')}>
                      <FormSearch
                        title="fee_ship"
                        name="fee_ship"
                        type="fee_ship"
                        useTippy={false}
                        Value={dataEdit?.district?.fee_ship}
                        handleOnchange={handleOnchangeDistrict}
                        useColumn
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <Fragment></Fragment>
              )}
              {dataEdit?.ward ? (
                <form className={cx('ward', 'd-flex flex-column')} noValidate>
                  <h5 className={cx('title', 'text-capitalize')}>
                    <Translate>ward</Translate>
                  </h5>
                  <div className={cx('content', 'd-flex flex-row flex-wrap')}>
                    <div className={cx('name_ward')}>
                      <FormSearch
                        ref={nameWardRef}
                        title="name"
                        name="name"
                        type="name"
                        Value={dataEdit?.ward?.name}
                        useTippy={false}
                        handleOnchange={handleOnchangeWard}
                        useColumn
                      />
                      <MessageText message={valid?.name_ward} className={cx('message', 'text-danger')} />
                    </div>
                  </div>
                </form>
              ) : (
                <Fragment></Fragment>
              )}
              {dataEdit?.country ? (
                <>
                  <div className={cx('btn_select')}>
                    <FormSelect
                      ref={selectTypeRef}
                      containerClass={cx('d-flex flex-column')}
                      title="select_type"
                      name="location_type"
                      data={editType}
                      handleOnchange={handleSelectType}
                    />
                    <MessageText message={valid?.type_edit} className={cx('message', 'text-danger')} />
                  </div>
                  <div className={cx('btn_submit_all', 'd-flex flex-row')}>
                    <div className={cx('btn_delete')}>
                      <Button
                        type="button"
                        className={cx('text-capitalize')}
                        onClick={handleDelete}
                        small
                        gradient_danger
                      >
                        <Translate>delete</Translate>
                      </Button>
                    </div>
                    <div className={cx('btn_submit')}>
                      <Button
                        type="button"
                        className={cx('text-capitalize')}
                        onClick={handleSave}
                        small
                        gradient_primary
                      >
                        <Translate>update</Translate>
                      </Button>
                    </div>
                    <div className={cx('btn_message')}>
                      <MessageText
                        message={success || error || valid?.delete}
                        className={cx(
                          'message',
                          'text-center text-capitalize',
                          `text-${success ? 'success' : 'danger'}`,
                        )}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </ScrollY>
    </Modal>
  );
}
