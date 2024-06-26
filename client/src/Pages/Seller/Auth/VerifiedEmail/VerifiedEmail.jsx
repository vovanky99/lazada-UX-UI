import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../Auth.module.scss';
import Button from '~/components/Button';
import { ResendEmailSeller } from '~/api/Auth/AuthSeller';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import Seller from '~/layout/Component/Seller';

const cx = classNames.bind(styles);

export default function VerifiedEmail() {
  let navigate = useNavigate();
  const seller = useSelector((state) => state.Auth.seller);

  /* handle resend email */
  const handleResendEmail = (e) => {
    e.preventDefault();
    ResendEmailSeller()
      .then((result) => {})
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const checkEmailVerified = () => {
      if (seller?.email_verified_at) {
        navigate(`${config.ShopSeller.Home}`);
      }
    };
    checkEmailVerified();
  }, [seller]);

  return (
    <Seller>
      <div
        id="main"
        className={cx('seller_verified_email', 'd-flex flex-row align-items-center justify-content-center')}
      >
        <div className={cx('seller_verified_email_content', 'd-flex flex-column justify-content-center')}>
          <h3 className="text-center text-capitalize">Verify Email</h3>
          <div className={cx('seller_notification', 'text-center')}>
            A fresh verification link has been sent to your email address.
            <br /> Before proceeding, please check your email for a verification link.
            <br />
            <strong>If you did not receive the email</strong>
          </div>
          <div className={cx('seller_resend_mail', 'd-flex flex-column text-center')}>
            <form onSubmit={handleResendEmail} noValidate>
              <Button type="submit" primary>
                Resend Email
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Seller>
  );
}
