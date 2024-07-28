import classNames from 'classnames/bind';

import styles from '~/pages/ADMIN/Location/Location.module.scss';
import Button from '~/components/Button';
import { useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import { CreateData } from '~/api/General/HandleData';
import Modal from '~/layout/Component/Modal';
import Translate from '~/layout/Component/Translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useImmer } from 'use-immer';

const cx = classNames.bind(styles);

export default function Country({
  title,
  closeModal,
  resetValue = false,
  handleCloseLocation = () => {},
  id,
  handleReloadData = () => {},
}) {
  const nameRef = useRef();
  const acronymRef = useRef();
  const InternationCodeRef = useRef();

  const messageValid = {
    name: Translate({ children: 'valid.name' }),
    international_codes: Translate({ children: 'valid.international_codes' }),
    acronym: Translate({ children: 'valid.acronym' }),
    createError: Translate({ children: 'valid.create_error' }),
    createSuccess: Translate({ children: 'valid.create_success' }),
  };
  const [valid, setValid] = useState({});
  const [createSuccess, setCreateSuccess] = useState('');
  const [createError, setCreateError] = useState('');
  const [country, setCountry] = useImmer({
    name: '',
    international_codes: '',
    acronym: '',
    language: '',
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setCountry((darft) => {
      darft[name] = value;
    });
  };

  const validate = async (filed = country) => {
    const messageError = { ...valid };
    if ('name' in filed) {
      messageError.name = !filed.name ? messageValid.name : '';
    }
    if ('international_codes' in filed) {
      messageError.international_codes = !filed.international_codes ? messageValid.international_codes : '';
    }
    if ('acronym' in filed) {
      messageError.acronym = !filed.acronym ? messageValid.acronym : '';
    }

    if (filed === country) {
      Object.entries(messageError).map(([key, value]) => {
        if (value === '') {
          delete messageError[key];
        }
      });
    }

    if (messageError.name) {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }
    if (messageError.international_codes) {
      InternationCodeRef.current.classList.add('border_danger');
    } else {
      InternationCodeRef.current.classList.remove('border_danger');
    }
    if (messageError.acronym) {
      acronymRef.current.classList.add('border_danger');
    } else {
      acronymRef.current.classList.remove('border_danger');
    }
    setValid(messageError);
    return messageError;
  };

  /*submit form */
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let val = await validate();
    if (country.name !== '') {
      if (Object.keys(val).length === 0) {
        CreateData('admin', 'country', country)
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
          .catch((e) => {
            console.log(e);
            setCreateError(messageValid.createError);
          });
      }
    }
  };
  return (
    <Modal id={id} closeModal={closeModal}>
      <div className={cx('add-container')}>
        <form onSubmit={handleSubmitForm} className={cx('d-flex flex-column')} noValidate>
          <div className={cx('form_header', 'd-flex flex-row justify-content-between')}>
            <h4 className="text-capitalize">
              <Translate>{title}</Translate>
            </h4>
            <Button type="button" transparent onClick={handleCloseLocation} none_size>
              <FontAwesomeIcon icon={faClose} />
            </Button>
          </div>
          <div className={cx('form_content', 'form-group d-flex flex-row flex-wrap mb-3  ')}>
            <FormSearch
              ref={nameRef}
              useColumn
              title="name"
              resetValue={resetValue}
              name="name"
              handleOnchange={handleOnchange}
              useTippy={false}
            />
            <FormSearch
              ref={InternationCodeRef}
              inputType="number"
              title="international_codes"
              name="international_codes"
              useColumn
              resetValue={resetValue}
              handleOnchange={handleOnchange}
              useTippy={false}
            />
            <FormSearch
              ref={acronymRef}
              title="acronym"
              name="acronym"
              useColumn
              resetValue={resetValue}
              handleOnchange={handleOnchange}
              useTippy={false}
            />
            <FormSearch
              title="language"
              name="language"
              resetValue={resetValue}
              useColumn
              handleOnchange={handleOnchange}
              useTippy={false}
            />
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
