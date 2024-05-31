import classNames from 'classnames/bind';
import styles from '~/layout/Component/FormGroup/FormGroup.module.scss';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';
import Images from '~/components/Images';
import CldUploadImg from '~/services/cloudinary/CldUploadImg';

const cx = classNames.bind(styles);

export default function FormImage({
  name,
  title,
  className,
  useButton = true,
  data,
  handleOnchange = () => {},
  handleSetValue = () => {},
  accept = 'image/*',
}) {
  const avatarRef = useRef();
  const [avatar, setAvatar] = useState(data || '');

  useEffect(() => {
    handleSetValue(avatar);
  }, [avatar]);
  const UploadCldImg = (img) => {
    const image = new FormData();
    image.append('file', img);
    CldUploadImg(image)
      .then((result) => setAvatar(result.url))
      .catch((e) => console.log(e));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const render = new FileReader();
    render.onload = (e) => {
      UploadCldImg(file);
    };
    if (file) {
      render.readAsDataURL(file);
    }
  };

  const handleBTNChangeAvatar = (e) => {
    if (avatarRef) {
      avatarRef.current.click();
    }
  };
  return (
    <>
      <div
        className={cx(
          'form_image',
          className || ' form-group col-12 d-flex justify-content-center align-items-center mb-5 flex-column',
        )}
      >
        <Button onClick={handleBTNChangeAvatar} className={cx('form_image_container')} type="button" transparent>
          <Images src={`${avatar}`} alt={avatar} />
        </Button>
        <input
          ref={avatarRef}
          type="file"
          name={name}
          value={''}
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        {useButton ? (
          <Button
            onClick={handleBTNChangeAvatar}
            type="button"
            className={cx('form_image_btn-change')}
            gradient_primary
          >
            {title}
          </Button>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
