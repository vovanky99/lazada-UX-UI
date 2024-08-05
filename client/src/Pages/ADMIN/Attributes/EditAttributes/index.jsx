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
import { Fragment, useEffect, useRef, useState } from 'react';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import { EditData, ShowData } from '~/api/General/HandleData';
import MessageText from '~/layout/Component/Message/MessageText';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function EditAttributes({ closeModal, language, handleReloadData = () => {}, handleClose = () => {} }) {
  const nameViRef = useRef();
  const nameEnRef = useRef();
  const [searchParam] = useSearchParams();

  const [editData, setEditData] = useImmer(null);
  const messageValid = {
    name_vi: Translate({ children: 'valid.name_vi' }),
    name_en: Translate({ children: 'valid.name_en' }),
    success: Translate({ children: 'message.edit_success' }),
    error: Translate({ children: 'message.edit_error' }),
  };
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [valid, setValid] = useImmer({});
  const validate = async (field = editData) => {
    const message = { ...valid };
    if ('name' in field.attributes_translation[0]) {
      message.name_vi = !field.attributes_translation[0].name ? messageValid.name_vi : '';
      if (message.name_vi) {
        nameViRef.current.classList.add('border_danger');
      } else {
        nameViRef.current.classList.remove('border_danger');
      }
    }
    if ('name' in field.attributes_translation[1]) {
      message.name_en = !field.attributes_translation[1].name ? messageValid.name_en : '';
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
  const handleSetCat = (e) => {
    setEditData((draft) => {
      draft.cat_id = parseInt(e.target.dataset.id);
    });
  };

  const handleResetValue = (e) => {
    setEditData((draft) => {
      draft.cat_id = '';
    });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === 'name_vi') {
      setEditData((draft) => {
        draft.attributes_translation[0].name = value;
      });
    } else {
      setEditData((draft) => {
        draft.attributes_translation[1].name = value;
      });
    }
  };

  /**
   * create attribute
   */
  const HandleEditAttributes = async (e) => {
    e.preventDefault();
    const val = await validate();
    if (Object.keys(val).length === 0) {
      const data = {
        name_vi: editData?.attributes_translation[0].name,
        name_en: editData?.attributes_translation[1].name,
        category_id: editData?.cat_id,
      };
      setError('');
      setSuccess('');
      EditData('admin', 'attribute', editData?.id, data)
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

  useEffect(() => {
    ShowData('admin', 'attribute', searchParam.get('sp_atk'), language)
      .then((result) => {
        if (result?.attr) {
          setEditData(result?.attr);
        }
      })
      .catch((e) => console.log(e));
  }, [searchParam.get('sp_atk'), searchParam.get('uuid')]);
  return (
    <Modal id="edit_attributes" modalEdit closeModal={closeModal}>
      <form onSubmit={HandleEditAttributes} className={cx('edit_attributes', 'd-flex flex-column')} noValidate>
        {editData && (
          <Fragment>
            <div className={cx('header', 'd-flex flex-row justify-content-between align-items-center')}>
              <h4>
                <Translate>edit_attributes</Translate>
              </h4>
              <Button
                type="button"
                onClick={() => {
                  handleClose();
                  setValid({});
                  setEditData(null);
                }}
                none_size
                transparent
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
                  useColumn
                  Value={editData?.attributes_translation[0]?.name}
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
                  Value={editData?.attributes_translation[1]?.name}
                  useTippy={false}
                  handleOnchange={handleOnchange}
                />
                <MessageDanger message={valid?.name_en} classNames={cx('message')} />
              </div>
              <div className={cx('category')}>
                <Category
                  title="category"
                  name="category_id"
                  useColumn
                  ValueID={editData?.category_id}
                  SearchValue={editData?.category?.categories_translation[0].name}
                  useTippy={false}
                  handleResetValue={handleResetValue}
                  handleOnclick={handleSetCat}
                />
              </div>
            </div>
            <div className={cx('notifi_message')}>
              <MessageText
                message={error || success}
                className={cx('message', 'text-center text-capitalize', error ? 'text-danger' : 'text-success')}
              />
            </div>
            <div className={cx('btn_submit', 'text-center')}>
              <Button className={cx('text-capitalize')} type="submit" small gradient_primary>
                <Translate>update</Translate>
              </Button>
            </div>
          </Fragment>
        )}
      </form>
    </Modal>
  );
}
