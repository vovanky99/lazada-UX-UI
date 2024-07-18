import { Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../Auth.module.scss';
import Button from '~/components/Button';
import { SendEmailResetPasswordSeller } from '~/api/Auth/AuthSeller';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { FormSearch } from '~/layout/Component/FormSearch';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

export default function LinkResetPassword() {
  let navigate = useNavigate();
  const emailRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const [resetSeller, setResetSeller] = useState({
    email: '',
  });

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setResetSeller({
      ...resetSeller,
      [name]: value,
    });
  };

  const validate = () => {
    if (!resetSeller.email.match(/@gmail.com$/g) || !resetSeller.email) {
      emailRef.current.classList.add('border_danger');
    } else {
      emailRef.current.classList.remove('border_danger');
    }
  };
  const handleSendEmail = (e) => {
    e.preventDefault();
    validate();
    if (resetSeller.email.match(/@gmail.com$/g)) {
      SendEmailResetPasswordSeller(resetSeller)
        .then((result) => {})
        .catch((e) => console.log(e));
    }
  };

  /* handle button click reset password */
  useEffect(() => {
    if (resetSeller.email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [resetSeller.email]);

  /* handle redirect home if logined */
  useEffect(() => {
    const token = localStorage.getItem('sellerToken');
    if (token) {
      navigate(config.ShopSeller.Home);
    }
  }, []);

  return (
    <Fragment>
      <div
        id="main"
        className={cx('seller_Link_reset_password', 'd-flex flex-row align-items-center justify-content-center')}
      >
        <div className={cx('seller_Link_reset_password_content', 'd-flex flex-column justify-content-center')}>
          <h3 className="text-center text-capitalize">
            <Translate>reset_password</Translate>
          </h3>
          <form className={cx('seller_reset_form', 'd-flex flex-column')} onSubmit={handleSendEmail} noValidate>
            <FormSearch
              ref={emailRef}
              title="email"
              name="email"
              useLabel={false}
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <div className={cx('text-center')}>
              <Button className={cx('text-capitalize')} primary disabled={disabled}>
                <Translate>send_link</Translate>
              </Button>
            </div>
          </form>
          <div className={cx('seller_back_login', 'text-center text-capitalize')}>
            <Translate>link_reset_note</Translate>
            <Button to={config.ShopSeller.SignIn} transparent>
              <strong>
                <Translate>sign_in</Translate>
              </strong>
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
