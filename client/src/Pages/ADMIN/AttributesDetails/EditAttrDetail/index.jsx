import classNames from 'classnames/bind';
import styles from '../AttributesDetails.module.scss';
import Modal from '~/layout/Component/Modal';
import Translate from '~/layout/Component/Translate';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import Attributes from '~/layout/Component/Attributes';
import Category from '~/layout/Component/Category';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageText from '~/layout/Component/Message/MessageText';
import { CreateData, EditData, ShowData } from '~/api/General/HandleData';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function EditAttrDetail({
  language,
  closeModal,
  handleToggleEdit = () => {},
  handleReloadData = () => {},
}) {
  const nameViRef = useRef();
  const nameEnRef = useRef();
  const attrRef = useRef();
  const [searchParams] = useSearchParams();
  const [valid, setValid] = useImmer({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [catId, setCatId] = useState('');
  const [data, setData] = useImmer(null);
  const messageValid = {
    name_vi: Translate({ children: 'valid.name_vi' }),
    name_en: Translate({ children: 'valid.name_en' }),
    attributes: Translate({ children: 'valid.attributes' }),
    success: Translate({ children: 'message.create_success' }),
    error: Translate({ children: 'message.create_error' }),
  };

  const validate = async (field = data) => {
    const message = { ...valid };
    if ('name_vi' in field.attributes_detail_translation[0]) {
      message.name_vi = !field.attributes_detail_translation[0].name ? messageValid.name_vi : '';
      if (message.name_vi) {
        nameViRef.current.classList.add('border_danger');
      } else {
        nameViRef.current.classList.remove('border_danger');
      }
    }
    if ('name_en' in field.attributes_detail_translation[1]) {
      message.name_en = !field.attributes_detail_translation[1].name ? messageValid.name_en : '';
      if (message.name_en) {
        nameEnRef.current.classList.add('border_danger');
      } else {
        nameEnRef.current.classList.remove('border_danger');
      }
    }

    if ('attribute_id' in field) {
      message.attr = !field.attribute_id ? messageValid.attributes : '';
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
    if (name === 'name_vi') {
      setData((draft) => {
        draft.attributes_detail_translation[0].name = value;
      });
    } else {
      setData((draft) => {
        draft.attributes_detail_translation[1].name = value;
      });
    }
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
    setData((draft) => {
      draft.attribute_id = parseInt(id);
    });
  };

  const handleResetAttribute = () => {
    setData((draft) => {
      draft.attribute_id = '';
    });
  };

  const handleCreateAttrDeatils = async (e) => {
    e.preventDefault();
    const val = await validate();
    if (Object.keys(val).length === 0) {
      setError('');
      setSuccess('');
      const datas = {
        name_vi: data.attributes_detail_translation[0].name,
        name_en: data.attributes_detail_translation[1].name,
        attribute_id: data.attribute_id,
      };
      EditData('admin', 'attr-details', data.id, datas)
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
    ShowData('admin', 'attr-details', searchParams.get('sp_atk'), language)
      .then((result) => {
        if (result.attr) {
          setData(result.attr);
        }
      })
      .catch((e) => console.log(e));
  }, [searchParams.get('sp_atk'), searchParams.get('uuid')]);
  return (
    <Modal id="edit_attr_details" modalEdit closeModal={closeModal}>
      <form onSubmit={handleCreateAttrDeatils} className={cx('edit_attr_details', 'd-flex flex-column ')} noValidate>
        {data && (
          <Fragment>
            <div className={cx('header', 'd-flex flex-row justify-content-between align-items-center')}>
              <h4 className={cx('title', 'text-capitalize')}>
                <Translate>edit_attributes_details</Translate>
              </h4>
              <Button
                type="button"
                none_size
                transparent
                onClick={() => {
                  handleToggleEdit();
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
                  ValueID={data.attribute_id}
                  SearchValue={data.attribute.attributes_translation[0].name}
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
                  Value={data.attributes_detail_translation[0].name}
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
                  Value={data.attributes_detail_translation[1].name}
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
                <Translate>update</Translate>
              </Button>
            </div>
          </Fragment>
        )}
      </form>
    </Modal>
  );
}
