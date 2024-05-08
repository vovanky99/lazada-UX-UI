import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const cx = classNames.bind(styles);

export default function Profile() {
  const Admin = useSelector((state) => state.Auth.admin);
  const [avatar, setAvatar] = useState(Admin.avatar);
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [Phone, setPhone] = useState(Admin.phone_number);
  const [address, setAddress] = useState(Admin.avatar);
  return (
    <>
      <section className={cx('main_profile')}>
        <form noValidate></form>
      </section>
    </>
  );
}
