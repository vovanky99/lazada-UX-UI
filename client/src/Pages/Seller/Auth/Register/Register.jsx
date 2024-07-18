import { Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from '../Auth.module.scss';
import { FormSearch } from '~/layout/Component/FormSearch';
import Button from '~/components/Button';
import config from '~/config';
import MessageText from '~/layout/Component/Message/MessageText';
import { RegisterSeller, VeryfiedEmail } from '~/api/Auth/AuthSeller';
import { setSession } from '~/redux/Actions/Auth';
import { useNavigate } from 'react-router-dom';
import Nominatim from '~/services/Nominatim';
import GetLocation from '~/api/Location/GetLocation';
import Store from '~/redux/Store';
import { useSelector } from 'react-redux';
import Country from '~/layout/Component/Country';
import Translate from '~/layout/Component/Translate';
import { useImmer } from 'use-immer';

const cx = classNames.bind(styles);

export default function Register() {
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const fullnameRef = useRef();
  const navigate = useNavigate();
  const { country } = useSelector((state) => state.Auth);
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const validMessage = {
    email_empty: Translate({ children: 'valid.email_empty' }),
    email_not_valid: Translate({ children: 'valid.email_not_valid' }),
    password_empty: Translate({ children: 'valid.password' }),
    password_length: Translate({ children: 'valid.password_length' }),
    phone_empty: Translate({ children: 'valid.phone_empty' }),
    phone_not_valid: Translate({ children: 'valid.phone_not_valid' }),
    fullname_empty: Translate({ children: 'valid.fullname' }),
  };
  const [valid, setValid] = useState({});
  const [seller, setSeller] = useImmer({
    email: '',
    password: '',
    phone_number: '',
    fullname: '',
  });

  const areaCodeRegex = new RegExp(`\\+${country?.international_codes}\\d+`, 'g');

  /* handle show hide pass */
  const handleShowHidePass = () => {
    const passType = passwordRef.current;
    if (showPass) {
      passType.type = 'password';
      setShowPass(false);
    } else {
      setShowPass(true);
      passType.type = 'text';
    }
  };

  const validate = async (field = seller) => {
    let errorMessage = { ...valid };
    if ('email' in field) {
      errorMessage.email = !field.email
        ? validMessage.email_empty
        : !field.email.match(/@gmail.com$/g)
        ? validMessage.email_not_valid
        : '';
      if (errorMessage.email !== '') {
        emailRef.current.classList.add('border_danger');
      } else {
        emailRef.current.classList.remove('border_danger');
      }
    }
    if ('password' in field) {
      errorMessage.password = !field.password
        ? validMessage.password_empty
        : field.password.length >= 7
        ? ''
        : validMessage.password_length;
      if (errorMessage.password !== '') {
        passwordRef.current.classList.add('border_danger');
      } else {
        passwordRef.current.classList.remove('border_danger');
      }
    }
    if ('phone_number' in field) {
      errorMessage.phone_number = !field.phone_number
        ? validMessage.phone_empty
        : field.phone_number.match(areaCodeRegex) &&
          !field.phone_number.match(/[a-zA-Z$]/g) &&
          field.phone_number.length === 12
        ? ''
        : validMessage.phone_not_valid;
      if (errorMessage.phone_number !== '') {
        phoneRef.current.classList.add('border_danger');
      } else {
        phoneRef.current.classList.remove('border_danger');
      }
    }
    if ('fullname' in field) {
      errorMessage.fullname = !field.fullname ? validMessage.fullname_empty : '';
      if (errorMessage.fullname !== '') {
        fullnameRef.current.classList.add('border_danger');
      } else {
        fullnameRef.current.classList.remove('border_danger');
      }
    }
    if (field === seller) {
      Object.entries(errorMessage).map(([key, value]) => {
        if (value === '') {
          delete errorMessage[key];
        }
      });
    }
    setValid({ ...errorMessage });
    return errorMessage;
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setSeller((draft) => {
      draft[name] = value;
    });
  };
  const handleSetPhone = (value) => {
    setSeller((draft) => {
      draft.phone_number = value;
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const val = await validate();
    if (Object.keys(val).length === 0) {
      RegisterSeller(seller)
        .then((result) => {
          if (result.token) {
            Store.dispatch(setSession(result.token, 'sellerToken'));
            navigate(config.ShopSeller.VerifiedEmail);
          } else {
          }
        })
        .catch((e) => console.log(e));
    }
  };

  /* disable button login when email, passowrd, phone_number, fullname is empty */
  useEffect(() => {
    if (seller.email && seller.password && seller.phone_number && seller.fullname) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [seller]);

  /*check login */
  useEffect(() => {
    const token = localStorage.getItem('sellerToken');
    if (token) {
      navigate(config.ShopSeller.Home);
    }
  }, []);
  return (
    <Country>
      <div id="main" className={cx('seller_register', 'd-flex justify-content-center align-items-center')}>
        <div className={cx('seller_register_container', 'd-flex flex-column')}>
          <h3 className="text-capitalize text-center">
            <strong>
              <Translate>register</Translate>
            </strong>
          </h3>
          <form className={cx('form_register', 'd-flex flex-column')} onSubmit={handleRegister} noValidate>
            <div className={cx('fullname')}>
              <FormSearch
                ref={fullnameRef}
                title="full_name"
                name="fullname"
                useTippy={false}
                handleOnchange={handleOnchange}
              />
              <MessageText className={cx('text-capitalize text-danger')} message={valid?.email} />
            </div>
            <div className={cx('email')}>
              <FormSearch ref={emailRef} title="email" name="email" useTippy={false} handleOnchange={handleOnchange} />
              <MessageText className={cx('text-capitalize text-danger')} message={valid?.email} />
            </div>
            <div className={cx('password')}>
              <FormSearch
                ref={passwordRef}
                title="password"
                name="password"
                inputType="password"
                useTippy={false}
                handleOnchange={handleOnchange}
              >
                <div className={cx('show-hide-password')}>
                  {showPass ? (
                    <FontAwesomeIcon className="show-hide" icon={faEye} onClick={handleShowHidePass} />
                  ) : (
                    <FontAwesomeIcon className="show-hide" icon={faEyeSlash} onClick={handleShowHidePass} />
                  )}
                </div>
              </FormSearch>
              <MessageText className={cx('text-capitalize text-danger')} message={valid?.password} />
            </div>
            <div className={cx('phone_number')}>
              <FormSearch
                ref={phoneRef}
                title="phone_number"
                name="phone_number"
                areaCode={country?.international_codes}
                value={seller.phone_number}
                useTippy={false}
                searchValue={handleSetPhone}
              />
              <MessageText className={cx('text-capitalize text-danger')} message={valid?.phone_number} />
            </div>
            <div className={cx('btn_register')}>
              <Button type="submit" disabled={disabled}>
                <Translate>register</Translate>
              </Button>
            </div>
            <div className={cx('btn_register_sub', 'text-center')}>
              <Translate>register_note</Translate>
              <Button transparent to={config.ShopSeller.SignIn}>
                <Translate>sign_in</Translate>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Country>
  );
}
