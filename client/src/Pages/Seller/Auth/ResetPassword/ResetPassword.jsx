import { Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../Auth.module.scss';
import Button from '~/components/Button';
import { ResetPasswordSeller } from '~/api/Auth/AuthSeller';
import { useNavigate, useSearchParams } from 'react-router-dom';
import config from '~/config';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import MessageText from '~/layout/Component/Message/MessageText';
import Translate from '~/layout/Component/Translate';
import Country from '~/layout/Component/Country';

const cx = classNames.bind(styles);

export default function ResetPassword() {
  let navigate = useNavigate();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [searchParam] = useSearchParams();
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const validMessage = {
    password: Translate({ children: 'valid.password' }),
    password_length: Translate({ children: 'valid.password_length' }),
    password_confirm: Translate({ children: 'valid.password_confirm' }),
    password_confirm_length: Translate({ children: 'valid.password_confirm_length' }),
  };
  const [valid, setValid] = useState({});
  const [resetSeller, setResetSeller] = useState({
    email: searchParam.get('email'),
    password: '',
    password_confirmation: '',
    token: searchParam.get('token'),
  });
  /*handle show hide password */
  const handleShowHidePass = () => {
    if (showPass) {
      setShowPass(false);
      passwordRef.current.type = 'password';
    } else {
      setShowPass(true);
      passwordRef.current.type = 'text';
    }
  };
  const handleShowHidePassConfirm = () => {
    if (showPassConfirm) {
      setShowPassConfirm(false);
      passwordConfirmRef.current.type = 'password';
    } else {
      setShowPassConfirm(true);
      passwordConfirmRef.current.type = 'text';
    }
  };
  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setResetSeller({
      ...resetSeller,
      [name]: value,
    });
  };

  const validate = async (field = resetSeller) => {
    let errorMessage = { ...valid };
    if ('password' in field) {
      errorMessage.password = field.password
        ? validMessage.password
        : field.password.length < 8
        ? validMessage.password_length
        : '';
    }
    if ('password_confirmation' in field) {
      errorMessage.password_confirmation = field.password_confirmation
        ? validMessage.password_confirm
        : field.password_confirmation !== field.password
        ? validMessage.password_confirm_length
        : '';
    }
    if (field === resetSeller) {
      Object.entries(errorMessage).map(([key, value]) => {
        if (value === '') {
          delete errorMessage[key];
        }
      });
    }
    setValid({ ...errorMessage });
    return errorMessage;
  };
  const handleSendEmail = async (e) => {
    e.preventDefault();
    const val = await validate();
    if (
      resetSeller.password &&
      resetSeller.password_confirmation &&
      resetSeller.email &&
      resetSeller.token &&
      Object.keys(val).length === 0
    ) {
      ResetPasswordSeller(resetSeller)
        .then((result) => {})
        .catch((e) => console.log(e));
    }
  };

  /* handle button click reset password */
  useEffect(() => {
    if (resetSeller.password && resetSeller.password_confirmation) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [resetSeller.password, resetSeller.password_confirmation]);

  /* handle redirect home if logined */
  useEffect(() => {
    const token = localStorage.getItem('sellerToken');
    if (token) {
      navigate(config.ShopSeller.Home);
    }
  }, []);

  return (
    <Country>
      <div id="main" className={cx('seller_reset_email', 'd-flex flex-row align-items-center justify-content-center')}>
        <div className={cx('seller_reset_email_content', 'd-flex flex-column justify-content-center')}>
          <h3 className="text-center text-capitalize">
            <Translate>reset_password</Translate>
          </h3>
          <form className={cx('seller_reset_form', 'd-flex flex-column')} onSubmit={handleSendEmail} noValidate>
            <div className={cx('seller_input_group', 'd-flex flex-column')}>
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
                <MessageText className={cx('message', 'text-capitalize text-danger')} message={valid?.password} />
              </div>
              <div className={cx('password')}>
                <FormSearch
                  ref={passwordConfirmRef}
                  title="password_confirm"
                  name="password_confirmation"
                  inputType="password"
                  useTippy={false}
                  handleOnchange={handleOnchange}
                >
                  <div className={cx('show-hide-password')}>
                    {showPassConfirm ? (
                      <FontAwesomeIcon className="show-hide" icon={faEye} onClick={handleShowHidePassConfirm} />
                    ) : (
                      <FontAwesomeIcon className="show-hide" icon={faEyeSlash} onClick={handleShowHidePassConfirm} />
                    )}
                  </div>
                </FormSearch>
                <MessageText
                  className={cx('message', 'text-capitalize text-danger')}
                  message={valid?.password_confirmation}
                />
              </div>
            </div>
            <div className={cx('text-center')}>
              <Button className={cx('text-capitalize')} primary disabled={disabled}>
                <Translate>reset_password</Translate>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Country>
  );
}
