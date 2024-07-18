import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from '../Auth.module.scss';
import { FormSearch } from '~/layout/Component/FormSearch';
import Button from '~/components/Button';
import config from '~/config';
import MessageText from '~/layout/Component/Message/MessageText';
import { LoginSeller } from '~/api/Auth/AuthSeller';
import { setSession } from '~/redux/Actions/Auth';
import { useNavigate } from 'react-router-dom';
import Store from '~/redux/Store';
import { useImmer } from 'use-immer';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import Country from '~/layout/Component/Country';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useImmer({});
  const [seller, setSeller] = useImmer({
    email: '',
    password: '',
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

  const validate = async (field = seller) => {
    let errorMessage = { ...valid };
    if ('email' in field) {
      errorMessage.email = !field.email
        ? 'please enter email!'
        : !field.email.match(/@gmail.com$/g)
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
        : field.password.length >= 7
        ? ''
        : `password can't short 7 character!`;
      if (errorMessage.password !== '') {
        passwordRef.current.classList.add('border_danger');
      } else {
        passwordRef.current.classList.remove('border_danger');
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
    setSeller({
      ...seller,
      [name]: value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const val = await validate();
    setValid((draft) => {
      delete draft['loginError'];
    });
    if (Object.keys(val).length === 0) {
      LoginSeller(seller)
        .then((result) => {
          if (result.token) {
            Store.dispatch(setSession(result.token, 'sellerToken'));
            navigate(config.ShopSeller.Home);
          } else {
            setValid((draft) => {
              draft['loginError'] = Translate({ children: 'valid.login_error' });
            });
          }
        })
        .catch((e) => console.log(e));
    } else {
    }
  };
  useEffect(() => {
    if (seller.email && seller.password.length >= 7) {
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
            <Translate>sign_in</Translate>
          </h3>
          <form className={cx('form_register', 'd-flex flex-column')} onSubmit={handleLogin} noValidate>
            <div className={cx('email')}>
              <FormSearch ref={emailRef} title="email" name="email" useTippy={false} handleOnchange={handleOnchange} />
              <MessageText className={cx('message', 'text-capitalize text-danger')} message={valid?.email} />
            </div>
            <div className={cx('password')}>
              <FormSearch
                ref={passwordRef}
                title="password"
                name="password"
                inputType="password"
                useTippy={false}
                handleOnchange={handleOnchange}
                useForgetPassword={true}
                forgetLink={config.ShopSeller.LinkResetPass}
              >
                <div className={cx('show-hide-password')}>
                  {showPass ? (
                    <FontAwesomeIcon className="show-hide" icon={faEye} onClick={handleShowHidePass} />
                  ) : (
                    <FontAwesomeIcon className="show-hide" icon={faEyeSlash} onClick={handleShowHidePass} />
                  )}
                </div>
              </FormSearch>
              <MessageText className={cx('message', 'text-capitalize  text-danger')} message={valid?.password} />
            </div>
            <MessageText
              message={valid?.loginError}
              className={cx('message_login', 'text-capitalize text-danger text-center')}
            />
            <div className={cx('btn_register')}>
              <Button type="submit" disabled={disabled}>
                Sign In
              </Button>
            </div>
            <div className={cx('text-center')}>
              <Translate>sign_in_note</Translate>
              <Button transparent to={config.ShopSeller.SignUp} className={cx('text-capitalize')}>
                <Translate>register</Translate>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Country>
  );
}
