import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Images from '~/components/Images';
import Button from '~/components/Button';
import Tippy from '@tippyjs/react/headless';
import axios from '~/api/axios';
import CldUploadImg from '~/service/cloudinary/CldUploadImg';

const cx = classNames.bind(styles);

export default function Profile() {
  const formRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const avatarRef = useRef();
  const addressRef = useRef();
  const Admin = useSelector((state) => state.Auth.admin);
  const [name, setName] = useState(Admin.name);
  const [avatar, setAvatar] = useState(Admin.avatar);
  const [upload, setUpload] = useState('');
  const [changeAvatar, setChangeAvatar] = useState(null);
  const [phone, setPhone] = useState(Admin.phone_number);
  const [address, setAddress] = useState('');
  const [nameValid, setNameValid] = useState('');
  const [phoneValid, setPhoneValid] = useState('');
  const [addressValid, setAddressValid] = useState('');

  // handle upload image
  const uploadImage = (img) => {
    let image = new FormData();
    image.append('file', img);
    const result = CldUploadImg(image);
    result.then((result) => {
      setUpload(result);
    });
  };

  /* handle onsubmit form */
  const handleSubmitProfile = (e) => {
    e.preventDefault();

    // handle upadte admin
    const updateAdmin = async () => {
      let data = new FormData();
      data.append('avatar', upload.url);
      data.append('name', name);
      data.append('phone', phone);
      data.append('address', address);
      try {
        await axios.post('/api/admin/update', data);
      } catch (e) {
        console.log(e);
      }
    };

    if (name !== '' && phone !== '' && address !== '' && nameValid === '' && phoneValid === '' && addressValid === '') {
      updateAdmin();
    }
  };

  /* handle avatar change value */
  useEffect(() => {
    const a = avatarRef.current;
    const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      const render = new FileReader();
      render.onload = (e) => {
        setAvatar(render.result);
        uploadImage(file);
      };
      if (file) {
        render.readAsDataURL(file);
        setChangeAvatar(file);
      }
    };
    if (a) {
      a.addEventListener('change', handleAvatarChange);
    }
    return () => {
      if (a) {
        a.removeEventListener('change', handleAvatarChange);
      }
    };
  }, [changeAvatar]);

  /* handle name value */
  useEffect(() => {
    const n = nameRef.current;
    const handleKeyUp = (e) => {
      if (e.target.value === '') {
        setNameValid(`name don't empty`);
      } else if (nameValid !== '') {
        setNameValid('');
      }
    };
    if (n) {
      n.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      if (n) {
        n.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, [name]);

  /* handle phone value */
  useEffect(() => {
    const p = phoneRef.current;
    const handleKeyUp = (e) => {
      if (e.target.value === '') {
        setPhoneValid(`phone don't empty`);
      } else if (phoneValid !== '') {
        setPhoneValid('');
      }
    };
    if (p) {
      p.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      if (p) {
        p.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, [phone]);

  /* handle address value */
  useEffect(() => {
    const a = addressRef.current;
    const handleKeyUp = (e) => {
      if (e.target.value === '') {
        setAddressValid(`address don't empty`);
      } else if (addressValid !== '') {
        setAddressValid('');
      }
    };
    if (a) {
      a.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      if (a) {
        a.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, [address]);

  /* handle avatar value */
  useEffect(() => {
    const a = document.querySelectorAll('.change-avatar');
    const inputFile = avatarRef.current;
    const handleClick = (e) => {
      inputFile.click();
    };
    if (a) {
      a.forEach((e) => e.addEventListener('click', handleClick));
    }
    return () => {
      if (a) {
        a.forEach((e) => e.removeEventListener('click', handleClick));
      }
    };
  }, [avatar]);
  return (
    <>
      <section className={cx('main_profile')}>
        <form
          onSubmit={handleSubmitProfile}
          noValidate
          className={cx('form-profile', 'd-flex flex-row flex-wrap')}
          encType="multipart/form-data"
        >
          <div
            className={cx(
              'avatar',
              'form-group col-12 d-flex justify-content-center align-items-center mb-5 flex-column',
            )}
          >
            <Button className={cx('avatar_container', 'change-avatar')} type="button" transparent>
              <Images src={`${avatar}`} alt={avatar} />
            </Button>
            <input
              ref={avatarRef}
              type="file"
              name="avatar[]"
              value={''}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <Button type="button" className={cx('avatar_btn-change', 'change-avatar')} gradient_primary>
              Change Avatar
            </Button>
          </div>
          <div className={cx('form-group col-6 px-3 mb-3')}>
            <label className="form-label text-capitalize">name:</label>
            <input
              ref={nameRef}
              name="name"
              value={name}
              type="text"
              className="form-control py-2"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {nameValid ? (
              <div className={cx('message-valid', 'text-danger text-capitalize ps-3')}>{nameValid}</div>
            ) : (
              ''
            )}
          </div>
          <div className={cx('form-group col-6 px-3 mb-3')}>
            <label className="form-label text-capitalize">phone:</label>
            <input
              ref={phoneRef}
              name="phone"
              value={phone}
              type="number"
              className="form-control  py-2 mb-3"
              onChange={(e) => {
                // if (e.target.value != '') {
                setPhone(e.target.value);
                // } else {
                //   setPhone('');
                // }
              }}
            />
            {phoneValid ? (
              <div className={cx('message-valid', 'text-danger text-capitalize ps-3')}>{phoneValid}</div>
            ) : (
              ''
            )}
          </div>
          {/* <div className={cx('ward', 'form-group col-6 px-3 mb-3')}>
            <Tippy
              interactive
              visible
              render={(attrs) => (
                <div className={cx('ward_option')} {...attrs}>
                  <div></div>
                </div>
              )}
            >
              <input type="text" data-value="" value="" className={cx('form-control py-2')} />
            </Tippy>
          </div> */}
          <div className={cx('form-group col-6 px-3 mb-3')}>
            <label className="form-label text-capitalize">address:</label>
            <textarea
              ref={addressRef}
              name="address"
              value={address}
              className="form-control py-2"
              rows={5}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            {addressValid ? (
              <div className={cx('message-valid', 'text-danger ps-3 text-capitalize')}>{addressValid}</div>
            ) : (
              ''
            )}
          </div>
          <div className={cx('form-group col-12 d-flex justify-content-end')}>
            <Button type="submit" gradient_primary>
              Save
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
