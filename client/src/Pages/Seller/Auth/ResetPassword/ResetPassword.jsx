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

const cx = classNames.bind(styles);

export default function ResetPassword() {
  let navigate = useNavigate();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [searchParam] = useSearchParams();
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [disabled, setDisabled] = useState(true);
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

  const validate = (field = resetSeller) => {
    let errorMessage = { ...valid };
    if ('password' in field) {
      errorMessage.password = field.password
        ? 'please enter password!'
        : field.password.length < 8
        ? "password can't short 8 character"
        : '';
    }
    if ('password_confirmation' in field) {
      errorMessage.password_confirmation = field.password_confirmation
        ? 'please enter password confirm!'
        : field.password_confirmation !== field.password
        ? "password confirm don't correct with password!"
        : '';
    }
  };
  const handleSendEmail = (e) => {
    e.preventDefault();
    validate();
    if (
      resetSeller.password &&
      resetSeller.password_confirmation &&
      resetSeller.email &&
      resetSeller.token &&
      !valid?.password &&
      !valid?.password_confirmation
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
    <Fragment>
      <div id="main" className={cx('seller_reset_email', 'd-flex flex-row align-items-center justify-content-center')}>
        <div className={cx('seller_reset_email_content', 'd-flex flex-column justify-content-center')}>
          <h3 className="text-center text-capitalize">Reset Password</h3>
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
                  title="password confirm"
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
                reset password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
