import classNames from 'classnames/bind';
import { Fragment, useEffect, useRef, useState } from 'react';

import Category from '~/layout/Component/Category';
import styles from '~/pages/ADMIN/Category/Category.module.scss';
import { FormSearch } from '~/layout/Component/FormSearch';
import Button from '~/components/Button';
import Modal from '~/layout/Component/Modal';
import { EditData } from '~/api/General/HandleData';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Translate from '~/layout/Component/Translate';
import Images from '~/components/Images';
import Progress from '~/components/Progress';
import CldUploadImg from '~/services/cloudinary/CldUploadImg';
import { useImmer } from 'use-immer';
import MessageText from '~/layout/Component/Message/MessageText';

const cx = classNames.bind(styles);

export default function EditCat({ closeModal, data, handleCloseEditCat }) {
  const fileImageRef = useRef();
  const [editCat, setEditCat] = useImmer(() => {
    return data;
  });
  const message = {
    name_vi: Translate({ children: 'valid.name_vi' }),
    name_en: Translate({ children: 'valid.name_en' }),
    success: Translate({ children: 'valid.create_cat_success' }),
    error: Translate({ children: 'valid.create_cat_error' }),
    category_exists: Translate({ children: 'valid.category_exists' }),
    image_exists: Translate({ children: 'valid.image_exists' }),
  };
  const [valid, setValid] = useImmer({});
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setEditCat({
      ...editCat,
      [name]: value,
    });
  };

  const HandleSetParent = (e) => {
    const { name, id } = e.target.dataset;
    setEditCat({
      ...editCat,
      [name]: id,
    });
  };

  const handleSetStatus = (value) => {
    setEditCat({
      ...editCat,
      status: value,
    });
  };

  const handleSelectMultipleImages = (e) => {
    const Image = fileImageRef.current;
    Image.click();
  };

  const handleDeleteImages = () => {};

  const handleUploadImages = (e) => {
    let { files, value } = e.target;
    let imageExists = false;
    const handleUploadProgress = (e, index) => {
      const progress = Math.round((e.loaded * 100) / e.total);
      setEditCat((draft) => {
        draft.images_cat[`images_${index}`]['progress'] = progress;
      });
    };
    Object.entries(files).forEach(([key, value]) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditCat((draft) => {
          for (let i = 0; i <= draft.images.length - 1; i++) {
            if (draft.images_cat[`images_${i}`]['local'] === '') {
              draft.images_cat[`images_${i}`]['local'] = reader.result;
              CldUploadImg(value, handleUploadProgress(e, i))
                .then((result) => {
                  if (result) {
                    draft.images_cat[`images_${i}`]['data'] = result;
                  }
                })
                .catch((e) => console.log(e));
              break;
            }
            if (draft.images_cat[`images_${i}`]['local'] === reader.result) {
              imageExists = true;
              break;
            }
          }
        });
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

  const handleEditCat = (e) => {
    e.preventDefault();
    EditData('admin', 'category', data?.id, editCat)
      .then((result) => {})
      .catch((e) => console.log(e));
  };
  return (
    <Modal id="edit_cat_modal" closeModal={closeModal} modalEdit>
      <div className={cx('edit_cat', 'edit-element d-flex flex-column')} tabIndex="-1">
        <div className={cx('edit_cat_header', 'd-flex flex-row justify-content-between')}>
          <h4 className="text-center text-capitalize">
            <b>Edit Category</b>
          </h4>
          <Button type="button" none_size transparent>
            <FontAwesomeIcon icon={faClose} onClick={handleCloseEditCat} />
          </Button>
        </div>
        <form className={cx('edit_cat_content', 'd-flex flex-row flex-wrap')} noValidate onSubmit={handleEditCat}>
          {Object.entries(data?.categories_translation).map(([key, value]) => (
            <div className={cx('name')}>
              <FormSearch
                title={value?.language_id === 1 ? 'name_vi' : 'name_en'}
                name={value?.language_id === 1 ? 'name_vi' : 'name_en'}
                Value={value?.name}
                useColumn
                useTippy={false}
                handleOnchange={handleOnchange}
                key={key}
              />
            </div>
          ))}

          <div className="d-flex flex-row flex-wrap">
            <Category
              title="parent"
              name="parent_id"
              useColumn
              ValueID={editCat?.parent_id}
              SearchValue={data?.cat_name}
              handleOnclick={HandleSetParent}
            />
          </div>
          <div className={cx('status')}>
            <FormSelect title="status" useStatus={true} defaultValue={data?.status} handleSetValue={handleSetStatus} />
          </div>
          <div className={cx('images_category')}>
            <h4 className="text-capitalize">
              <Translate>category_images</Translate>
            </h4>
            <div className={cx('images_category_content', 'd-flex flex-column')}>
              <div className={cx('all_images', 'd-flex flex-column')}>
                <div className={cx('all_images_content', 'd-flex flex-row')}>
                  {data?.images.map(([key, value]) => {
                    return value?.data ? (
                      <div className={cx('images_container')} key={key}>
                        <div className={cx('img')}>
                          <Images src={value?.data?.src || value?.local} alt={value?.data?.src || value?.local} />
                        </div>
                        <Progress />
                        <Button className={cx('close')} transparent none_size type="button">
                          <FontAwesomeIcon icon={faClose} onClick={handleDeleteImages} data-name={key} />
                        </Button>
                      </div>
                    ) : (
                      <Fragment key={key}></Fragment>
                    );
                  })}
                  {editCat?.images.filter((d) => d?.data !== '').length !== 6 ? (
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

          <div className="d-flex flex-row justify-content-center">
            <Button gradient_primary type="submit">
              Edit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
