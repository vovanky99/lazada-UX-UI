import Modal from '~/layout/Component/Modal';
import classNames from 'classnames/bind';
import styles from '../Attributes.module.scss';
import Button from '~/components/Button';
import Translate from '~/layout/Component/Translate';
import { useImmer } from 'use-immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FormSearch } from '~/layout/Component/FormSearch';
import Category from '~/layout/Component/Category';
import { useEffect, useRef, useState } from 'react';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import { CreateData } from '~/api/General/HandleData';
import MessageText from '~/layout/Component/Message/MessageText';

const cx = classNames.bind(styles);

export default function AddAttributes({ closeModal, handleReloadData = () => {}, handleClose = () => {} }) {
  const nameViRef = useRef();
  const nameEnRef = useRef();

  const [addData, setAddData] = useImmer({
    name_en: '',
    name_vi: '',
    category_id: '',
  });
  const messageValid = {
    name_vi: Translate({ children: 'valid.name_vi' }),
    name_en: Translate({ children: 'valid.name_en' }),
    success: Translate({ children: 'message.create_success' }),
    error: Translate({ children: 'message.create_error' }),
  };
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [valid, setValid] = useImmer({});
  const validate = async (field = addData) => {
    const message = { ...valid };
    if ('name_vi' in field) {
      message.name_vi = !field.name_vi ? messageValid.name_vi : '';
      if (message.name_vi) {
        nameViRef.current.classList.add('border_danger');
      } else {
        nameViRef.current.classList.remove('border_danger');
      }
    }
    if ('name_en' in field) {
      message.name_en = !field.name_en ? messageValid.name_en : '';
      if (message.name_en) {
        nameEnRef.current.classList.add('border_danger');
      } else {
        nameEnRef.current.classList.remove('border_danger');
      }
    }
    Object.entries(message).map(([key, value]) => {
      if (value === '') {
        delete message[key];
      } else {
        setValid((draft) => {
          draft[key] = value;
        });
      }
    });
    return message;
  };
  const handlSelectCat = (e) => {
    setAddData((draft) => {
      draft.category_id = parseInt(e.target.dataset.id);
    });
  };

  const handleResetValue = (e) => {
    setAddData((draft) => {
      draft.category_id = '';
    });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setAddData((draft) => {
      draft[name] = value;
    });
  };

  /**
   * create attribute
   */
  const HandleCreateAttributes = async (e) => {
    e.preventDefault();
    const val = await validate();
    if (Object.keys(val).length === 0) {
      setSuccess('');
      setError('');
      CreateData('admin', 'attribute', addData)
        .then((result) => {
          if (result.success) {
            setSuccess(messageValid.success);
            handleReloadData(1);
          } else {
            setError(messageValid.error);
          }
        })
        .catch((e) => {
          console.log(e);
          setError(messageValid.error);
        });
    }
  };

  /**
   * validate blur name vi
   */
  useEffect(() => {
    const nameVi = nameViRef.current;
    const handleBlur = (e) => {
      const { value } = e.target;
      if (value === '') {
        setValid((draft) => {
          draft['name_vi'] = messageValid.name_vi;
        });
        nameVi.classList.add('border_danger');
      } else {
        setValid((draft) => {
          delete draft['name_vi'];
        });
        nameVi.classList.remove('border_danger');
      }
    };
    if (nameVi) {
      nameVi.addEventListener('blur', handleBlur);
    }
    return () => {
      if (nameVi) {
        nameVi.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  /**
   * validate blur name en
   */
  useEffect(() => {
    const nameEn = nameEnRef.current;
    const handleBlur = (e) => {
      const { value } = e.target;
      if (value === '') {
        setValid((draft) => {
          draft['name_en'] = messageValid.name_en;
        });
        nameEn.classList.add('border_danger');
      } else {
        setValid((draft) => {
          delete draft['name_en'];
        });
        nameEn.classList.remove('border_danger');
      }
    };
    if (nameEn) {
      nameEn.addEventListener('blur', handleBlur);
    }
    return () => {
      if (nameEn) {
        nameEn.removeEventListener('blur', handleBlur);
      }
    };
  }, []);
  return (
    <Modal id="add_attributes" closeModal={closeModal}>
      <form onSubmit={HandleCreateAttributes} className={cx('add_attributes', 'd-flex flex-column')} noValidate>
        <div className={cx('header', 'd-flex flex-row justify-content-between')}>
          <h4 className={cx('title', 'text-capitalize')}>
            <Translate>attributes</Translate>
          </h4>
          <Button
            type="button"
            onClick={() => {
              handleClose();
            }}
            transparent
            none_size
          >
            <FontAwesomeIcon icon={faClose} />
          </Button>
        </div>
        <div className={cx('content', 'd-flex flex-row flex-wrap')}>
          <div className={cx('name_vi')}>
            <FormSearch
              ref={nameViRef}
              title="name_vi"
              name="name_vi"
              handleOnchange={handleOnchange}
              useTippy={false}
              useColumn
            />
            <MessageDanger message={valid?.name_vi} classNames={cx('message')} />
          </div>
          <div className={cx('category')}>
            <Category
              title="category"
              name="category_id"
              useColumn
              handleResetValue={handleResetValue}
              handleOnclick={handlSelectCat}
            />
            <MessageDanger message={valid?.category} classNames={cx('message')} />
          </div>
          <div className={cx('name_en')}>
            <FormSearch
              ref={nameEnRef}
              title="name_en"
              name="name_en"
              handleOnchange={handleOnchange}
              useTippy={false}
              useColumn
            />
            <MessageDanger message={valid?.name_en} classNames={cx('message')} />
          </div>
        </div>
        <div className={cx('Notification')}>
          <MessageText
            message={error || success}
            className={cx('message', 'text-center text-capitalize', error ? 'text-danger' : 'text-success')}
          />
        </div>
        <div className={cx('btn_submit', 'text-center')}>
          <Button type="submit" className={cx('text-capitalize')} small gradient_primary>
            <Translate>create</Translate>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
