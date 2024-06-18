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

const cx = classNames.bind(styles);

export default function SignIn() {
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(null);
  const [seller, setSeller] = useState({
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
  const handleLogin = (e) => {
    e.preventDefault();
    validate();
    if (seller.email && seller.password && !valid?.email && !valid?.password) {
      LoginSeller(seller)
        .then((result) => {
          if (result.token) {
            Store.dispatch(setSession(result.token, 'sellerToken'));
            navigate(config.ShopSeller.Home);
          } else {
          }
        })
        .catch((e) => console.log(e));
    }
  };
  useEffect(() => {
    if (seller.email && seller.password) {
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
    <div id="main" className={cx('seller_register', 'd-flex justify-content-center align-items-center')}>
      <div className={cx('seller_register_container', 'd-flex flex-column')}>
        <h3 className="text-capitalize text-center">Sign In</h3>
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
            <MessageText className={cx('message', 'text-capitalize text-danger')} message={valid?.password} />
          </div>
          <div className={cx('btn_register')}>
            <Button type="submit" disabled={disabled}>
              Sign In
            </Button>
          </div>
          <div className={cx('text-center')}>
            New to Shopee?
            <Button transparent to={config.ShopSeller.SignUp}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
