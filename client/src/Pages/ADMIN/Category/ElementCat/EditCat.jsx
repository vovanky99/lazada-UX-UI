import classNames from 'classnames/bind';
import { Fragment, useEffect, useRef, useState } from 'react';

import Category from '~/layout/Component/Category';
import styles from '~/pages/ADMIN/Category/Category.module.scss';
import { FormSearch } from '~/layout/Component/FormSearch';
import Button from '~/components/Button';
import Modal from '~/layout/Component/Modal';
import { EditData, ShowData } from '~/api/General/HandleData';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Translate from '~/layout/Component/Translate';
import Images from '~/components/Images';
import Progress from '~/components/Progress';
import CldUploadImg, { DeleteImageCld } from '~/services/cloudinary/CldUploadImg';
import { useImmer } from 'use-immer';
import MessageText from '~/layout/Component/Message/MessageText';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

export default function EditCat({ closeModal, handleReloadData = () => {}, handleCloseEditCat }) {
  const fileImageRef = useRef();
  const nameEnRef = useRef();
  const nameViRef = useRef();
  const { language } = useSelector((state) => state.Auth);
  const [searchParams] = useSearchParams();
  const [editSuccess, setEditSuccess] = useState('');
  const [editError, setEditError] = useState('');
  const [editCat, setEditCat] = useImmer(null);
  const message = {
    name_vi: Translate({ children: 'valid.name_vi' }),
    name_en: Translate({ children: 'valid.name_en' }),
    success: Translate({ children: 'message.edit_cat_success' }),
    error: Translate({ children: 'message.edit_cat_error' }),
    image_exists: Translate({ children: 'valid.image_exists' }),
    images_cat: Translate({ children: 'valid.images_cat' }),
  };
  const [valid, setValid] = useImmer({});
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === 'name_vi') {
      setEditCat((draft) => {
        draft.categories_translation[0].name = value;
      });
    } else if (name === 'name_en') {
      setEditCat((draft) => {
        draft.categories_translation[1].name = value;
      });
    } else {
      setEditCat((draft) => {
        draft.industry_code = value;
      });
    }
  };

  const HandleSetParent = (e) => {
    const { name, id } = e.target.dataset;
    setEditCat((draft) => {
      draft.parent_id = parseInt(id);
    });
  };

  const handleSetStatus = (value) => {
    setEditCat((draft) => {
      draft.status = parseInt(value);
    });
  };

  const handleSelectMultipleImages = (e) => {
    const Image = fileImageRef.current;
    Image.click();
  };

  const handleDeleteImages = (e) => {
    const { id, type } = e.currentTarget.dataset;
    if (type) {
      DeleteImageCld(type)
        .then((result) => {
          if (result.success) {
            setEditCat((draft) => {
              draft.images[id].data = '';
              draft.images[id].progress = '';
              draft.images[id].local = '';
            });
          }
        })
        .catch((e) => console.log(e));
    } else {
      Object.entries(editCat.images).map(([key, value]) => {
        if (key === id) {
          setEditCat((draft) => {
            draft.images[key].name = '';
          });
        }
      });
    }
  };

  /* validate */
  const validate = async (field = editCat) => {
    const messageValid = { ...valid };
    if ('name' in field.categories_translation[0]) {
      messageValid.name_vi = !field.categories_translation[0].name ? message.name_vi : '';
      if (messageValid.name_vi && nameViRef) {
        nameViRef.current.classList.add('border_danger');
      } else {
        nameViRef.current.classList.remove('border_danger');
      }
    }
    if ('name' in field.categories_translation[1]) {
      messageValid.name_en = !field.categories_translation[1].name ? message.name_en : '';
      if (messageValid.name_en && nameEnRef) {
        nameEnRef.current.classList.add('border_danger');
      } else {
        nameEnRef.current.classList.remove('border_danger');
      }
    }

    Object.entries(messageValid).map(([key, value]) => {
      if (value === '') {
        delete messageValid[key];
      } else {
        setValid((draft) => {
          draft[key] = value;
        });
      }
    });
    return messageValid;
  };
  const handleUploadProgress = (event) => {
    const { loaded, total } = event;
    const percent = Math.round((loaded * 100) / total);
    setEditCat((draft) => {
      for (let i = 0; i <= 5; i++) {
        if (!editCat.images[i]?.name && !editCat.images[i]?.data) {
          draft.images[i].progress = 100;
          break;
        }
      }
    });
  };

  const uploadFile = (file, reader) => {
    try {
      CldUploadImg(file, handleUploadProgress)
        .then((result) => {
          if (result) {
            setEditCat((draft) => {
              for (let i = 0; i <= 5; i++) {
                if (draft.images[i]?.local && draft.images[i]['local'] === reader) {
                  draft.images[i]['data'] = result;
                  draft.images[i]['progress'] = 0;
                  break;
                }
              }
            });
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  const handleUploadImages = (e) => {
    let { files, value } = e.target;
    let imageExists = false;

    Object.entries(files).forEach(([key, value]) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setEditCat((draft) => {
          for (let i = 0; i <= 5; i++) {
            if (
              !draft.images[i] ||
              (draft.images[i].name === '' && (!draft.images[i].data || draft.images[i].data === '')) ||
              (draft.images[i].data === '' && !draft.images[i].name)
            ) {
              if (!draft.images[i]) {
                draft.images[i] = {
                  data: '',
                  local: '',
                  progress: '',
                };
              }
              draft.images[i]['local'] = reader.result;
              draft.images[i]['progress'] = 0;
              break;
            }
            if (editCat.images[i]?.local && editCat.images[i]['local'] === reader.result) {
              imageExists = true;
              break;
            }
          }
        });
        if (imageExists) {
          return;
        }
        uploadFile(value, reader.result);
      };
      if (value) {
        reader.readAsDataURL(value);
      }
    });
    if (!imageExists) {
      setValid((draft) => {
        delete draft['images_cat'];
      });
    } else {
      setValid((draft) => {
        draft['images_cat'] = message.image_exists;
      });
    }
    // Clear the input value to allow the same file to be selected again
    value = '';
  };

  const handleEditCat = async (e) => {
    e.preventDefault();
    const val = await validate();
    if (Object.keys(val).length === 0) {
      let images = [];
      //handle data for create
      Object.entries(editCat.images).map(([key, value]) => {
        if (value.name && value.name !== '') {
          images.push(value.name);
        } else if (value.data !== '') {
          images.push(value.data.src);
        }
      });
      const data = {
        name_vi: editCat.categories_translation[0].name,
        name_en: editCat.categories_translation[1].name,
        parent_id: editCat.parent_id,
        industry_code: editCat.industry_code,
        status: editCat.status,
        images: images,
      };
      EditData('admin', 'category', editCat?.id, data)
        .then((result) => {
          if (result.success) {
            setEditSuccess(message.success);
            handleReloadData(1);
          } else {
            setEditSuccess('');
            setEditError(message.error);
          }
        })
        .catch((e) => {
          console.log(e);
          setEditError(message.error);
        });
    }
  };
  /* get data for show category */
  useEffect(() => {
    ShowData('admin', 'category', searchParams.get('sp_atk'), language)
      .then((result) => {
        if (result.cat) {
          setEditCat(result.cat);
        }
      })
      .catch((e) => console.log(e));
  }, [searchParams.get('sp_atk'), searchParams.get('uuid')]);
  return (
    <Modal id="edit_cat_modal" closeModal={closeModal} modalEdit>
      <div className={cx('edit_cat', 'edit-element d-flex flex-column')} tabIndex="-1">
        <div className={cx('edit_cat_header', 'd-flex flex-row justify-content-between')}>
          <h4 className="text-center text-capitalize">
            <b>
              <Translate>edit</Translate> <Translate>category</Translate>
            </b>
          </h4>
          <Button
            type="button"
            onClick={() => {
              handleCloseEditCat();
              setEditCat(null);
            }}
            none_size
            transparent
          >
            <FontAwesomeIcon icon={faClose} />
          </Button>
        </div>
        {editCat && (
          <form className={cx('edit_cat_content', 'd-flex flex-row flex-wrap')} noValidate onSubmit={handleEditCat}>
            {editCat &&
              Object.entries(editCat?.categories_translation).map(([key, value]) => (
                <div className={cx('name')} key={key}>
                  <FormSearch
                    ref={value?.language_id === 1 ? nameViRef : nameEnRef}
                    title={value?.language_id === 1 ? 'name_vi' : 'name_en'}
                    name={value?.language_id === 1 ? 'name_vi' : 'name_en'}
                    Value={value?.name}
                    useColumn
                    useTippy={false}
                    handleOnchange={handleOnchange}
                  />
                </div>
              ))}
            <div className="d-flex flex-row flex-wrap">
              <Category
                title="parent"
                name="parent_id"
                useColumn
                ValueID={editCat?.parent_id || ''}
                SearchValue={editCat?.parent?.categories_translation[0]?.name || ''}
                handleOnclick={HandleSetParent}
              />
            </div>
            <div className={cx('industry_code')}>
              <FormSearch
                title="industry_code"
                useColumn
                inputType="number"
                name="industry_code"
                Value={editCat?.industry_code || ''}
                useTippy={false}
                handleOnchange={handleOnchange}
              />
            </div>
            <div className={cx('status')}>
              <FormSelect
                title="status"
                useStatus={true}
                defaultValue={editCat?.status}
                handleSetValue={handleSetStatus}
              />
            </div>
            <div className={cx('images_category')}>
              <h4 className="text-capitalize">
                <Translate>category_images</Translate>
              </h4>
              <div className={cx('images_category_content', 'd-flex flex-column')}>
                <div className={cx('all_images', 'd-flex flex-column')}>
                  <div className={cx('all_images_content', 'd-flex flex-row')}>
                    {editCat?.images &&
                      editCat?.images?.map((image, index) => {
                        return (
                          (image?.name || image?.local || image?.data) && (
                            <div className={cx('images_container')} key={index}>
                              <div className={cx('img')}>
                                <Images src={image?.name || image?.local || image?.data?.src} alt={image?.name} />
                              </div>
                              <Progress />
                              <Button className={cx('close')} transparent none_size type="button">
                                <FontAwesomeIcon
                                  icon={faClose}
                                  onClick={handleDeleteImages}
                                  data-id={index}
                                  data-type={image?.data?.public_id || ''}
                                />
                              </Button>
                            </div>
                          )
                        );
                      })}
                    {editCat?.images.filter((d) => d?.data !== '' || d?.name !== '').length !== 6 ? (
                      <div
                        data-type="btn_upload"
                        className={cx('select_images', 'd-flex flex-row justify-content-center')}
                      >
                        <input
                          ref={fileImageRef}
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleUploadImages}
                          multiple
                        />
                        <Button
                          className={cx('btn_select_image', 'text-capitalize')}
                          transparent
                          type="button"
                          onClick={handleSelectMultipleImages}
                        >
                          <Translate>select_image</Translate>
                        </Button>
                      </div>
                    ) : (
                      <Fragment></Fragment>
                    )}
                  </div>
                  <MessageText
                    className={cx('message', 'text-capitalize text-center text-danger')}
                    message={valid?.images_cat}
                  />
                </div>
              </div>
            </div>
            <div className={cx('message_edit')}>
              <MessageText
                message={editError || editSuccess}
                className={cx('message', 'text-capitalize text-center', editError ? 'text-danger' : 'text-success')}
              />
            </div>
            <div className="d-flex flex-row justify-content-center">
              <Button className={cx('text-capitalize')} gradient_primary type="submit">
                <Translate>edit</Translate>
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
