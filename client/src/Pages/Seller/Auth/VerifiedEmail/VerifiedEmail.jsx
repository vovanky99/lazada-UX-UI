import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../Auth.module.scss';
import Button from '~/components/Button';
import { ResendEmailSeller } from '~/api/Auth/AuthSeller';
import Seller from '~/layout/Component/Seller';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

export default function VerifiedEmail() {
  /* handle resend email */
  const handleResendEmail = (e) => {
    e.preventDefault();
    ResendEmailSeller()
      .then((result) => {})
      .catch((e) => console.log(e));
  };

  return (
    <Seller>
      <div
        id="main"
        className={cx('seller_verified_email', 'd-flex flex-row align-items-center justify-content-center')}
      >
        <div className={cx('seller_verified_email_content', 'd-flex flex-column justify-content-center')}>
          <h3 className="text-center text-capitalize">
            <Translate>verify_email</Translate>
          </h3>
          <div className={cx('seller_notification', 'text-center')}>
            <Translate>verify_notification.one_line</Translate>
            <br /> <Translate>verify_notification.two_line</Translate>
            <br />
            <strong>
              <Translate>verify_notification.three_line</Translate>
            </strong>
          </div>
          <div className={cx('seller_resend_mail', 'd-flex flex-column text-center')}>
            <form onSubmit={handleResendEmail} noValidate>
              <Button type="submit" primary>
                <Translate>resend_email</Translate>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Seller>
  );
}
