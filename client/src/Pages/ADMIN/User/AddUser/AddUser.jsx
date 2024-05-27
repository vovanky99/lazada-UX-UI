import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import styles from '../User.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';

const cx = classNames.bind(styles);

export default function AddUser() {
  const nameRef = useRef();
  const wardRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const genderRef = useRef();
  const birthdayRef = useRef();
  const addressRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');

  return (
    <>
      <WrapperMain title="Add User">
        <div className={cx('filter_data')}></div>
      </WrapperMain>
    </>
  );
}
