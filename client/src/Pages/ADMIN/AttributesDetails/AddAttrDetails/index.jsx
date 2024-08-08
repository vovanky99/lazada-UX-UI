import classNames from 'classnames/bind';
import styles from '../AttributesDetails.module.scss';
import Modal from '~/layout/Component/Modal';
import Translate from '~/layout/Component/Translate';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import Attributes from '~/layout/Component/Attributes';
import Category from '~/layout/Component/Category';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageText from '~/layout/Component/Message/MessageText';
import { CreateData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function AddAttrDetails({
  language,
  closeModal,
  handleToggleAdd = () => {},
  handleReloadData = () => {},
}) {
  const nameViRef = useRef();
  const nameEnRef = useRef();
  const attrRef = useRef();
  const [valid, setValid] = useImmer({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [catId, setCatId] = useState('');
  const messageValid = {
    name_vi: Translate({ children: 'valid.name_vi' }),
    name_en: Translate({ children: 'valid.name_en' }),
    attributes: Translate({ children: 'valid.attributes' }),
    success: Translate({ children: 'message.create_success' }),
    error: Translate({ children: 'message.create_error' }),
  };
  const [addData, setAddData] = useImmer({
    name_en: '',
    name_vi: '',
    attr_id: '',
  });

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

    if ('attr_id' in field) {
      message.attr = !field.attr_id ? messageValid.attributes : '';
      if (message.name_en) {
        attrRef.current.classList.add('border_danger');
      } else {
        attrRef.current.classList.remove('border_danger');
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

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setAddData((draft) => {
      draft[name] = value;
    });
  };

  const handleSetCat = (e) => {
    const { id } = e.target.dataset;
    setCatId(parseInt(id));
  };

  const handleResetCat = (e) => {
    setCatId('');
  };

  const handleSetAttr = (e) => {
    const { id } = e.target.dataset;
    setAddData((draft) => {
      draft.attr_id = parseInt(id);
    });
  };

  const handleResetAttribute = () => {
    setAddData((draft) => {
      draft.attr_id = '';
    });
  };

  const handleCreateAttrDeatils = async (e) => {
    e.preventDefault();
    const val = await validate();
    if (Object.keys(val).length === 0) {
      setError('');
      setSuccess('');
      CreateData('admin', 'attr-details', addData)
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
    <Modal id="add_attr_details" closeModal={closeModal}>
      <form onSubmit={handleCreateAttrDeatils} className={cx('add_attr_details', 'd-flex flex-column ')} noValidate>
        <div className={cx('header', 'd-flex flex-row justify-content-between align-items-center')}>
          <h4 className={cx('title', 'text-capitalize')}>
            <Translate>add_attributes_details</Translate>
          </h4>
          <Button
            type="button"
            none_size
            transparent
            onClick={() => {
              handleToggleAdd();
              setSuccess('');
              setError('');
              setValid({});
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </Button>
        </div>
        <div className={cx('content', 'd-flex flex-row flex-wrap')}>
          <div className={cx('attribute')}>
            <Category
              title="category"
              name="category_id"
              useColumn
              handleResetValue={handleResetCat}
              handleOnclick={handleSetCat}
            />
          </div>
          <div className={cx('attribute')}>
            <Attributes
              ref={attrRef}
              title="attributes"
              name="attribute_id"
              useColumn
              cat_id={catId}
              handleResetValue={handleResetAttribute}
              handleOnclick={handleSetAttr}
            />
            <MessageDanger message={valid?.attr} classNames={cx('message')} />
          </div>
          <div className={cx('name_vi')}>
            <FormSearch
              ref={nameViRef}
              title="name_vi"
              name="name_vi"
              useColumn
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <MessageDanger message={valid?.name_vi} classNames={cx('message')} />
          </div>
          <div className={cx('name_en')}>
            <FormSearch
              ref={nameEnRef}
              title="name_en"
              name="name_en"
              useColumn
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <MessageDanger message={valid?.name_en} classNames={cx('message')} />
          </div>
        </div>
        <div className={cx('notifi_message')}>
          <MessageText
            message={error || success}
            className={cx('message', 'text-center text-capitalize', error ? 'text-danger' : 'text-success')}
          />
        </div>
        <div className={cx('btn_submit', 'text-center')}>
          <Button type="submit" gradient_primary small className={cx('text-capitalize')}>
            <Translate>create</Translate>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
