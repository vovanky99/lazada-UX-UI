import { useEffect, useRef, useState } from 'react';
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

const cx = classNames.bind(styles);

export default function Register() {
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [areaCode, setAreaCode] = useState(84);
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(null);
  const [seller, setSeller] = useState({
    email: '',
    password: '',
    phone_number: '',
  });

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

  const validate = (field = seller) => {
    let errorMessage = { ...valid };
    if ('email' in field) {
      errorMessage.email = !field.email
        ? 'please enter email!'
        : !field.email.match(/@gmail.com/g)
        ? 'email must be @gmail.com!'
        : '';
      if (errorMessage.email !== '') {
        emailRef.current.classList.add('border_danger');
      } else {
        emailRef.current.classList.remove('border_danger');
      }
    }
    if ('password' in field) {
      errorMessage.password = !field.password
        ? 'please enter password!'
        : field.password.length > 7
        ? ''
        : `password can't short 7 character!`;
      if (errorMessage.password !== '') {
        passwordRef.current.classList.add('border_danger');
      } else {
        passwordRef.current.classList.remove('border_danger');
      }
    }
    let areaCodeRegex = new RegExp(`\\+${areaCode}\\d+`, 'g');
    if ('phone_number' in field) {
      errorMessage.phone_number = !field.phone_number
        ? 'please enter phone!'
        : field.phone_number.match(areaCodeRegex) &&
          !field.phone_number.match(/[a-zA-Z$]/g) &&
          field.phone_number.length === 12
        ? ''
        : 'phone number invalid!';
      if (errorMessage.phone_number !== '') {
        phoneRef.current.classList.add('border_danger');
      } else {
        phoneRef.current.classList.remove('border_danger');
      }
    }
    setValid({ ...errorMessage });
    if (field === valid) {
      Object.values(errorMessage).every((x) => x === '');
    }
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setSeller({
      ...seller,
      [name]: value,
    });
  };
  const handleSetPhone = (value) => {
    setSeller({
      ...seller,
      phone_number: value,
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    validate();
    if (
      seller.email &&
      seller.password &&
      seller.phone_number &&
      !valid?.email  &&
      !valid?.password &&
      !valid?.phone_number 
    ) {
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

  /* handle get area code */
  useEffect(() => {
    const GetAreaCode = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          Nominatim(position.coords.latitude, position.coords.longitude)
            .then((result) => {
              GetLocation('country', result.address.country)
                .then((result) => {
                  setAreaCode(result[0].international_codes);
                })
                .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
        });
      }
    };
    GetAreaCode();
  }, []);
  useEffect(() => {
    if (seller.email && seller.password && seller.phone_number) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [seller]);
  return (
    <div id="main" className={cx('seller_register', 'd-flex justify-content-center align-items-center')}>
      <div className={cx('seller_register_container', 'd-flex flex-column')}>
        <h3 className="text-capitalize text-center">Register</h3>
        <form className={cx('form_register', 'd-flex flex-column')} onSubmit={handleRegister} noValidate>
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
              title="phone number"
              name="phone_number"
              areaCode={areaCode}
              value={seller.phone_number}
              useTippy={false}
              searchValue={handleSetPhone}
            />
            <MessageText className={cx('text-capitalize text-danger')} message={valid?.phone_number} />
          </div>
          <div className={cx('btn_register')}>
            <Button type="submit" disabled={disabled}>
              Register
            </Button>
          </div>
          <div className={cx('text-center')}>
            New to Shopee?
            <Button transparent to={config.ShopSeller.SignIn}>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
