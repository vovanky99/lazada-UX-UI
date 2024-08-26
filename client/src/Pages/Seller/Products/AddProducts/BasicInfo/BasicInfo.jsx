import classNames from 'classnames/bind';

import styles from '../../Products.module.scss';
import Translate from '~/layout/Component/Translate';
import RadioList from '~/layout/Component/RadioList';
import { Fragment, useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPlayCircle } from '@fortawesome/fontawesome-free-regular';
import { faCrop, faPen, faPlus, faVideo } from '@fortawesome/free-solid-svg-icons';
import Images from '~/components/Images';
import { useImmer } from 'use-immer';
import Video from '~/components/Video';
import CldUploadImg, { CldUploadVideo, DeleteImageCld } from '~/services/cloudinary/CldUploadImg';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

export default function BasicInfo() {
  const imageRef = useRef();
  const selectImagesRef = useRef();
  const selectVideoRef = useRef();
  const [editCategory, setEditCategory] = useState(false);
  const imagesProductsTitle = [
    { type: 1, title: 'image_scale_1_1' },
    { type: 2, title: 'image_scale_3_4' },
  ];
  const [product, setProduct] = useImmer({
    video: '',
    name: '',
    product_description: '',
    images: {},
  });

  /**
   *
   * select category
   */
  const handleToggleCategory = (type = '') => {
    if (editCategory && type === 'close') {
      setEditCategory(false);
    } else {
      setEditCategory(true);
    }
  };

  /***
   * handle select images for product
   */

  const handleSelectImages = (e) => {
    imageRef.current.click();
  };
  /* handle upload images */
  const UploadImages = (file) => {
    CldUploadImg(file)
      .then((result) => {
        setProduct((draft) => {
          for (let i = 0; i < 9; i++) {
            if (!draft.images[i]) {
              draft.images[i] = result;
              break;
            }
          }
        });
      })
      .catch((e) => console.log(e));
  };
  const handleOnchangeSelect = (e) => {
    const { files } = e.target;
    if (files) {
      Object.entries(files).forEach(([key, value]) => {
        if (Object.entries(product.images).length === 9) {
          return false;
        }
        const reader = new FileReader();
        reader.onload = () => {
          UploadImages(value);
        };
        if (value) {
          reader.readAsDataURL(value);
        }
      });
    }
    e.target.value = '';
  };

  const handleDeleteImage = (e) => {
    const { id, index } = e.currentTarget.dataset;
    DeleteImageCld(id)
      .then((result) => {
        if (result?.success) {
          setProduct((draft) => {
            delete draft.images[index];
          });
        }
      })
      .catch((e) => console.log(e));
  };

  /**
   * handle select video
   */
  const handleSelectVideo = (e) => {
    selectVideoRef.current.click();
  };

  const handleOnchangeVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
      CldUploadVideo(file)
        .then((result) => {
          if (result) {
            setProduct((draft) => {
              draft.video = result;
            });
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const handleSetName = (value) => {
    setProduct((draft) => {
      draft.name = value;
    });
  };

  const handleSetProductDescriptions = (value) => {
    setProduct((draft) => {
      draft.product_description = value;
    });
  };

  return (
    <div className={cx('seller_basic_info', 'd-flex flex-column')}>
      <h4 className={cx('title')}>
        <strong>
          <Translate>pages.seller.add_product.basic_info</Translate>:
        </strong>
      </h4>
      <div className={cx('content', 'd-flex flex-column')}>
        <div id="images_product" className={cx('images_product', 'd-flex flex-row')}>
          <label className={cx('form-label')}>
            <Translate>pages.seller.add_product.product_image.title</Translate>
          </label>
          <div className={cx('images_product_content', 'd-flex flex-row flex-wrap')}>
            {Object.keys(product.images).length !== 0 && (
              <div className={cx('image_contain', 'd-flex flex-row flex-wrap')}>
                {Object.entries(product.images).map((dt, index) => (
                  <div className={cx('image_product')} key={index}>
                    <div className={cx('img_contain')}>
                      <Images src={dt[1].url} alt={dt[1].url} />
                    </div>
                    <div className={cx('img_toll', 'flex-row align-items-center justify-content-evenly')}>
                      {/* <span className={cx('edit_img')}>
                        <FontAwesomeIcon icon={faCrop} />
                      </span>
                      <span className={cx('decollator')}></span> */}
                      <span
                        className={cx('delete_img')}
                        onClick={handleDeleteImage}
                        data-index={dt[0]}
                        data-id={dt[1].public_id}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {Object.keys(product.images).length !== 9 && (
              <div className={cx('btn_img')}>
                <input
                  ref={imageRef}
                  type="file"
                  className={cx('d-none')}
                  onChange={handleOnchangeSelect}
                  accept="image/*"
                  multiple
                />
                <Button
                  onClick={handleSelectImages}
                  className={cx('image_item', 'd-flex flex-column')}
                  transparent
                  none_size
                >
                  <div className={cx('image_icon')}>
                    <FontAwesomeIcon icon={faImage} />
                    <div className={cx('image_plus')}>
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </div>
                  <div className={cx('title')}>
                    <Translate>add_image</Translate>(0/9)
                  </div>
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className={cx('image_cover', 'd-flex flex-row')}>
          <label>
            <Translate>image_cover</Translate>
          </label>
          <div className={cx('image', 'd-flex flex-row')}>
            {product.images[0]?.url ? (
              <div className={cx('img')}>
                <Images src={product.images[0].url} alt={product.images[0].url} />
              </div>
            ) : (
              <Fragment>
                <div className={cx('no_img')}>
                  <div className={cx('icon_image')}>
                    <FontAwesomeIcon icon={faImage} />
                    <div className={cx('icon_plus')}>
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </div>
                  <span>(0/1)</span>
                </div>
              </Fragment>
            )}
            <ul className={cx('note')}>
              <li>
                <Translate>pages.seller.add_product.note.image_cover_first</Translate>
              </li>
              <li>
                <Translate>pages.seller.add_product.note.image_cover_second</Translate>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx('video_product', 'd-flex flex-row')}>
          <label>
            <Translate>product_video</Translate>
          </label>
          <div className={cx('video', 'd-flex flex-row')}>
            {product.video ? (
              <div className={cx('video_contain')}>
                <Video src={product.video?.src} />
              </div>
            ) : (
              <Fragment>
                <input
                  ref={selectVideoRef}
                  type="file"
                  onChange={handleOnchangeVideo}
                  className="d-none"
                  accept="video/*"
                  multiple={false}
                />
                <Button
                  className={cx('no_video', 'd-flex flex-column')}
                  onClick={handleSelectVideo}
                  none_size
                  transparent
                >
                  <div className={cx('icon_play')}>
                    <FontAwesomeIcon icon={faPlayCircle} />
                    <div className={cx('icon_plus')}>
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </div>
                  <span>
                    <Translate>add_video</Translate>
                  </span>
                </Button>
              </Fragment>
            )}
            <ul className={cx('note')}>
              <li>
                <Translate>pages.seller.add_product.note.video_product_maximum</Translate>
              </li>
              <li>
                <Translate>pages.seller.add_product.note.video_product_length</Translate>
              </li>
              <li>
                <Translate>pages.seller.add_product.note.video_product_format</Translate>
              </li>
              <li>
                <Translate>pages.seller.add_product.note.video_product_note</Translate>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx('product_name', 'd-flex flex-row align-items-center')}>
          <label>
            <Translate>name_product</Translate>
          </label>
          <FormSearch
            name="name_product"
            inputClass={cx('name_product', 'form-control')}
            searchValue={handleSetName}
            useLabel={false}
            placeholder={'placeholder.product_name'}
            useTippy={false}
            useColumn
          >
            <div className={cx('name_lenght')}>{Object.values(product.name).length}/120</div>
          </FormSearch>
        </div>
        <div className={cx('product_name', 'd-flex flex-row align-items-center')}>
          <label>
            <Translate>category</Translate>
          </label>
          <div className={cx('select_category')} onClick={handleToggleCategory}>
            <Translate>placeholder.category</Translate>
            <div className={cx('pick')}>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>
        <div className={cx('product_description', 'd-flex flex-row')}>
          <label>
            <Translate>pages.seller.add_product.product_description.title</Translate>
          </label>
          <div className={cx('content', 'd-flex flex-column')}>
            <FormText
              textClassname={cx('text_content', 'form-control')}
              useLabel={false}
              usePlaceholder={false}
              name="product_description"
              handleSetValue={handleSetProductDescriptions}
              rows={10}
            />
            <div className={cx('pd_description_length')}>{Object.values(product?.product_description).length}/3000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
