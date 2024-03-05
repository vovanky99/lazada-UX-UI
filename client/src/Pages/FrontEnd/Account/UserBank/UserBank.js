import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

import style from './UserBank.module.scss';
import Button from '~/components/Button';
import Account from '../Account';
import { useEffect, useState } from 'react';
import { faCcJcb, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(style);

export default function UserBank() {
  const [bankAccount, setBankAccount] = useState(false);
  const [creditCard, setCreditCard] = useState(false);

  //handle show hide scrollbal body
  const showHideScroll = (parameter) => {
    let body = document.querySelector('body');
    if (parameter) {
      body.style['overflowY'] = 'hidden';
    } else {
      body.style['overflowY'] = 'scroll';
    }
  };

  showHideScroll(bankAccount || creditCard);

  //handle then label click will focus input
  useEffect(() => {
    let label = document.querySelectorAll('.form-group label');
    const handleClick = (e) => {
      console.log(label);
    };
    label.forEach((e) => e.addEventListener('click', handleClick));
    return () => {
      if (label) {
        label.forEach((e) => e.removeEventListener('click', handleClick));
      }
    };
  }, []);

  //hanlde credit card
  const handleShowAddCreditCard = (e) => {
    setCreditCard(true);
  };
  const handleSubmitAddCreditCard = (e) => {
    e.preventDefault();
  };
  const handleCancelCreditCard = (e) => {
    setCreditCard(false);
  };

  //hanlde bank account
  const handleShowAddBankAccount = (e) => {
    setBankAccount(true);
  };
  const handleSubmitAddBank = (e) => {
    e.preventDefault();
  };
  const handleCancelBankAccount = (e) => {
    setBankAccount(false);
  };
  return (
    <Account>
      <div className={cx('wrapper', 'd-flex flex-column')}>
        <div className={cx('credit-card', 'd-flex flex-column')}>
          <div className={cx('creadit-card_header', 'd-flex flex-row justify-content-between')}>
            <div className={cx('creadit-card_header_title')}>Credit / Debit Card</div>
            <Button onClick={handleShowAddCreditCard} className={cx('creadit-card_header_button', 'text-capitalize')}>
              <FontAwesomeIcon icon={faPlus} /> Add New Card
            </Button>
          </div>
          <div className={cx('creadit-card_footer')}>You don't have cards yet.</div>
          {creditCard ? (
            <div className={cx('creadit-card_add', 'd-flex justify-content-center align-items-center')}>
              <div className={cx('creadit-card_add_wrapper')}>
                <h4 className={cx('creadit-card_add_title', 'mb-4')}>Add Card</h4>
                <form onSubmit={handleShowAddCreditCard}>
                  <div className="d-flex gap-3 flex-column mb-4">
                    <div className={cx('creadit-card_add_protected', 'd-flex flex-row gap-3')}>
                      <FontAwesomeIcon icon={faShieldHalved} />
                      <div className={cx('creadit-card_add_protected-title', 'd-flex flex-column')}>
                        <h5>Your card details are protected.</h5>
                        <p>
                          We partner with CyberSource, a VISA company to ensure that your card details are kept safe and
                          secure. Shopee will not have access to your card info.
                        </p>
                      </div>
                    </div>
                    <div
                      className={cx(
                        'creadit-card_add_group-title',
                        'd-flex justify-content-between align-items-center form-group',
                      )}
                    >
                      <span>Card Details</span>
                      <div className={cx('card-logo', 'd-flex  gap-2')}>
                        <FontAwesomeIcon icon={faCcVisa} />
                        <FontAwesomeIcon icon={faCcMastercard} />
                        <FontAwesomeIcon icon={faCcJcb} />
                      </div>
                    </div>
                    <div className={cx('creadit-card_add_number', 'form-group')}>
                      <input name="card-number" className={cx('input', 'form-control p-3')} />
                      <label className="text-capitalize">card number</label>
                    </div>
                    <div className={cx('creadit-card_add_group', 'form-group d-flex gap-4')}>
                      <div className={cx('form-group col-7')}>
                        <input
                          autoComplete="off"
                          inputMode="numeric"
                          type="tel"
                          name="expiry-date"
                          className={cx('input', 'form-control p-3')}
                        />
                        <label className="text-capitalize">Expiry Date (MM/YY)</label>
                      </div>
                      <div className={cx('form-group col')}>
                        <input name="cvv" className={cx('input', 'form-control p-3')} />
                        <label className="text-upercase">CVV</label>
                      </div>
                    </div>
                    <div className={cx('creadit-card_add_name-card', 'form-group')}>
                      <input name="" className={cx('input', 'form-control p-3')} />
                      <label className="text-upercase">Name On Card</label>
                    </div>
                  </div>
                  <div className={cx('creadit-card_add_billing-address', 'form-group d-flex flex-column gap-4 mb-5')}>
                    <div className={cx('form-group')}>
                      <input name="address" className={cx('input', 'form-control p-3')} />
                      <label className="text-capitalize">Address</label>
                    </div>
                    <div className={cx('form-group')}>
                      <input name="postal-code" className={cx('input', 'form-control p-3')} />
                      <label className="text-capitalize">postal code</label>
                    </div>
                  </div>
                  <div className={cx('creadit-card_add_btn', 'd-flex justify-content-end gap-2')}>
                    <Button onClick={handleCancelCreditCard}>Cancel</Button>
                    <Button primary={true} disabled={true}>
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={cx('bank-account', 'd-flex flex-column')}>
          <div className={cx('bank-account_header', 'd-flex flex-row justify-content-between')}>
            <div className={cx('bank-account_header_title')}>My Bank Accounts</div>
            <Button onClick={handleShowAddBankAccount} className={cx('bank-account_header_button', 'text-capitalize')}>
              <FontAwesomeIcon icon={faPlus} /> Add New Bank Account
            </Button>
          </div>
          <div className={cx('bank-account_footer')}>You don’t have bank accounts yet.</div>
          {bankAccount ? (
            <div className={cx('bank-account_add', 'd-flex justify-content-center align-items-center')}>
              <div className={cx('bank-account_add_wrapper')}>
                <h4 className={cx('bank-account_add_title', 'mb-4')}>User Information</h4>
                <form onSubmit={handleSubmitAddBank}>
                  <div className="d-flex gap-3 flex-column mb-5">
                    <div className={cx('bank-account_add_name', 'form-group')}>
                      <input name="name" className={cx('input', 'form-control p-3')} placeholder="Name" />
                    </div>
                    <div className={cx('bank-account_add_number', 'form-group')}>
                      <input name="ic-number" className={cx('input', 'form-control p-3')} placeholder="IC Number" />
                    </div>
                  </div>
                  <div className={cx('bank-account_add_btn', 'd-flex justify-content-end gap-2')}>
                    <Button onClick={handleCancelBankAccount}>Cancel</Button>
                    <Button primary={true}>Submit</Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </Account>
  );
}
