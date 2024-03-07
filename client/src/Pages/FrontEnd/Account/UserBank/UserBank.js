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

  const [cardNumber, setCardNumber] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [cvv, setCVV] = useState();
  const [nameOnCard, setNameOnCard] = useState();
  const [address, setAddress] = useState();
  const [postalCode, setPostalCode] = useState();

  let [validated, setValidated] = useState({
    CardNumber: '',
    ExpiryDate: '',
    CVV: '',
    NameOnCard: '',
    Address: '',
    PostalCode: '',
  });

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

  //hanlde credit card
  const handleShowAddCreditCard = (e) => {
    setCreditCard(true);
  };
  const handleSubmitAddCreditCard = (e) => {
    e.preventDefault();
  };
  const handleCancelCreditCard = (e) => {
    setCreditCard(false);
    setValidated({
      CardNumber: '',
      ExpiryDate: '',
      CVV: '',
      NameOnCard: '',
      Address: '',
      PostalCode: '',
    });
    setAddress('');
    setCardNumber('');
    setExpiryDate('');
    setNameOnCard('');
    setPostalCode('');
    setCVV('');
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
  /* handle validated  */
  //hanlde Card Number
  useEffect(() => {
    const card_number = document.getElementById('card_number');
    const handleBlurCardNumber = (e) => {
      if (e.target.value == '') {
        setValidated({ CardNumber: 'Please enter the card number.' });
        e.currentTarget.classList.add('active_validated');
      } else if (e.target.value.search(/[a-zA-Z]/gi) >= 0) {
        setValidated({ CardNumber: 'Value must be numbers.' });
        e.currentTarget.classList.add('active_validated');
      } else if (e.target.value.replace(/\s+/g, '').length < 16) {
        setValidated({ CardNumber: 'Please enter a valid card number..' });
        e.currentTarget.classList.add('active_validated');
      } else {
        setValidated({ CardNumber: '' });
        setCardNumber(parseInt(e.target.value));
        e.currentTarget.classList.remove('active_validated');
      }
    };
    const handleOnChangeCardNumber = (e) => {
      if (e.target.value.search(/[\sa-zA-Z]/gi) >= 0 || e.target.value == '') {
        setCardNumber(e.target.value);
      } else if (e.target.value.replace(/\s+/g, '').length == 16) {
        setCardNumber(parseInt(e.target.value.replace(/\s+/g, '')));
      }
    };
    if (card_number) {
      card_number.addEventListener('blur', handleBlurCardNumber);
      card_number.addEventListener('change', handleOnChangeCardNumber);
    }
    return () => {
      if (card_number) {
        card_number.removeEventListener('blur', handleBlurCardNumber);
        card_number.removeEventListener('change', handleOnChangeCardNumber);
      }
    };
  }, [validated.CardNumber, cardNumber]);

  //hanlde Expiry Date
  useEffect(() => {
    const expiry_date = document.getElementById('expiry_date');
    const handleBlurExpiryDate = (e) => {
      if (e.target.value == '') {
        setValidated({ ExpiryDate: 'Please enter the expiry date.' });
        e.currentTarget.classList.add('active_validated');
      } else if (e.target.value.search(/[\sa-zA-Z]/gi) >= 0) {
        setValidated({ ExpiryDate: 'Value must be numbers.' });
        e.currentTarget.classList.add('active_validated');
      } else {
        setValidated({ ExpiryDate: '' });
        e.currentTarget.classList.remove('active_validated');
      }
    };

    if (expiry_date) {
      expiry_date.addEventListener('blur', handleBlurExpiryDate);
    }
    return () => {
      if (expiry_date) {
        expiry_date.removeEventListener('blur', handleBlurExpiryDate);
      }
    };
  }, [validated.ExpiryDate, expiryDate]);

  //hanlde CVV
  useEffect(() => {
    const cvv = document.getElementById('cvv');
    const handleBlurExpiryDate = (e) => {
      if (e.target.value == '') {
        setValidated((validated.CVV = 'Please enter the cvv.'));
        e.currentTarget.classList.add('active_validated');
      } else if (e.target.value.search(/[\sa-zA-Z]/gi) >= 0) {
        setValidated((validated.CVV = 'Value must be numbers.'));
        e.currentTarget.classList.add('active_validated');
      } else {
        setValidated((validated.CVV = ''));
        e.currentTarget.classList.remove('active_validated');
      }
    };

    if (cvv) {
      cvv.addEventListener('blur', handleBlurExpiryDate);
    }
    return () => {
      if (cvv) {
        cvv.removeEventListener('blur', handleBlurExpiryDate);
      }
    };
  }, [validated.CVV, cvv]);
  //hanlde Postal Code
  useEffect(() => {
    const postal_code = document.getElementById('postal_code');
    const handleBlurPostalCode = (e) => {
      if (e.target.value == '') {
        setValidated({ PostalCode: 'Please enter the postal code.' });
        e.currentTarget.classList.add('active_validated');
      } else if (e.target.value.search(/[\sa-zA-Z]/gi) >= 0) {
        setValidated({ PostalCode: 'Value must be numbers.' });
        e.currentTarget.classList.add('active_validated');
      } else {
        setValidated({ PostalCode: '' });
        e.currentTarget.classList.remove('active_validated');
      }
    };

    if (postal_code) {
      postal_code.addEventListener('blur', handleBlurPostalCode);
    }
    return () => {
      if (postal_code) {
        postal_code.removeEventListener('blur', handleBlurPostalCode);
      }
    };
  }, [validated.PostalCode, postalCode]);

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
                      <input
                        type="tel"
                        id="card_number"
                        required
                        name="card-number"
                        className={cx('input', 'form-control p-3')}
                        maxLength={19}
                        onKeyPress={(e) => {
                          if (e.target.value.length == 4) {
                            e.target.value += ' ';
                          } else if (e.target.value.length == 9) {
                            e.target.value += ' ';
                          } else if (e.target.value.length == 14) {
                            e.target.value += ' ';
                          }
                        }}
                      />
                      <label className="text-capitalize">card number</label>
                      <span className="text-danger ps-3">{validated.CardNumber != '' ? validated.CardNumber : ''}</span>
                    </div>
                    <div className={cx('creadit-card_add_group', 'form-group d-flex gap-4')}>
                      <div className={cx('form-group col-7')}>
                        <input
                          id="expiry_date"
                          required
                          autoComplete="off"
                          inputMode="numeric"
                          name="expiry-date"
                          onChange={(e) => {
                            setExpiryDate(e.target.value.replace(/[^0-9]/g, ''));
                          }}
                          onKeyPress={(e) => {
                            if (e.target.value.length == 2) {
                              e.target.value += '/';
                            }
                          }}
                          className={cx('input', 'form-control p-3')}
                          maxLength={5}
                        />
                        <label className="text-capitalize">Expiry Date (MM/YY)</label>
                        <span className="text-danger ps-3">
                          {validated.ExpiryDate != '' ? validated.ExpiryDate : ''}
                        </span>
                      </div>
                      <div className={cx('form-group col')}>
                        <input
                          id="cvv"
                          type="password"
                          required
                          name="cvv"
                          className={cx('input', 'form-control p-3')}
                          maxLength={3}
                          onChange={(e) => {
                            setCVV(e.target.value.replace(/[^0-9]/g, ''));
                          }}
                        />
                        <label className="text-upercase">CVV</label>
                        <span className="text-danger ps-3">{validated.CVV != '' ? validated.CVV : ''}</span>
                      </div>
                    </div>
                    <div className={cx('creadit-card_add_name-card', 'form-group')}>
                      <input
                        id="name_on_card"
                        type="text"
                        required
                        name=""
                        className={cx('input', 'form-control p-3')}
                        maxLength={100}
                      />
                      <label className="text-upercase">Name On Card</label>
                      <span className="text-danger ps-3">{validated.NameOnCard != '' ? validated.NameOnCard : ''}</span>
                    </div>
                  </div>
                  <div className={cx('creadit-card_add_billing-address', 'form-group d-flex flex-column gap-4 mb-5')}>
                    <div className={cx('form-group')}>
                      <input
                        id="address"
                        type="text"
                        required
                        name="address"
                        className={cx('input', 'form-control p-3')}
                        maxLength={200}
                      />
                      <label className="text-capitalize">Address</label>
                      <span className="text-danger ps-3">{validated.Address != '' ? validated.Address : ''}</span>
                    </div>
                    <div className={cx('form-group')}>
                      <input
                        required
                        id="postal_code"
                        type="text"
                        onChange={(e) => {
                          if (e.target.value.search(/[\sa-zA-Z]/gi) >= 0 || e.target.value == '') {
                            setPostalCode(e.target.value);
                          } else {
                            setPostalCode(parseInt(e.target.value));
                          }
                        }}
                        name="postal-code"
                        className={cx('input', 'form-control p-3')}
                        value={postalCode}
                        maxLength={5}
                      />
                      <label className="text-capitalize">postal code</label>
                      <span className="text-danger ps-3">{validated.PostalCode != '' ? validated.PostalCode : ''}</span>
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
