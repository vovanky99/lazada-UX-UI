import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Images from '~/components/Images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export default function Profile() {
  const nameRef = useRef();
  const phoneRef = useRef();
  const avatarRef = useRef();
  const addressRef = useRef();
  const Admin = useSelector((state) => state.Auth.admin);
  const [name, setName] = useState(Admin.name);
  const [avatar, setAvatar] = useState(Admin.avatar);
  const [phone, setPhone] = useState(Admin.phone_number);
  const [address, setAddress] = useState(Admin.avatar);
  const [nameValid, setNameValid] = useState('');
  const [avatarValid, setAvatarValid] = useState('');
  const [phoneValid, setPhoneValid] = useState('');
  const [addressValid, setAddressValid] = useState('');

  /* handle onsubmit form */

  const handleSubmitProfile = (e) => {
    e.preventDefault();
  };

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

  /* handle phone value */
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
  console.log(Admin);
  return (
    <>
      <section className={cx('main_profile')}>
        <form onSubmit={handleSubmitProfile} noValidate className={cx('form-profile', 'd-flex flex-row flex-wrap')}>
          <div className={cx('avatar', 'form-group col-12 d-flex justify-content-center align-items-center mb-5')}>
            <Button className={cx('avatar')} type="button" transparent>
              <Images src={`${avatar}`} alt={avatar} />
            </Button>
            <input type="file" name="avatar" />
            <Button>change avatar</Button>
          </div>
          <div className={cx('form-group col-6 px-3')}>
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
            {nameValid ? <div className={cx('message-valid', 'text-danger')}>{nameValid}</div> : ''}
          </div>
          <div className={cx('form-group col-6 px-3')}>
            <label className="form-label text-capitalize">phone:</label>
            <input
              ref={phoneRef}
              name="phone"
              value={phone}
              type="tel"
              className="form-control py-2"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            {phoneValid ? <div className={cx('message-valid', 'text-danger')}>{phoneValid}</div> : ''}
          </div>
          <div className={cx('form-group col-6 px-3')}>
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
            {addressValid ? <div className={cx('message-valid', 'text-danger')}>{addressValid}</div> : ''}
          </div>
        </form>
      </section>
    </>
  );
}
