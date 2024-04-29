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

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  let [cardNumberMessage, setCardNumberMessage] = useState('');
  let [expiryDateMessage, setExpiryDateMessage] = useState('');
  let [cvvMessage, setCvvMessage] = useState('');
  let [nameOnCardMessage, setNameOnCardMessage] = useState('');
  let [addressMessage, setAddressMessage] = useState('');
  let [postalCodeMessage, setPostalCodeMessage] = useState('');

  let [name, setName] = useState('');
  let [icNumber, setIcNumber] = useState('');
  let [nameMessage, setNameMessage] = useState('');
  let [icNumberMessage, setIcNumberMessage] = useState('');

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
    document.getElementById('credit-card_add').classList.remove('show-hide');
  };
  const handleSubmitAddCreditCard = (e) => {
    e.preventDefault();
  };

  //delete validated
  const removeValidatedActive = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].classList.contains('active_validated')) {
        arr[i].classList.remove('active_validated');
      }
    }
  };
  const handleCancelCreditCard = (e) => {
    e.stopPropagation();
    document.getElementById('btn-submit-credit').classList.remove('btn-active');
    setCreditCard(false);
    document.getElementById('credit-card_add').classList.add('show-hide');
    let input = document.querySelectorAll('.form-group input');
    removeValidatedActive(input);
    //set validate hollow
    setAddressMessage('');
    setCardNumberMessage('');
    setExpiryDateMessage('');
    setNameOnCardMessage('');
    setCvvMessage('');
    setPostalCodeMessage('');

    //set value hollow
    setAddress('');
    setCardNumber('');
    setExpiryDate('');
    setNameOnCard('');
    setPostalCode('');
    setCVV('');
  };

  /* handle validated  */
  //hanlde Card Number
  useEffect(() => {
    const card_number = document.getElementById('card_number');
    const handleBlurCardNumber = (e) => {
      if (e.target.value == '') {
        setCardNumberMessage('Please enter the card number.');
        e.currentTarget.classList.add('active_validated');
      } else if (e.target.value.search(/[a-zA-Z]/gi) >= 0) {
        setCardNumberMessage('Value must be numbers.');
        e.currentTarget.classList.add('active_validated');
      } else if (e.target.value.replace(/\s+/g, '').length < 16) {
        setCardNumberMessage('Please enter a valid card number.');
        e.currentTarget.classList.add('active_validated');
      } else {
        setCardNumberMessage('');
        e.currentTarget.classList.remove('active_validated');
      }
    };

    if (card_number) {
      card_number.addEventListener('blur', handleBlurCardNumber);
    }
    return () => {
      if (card_number) {
        card_number.removeEventListener('blur', handleBlurCardNumber);
      }
    };
  }, [cardNumberMessage, cardNumber]);

  //hanlde Expiry Date
  useEffect(() => {
    const expiry_date = document.getElementById('expiry_date');
    const handleBlurExpiryDate = (e) => {
      if (e.target.value == '') {
        setExpiryDateMessage('Please enter the expiry date.');
        e.currentTarget.classList.add('active_validated');
      } else if (e.target.value.search(/[\sa-zA-Z]/gi) >= 0) {
        setExpiryDateMessage('Value must be numbers.');
        e.currentTarget.classList.add('active_validated');
      } else {
        setExpiryDateMessage('');
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
  }, [expiryDateMessage]);

  //hanlde CVV
  useEffect(() => {
    const cvv = document.getElementById('cvv');
    const handleBlurCVV = (e) => {
      if (e.target.value == '') {
        setCvvMessage('Please enter the cvv.');
        e.currentTarget.classList.add('active_validated');
      } else if (e.target.value.search(/[\sa-zA-Z]/gi) >= 0) {
        setCvvMessage('Value must be numbers.');
        e.currentTarget.classList.add('active_validated');
      } else {
        setCvvMessage('');
        e.currentTarget.classList.remove('active_validated');
      }
    };

    if (cvv) {
      cvv.addEventListener('blur', handleBlurCVV);
    }
    return () => {
      if (cvv) {
        cvv.removeEventListener('blur', handleBlurCVV);
      }
    };
  }, [cvvMessage]);

  //hanlde name on card
  useEffect(() => {
    const name_on_card = document.getElementById('name_on_card');
    const handleBlurNameOnCard = (e) => {
      if (e.target.value == '') {
        setNameOnCardMessage('Please enter the name on card.');
        e.currentTarget.classList.add('active_validated');
      } else if (e.target.value.search(/[^0-9]/gi) < 0) {
        setNameOnCardMessage(
          `The value must be alphabet characters or the following characters: apostrophe('), minus(-) and dot(.).`,
        );
        e.currentTarget.classList.add('active_validated');
      } else {
        setNameOnCardMessage('');
        e.currentTarget.classList.remove('active_validated');
      }
    };

    if (name_on_card) {
      name_on_card.addEventListener('blur', handleBlurNameOnCard);
    }
    return () => {
      if (name_on_card) {
        name_on_card.removeEventListener('blur', handleBlurNameOnCard);
      }
    };
  }, [nameOnCardMessage]);

  //hanlde address
  useEffect(() => {
    const address = document.getElementById('address');
    const handleBlurAddress = (e) => {
      if (e.target.value == '') {
        setAddressMessage('Please enter the card billing address.');
        e.currentTarget.classList.add('active_validated');
      } else {
        setAddressMessage('');
        e.currentTarget.classList.remove('active_validated');
      }
    };

    if (address) {
      address.addEventListener('blur', handleBlurAddress);
    }
    return () => {
      if (address) {
        address.removeEventListener('blur', handleBlurAddress);
      }
    };
  }, [addressMessage]);

  //hanlde Postal Code
  useEffect(() => {
    const postal_code = document.getElementById('postal_code');
    const handleBlurPostalCode = (e) => {
      if (e.target.value == '') {
        setPostalCodeMessage('Please enter the postal code.');
        e.currentTarget.classList.add('active_validated');
      } else if (e.target.value.search(/[\sa-zA-Z]/gi) >= 0) {
        setPostalCodeMessage('Value must be numbers.');
        e.currentTarget.classList.add('active_validated');
      } else {
        setPostalCodeMessage('');
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
  }, [postalCodeMessage]);

  //hande show button submit credit
  useEffect(() => {
    let btn = document.getElementById('btn-submit-credit');
    const showBtn = () => {
      if (
        cardNumber != '' &&
        expiryDate != '' &&
        cvv != '' &&
        nameOnCard != '' &&
        address != '' &&
        postalCode != '' &&
        cardNumberMessage == '' &&
        expiryDateMessage == '' &&
        cvvMessage == '' &&
        nameOnCardMessage == '' &&
        addressMessage == '' &&
        postalCodeMessage == ''
      ) {
        btn.classList.add('btn-active');
      } else {
        btn.classList.remove('btn-active');
      }
    };
    showBtn();
  }, [postalCode, address, nameOnCard, cvv, expiryDate, cardNumber]);
  //hanlde bank account
  const handleShowAddBankAccount = (e) => {
    setBankAccount(true);
    document.getElementById('bank-account_add').classList.remove('show-hide');
  };
  const handleSubmitAddBank = (e) => {
    e.preventDefault();
  };
  const handleCancelBankAccount = (e) => {
    e.stopPropagation();
    setBankAccount(false);
    setIcNumber('');
    setName('');
    setIcNumberMessage('');
    setNameMessage('');
    document.getElementById('bank-account_add').classList.add('show-hide');
    const input = document.querySelectorAll('.form-group input');
    removeValidatedActive(input);
  };

  /*validate bank account */

  //handle name
  useEffect(() => {
    let name = document.getElementById('bank_name');
    const handleBlurName = (e) => {
      if (e.target.value == '') {
        e.currentTarget.classList.add('active_validated');
        setNameMessage('Please enter this field.');
      } else {
        e.currentTarget.classList.remove('active_validated');
        setNameMessage('');
      }
    };
    if (name) {
      name.addEventListener('blur', handleBlurName);
    }
    return () => {
      if (name) {
        name.removeEventListener('blur', handleBlurName);
      }
    };
  }, [nameMessage]);

  //handle ic number
  useEffect(() => {
    let ic_number = document.getElementById('ic_number');
    const handleBlurIcNumber = (e) => {
      if (e.target.value == '') {
        e.currentTarget.classList.add('active_validated');
        setIcNumberMessage('Please enter IC.');
      } else if (
        e.target.value.length < 8 ||
        e.target.value.length > 12 ||
        e.target.value.search(/[\sa-zA-Z]/gi) >= 0
      ) {
        e.currentTarget.classList.add('active_validated');
        setIcNumberMessage('Please enter a valid IC.');
      } else {
        e.currentTarget.classList.remove('active_validated');
        setIcNumberMessage('');
      }
    };
    if (ic_number) {
      ic_number.addEventListener('blur', handleBlurIcNumber);
    }
    return () => {
      if (ic_number) {
        ic_number.removeEventListener('blur', handleBlurIcNumber);
      }
    };
  }, [icNumberMessage]);
  return (
    <Account>
      <div className={cx('wrapper', 'd-flex flex-column')}>
        <div className={cx('credit-card', 'd-flex flex-column')}>
          <div className={cx('credit-card_header', 'd-flex flex-row justify-content-between')}>
            <div className={cx('credit-card_header_title')}>Credit / Debit Card</div>
            <Button onClick={handleShowAddCreditCard} className={cx('credit-card_header_button', 'text-capitalize')}>
              <FontAwesomeIcon icon={faPlus} /> Add New Card
            </Button>
          </div>
          <div className={cx('credit-card_footer')}>You don't have cards yet.</div>
          <div
            id="credit-card_add"
            className={cx('credit-card_add', 'show-hide d-flex justify-content-center align-items-center')}
          >
            <div className={cx('credit-card_add_wrapper')}>
              <h4 className={cx('credit-card_add_title', 'mb-4')}>Add Card</h4>
              <form onSubmit={handleSubmitAddCreditCard}>
                <div className="d-flex gap-3 flex-column mb-4">
                  <div className={cx('credit-card_add_protected', 'd-flex flex-row gap-3')}>
                    <FontAwesomeIcon icon={faShieldHalved} />
                    <div className={cx('credit-card_add_protected-title', 'd-flex flex-column')}>
                      <h5>Your card details are protected.</h5>
                      <p>
                        We partner with CyberSource, a VISA company to ensure that your card details are kept safe and
                        secure. Shopee will not have access to your card info.
                      </p>
                    </div>
                  </div>
                  <div
                    className={cx(
                      'credit-card_add_group-title',
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
                  <div className={cx('credit-card_add_number', 'form-group')}>
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
                      onChange={(e) => {
                        if (e.target.value.search(/[^a-zA-Z]/gi) >= 0 || e.target.value == '') {
                          setCardNumber(e.target.value);
                        } else if (e.target.value.replace(/\s+/g, '').length == 16) {
                          setCardNumber(e.target.value.replace(/\s+/g, ''));
                        }
                      }}
                      value={cardNumber}
                    />
                    <label className="text-capitalize">card number</label>
                    <span className="text-danger ps-3">{cardNumberMessage != '' ? cardNumberMessage : ''}</span>
                  </div>
                  <div className={cx('credit-card_add_group', 'form-group d-flex gap-4')}>
                    <div className={cx('form-group col-7')}>
                      <input
                        id="expiry_date"
                        required
                        autoComplete="off"
                        inputMode="numeric"
                        name="expiry-date"
                        type="text"
                        onChange={(e) => {
                          setExpiryDate(e.target.value.replace(/[^/0-9]/g, ''));
                        }}
                        onKeyPress={(e) => {
                          if (e.target.value.length == 2) {
                            e.target.value += '/';
                          }
                        }}
                        value={expiryDate}
                        className={cx('input', 'form-control p-3')}
                        maxLength={5}
                      />
                      <label className="text-capitalize">Expiry Date (MM/YY)</label>
                      <span className="text-danger ps-3">{expiryDateMessage != '' ? expiryDateMessage : ''}</span>
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
                        value={cvv}
                      />
                      <label className="text-upercase">CVV</label>
                      <span className="text-danger ps-3">{cvvMessage != '' ? cvvMessage : ''}</span>
                    </div>
                  </div>
                  <div className={cx('credit-card_add_name-card', 'form-group')}>
                    <input
                      id="name_on_card"
                      type="text"
                      required
                      name=""
                      className={cx('input', 'form-control p-3')}
                      maxLength={100}
                      value={nameOnCard}
                      onChange={(e) => {
                        setNameOnCard(e.target.value);
                      }}
                    />
                    <label className="text-upercase">Name On Card</label>
                    <span className="text-danger ps-3">{nameOnCardMessage != '' ? nameOnCardMessage : ''}</span>
                  </div>
                </div>
                <div className={cx('credit-card_add_billing-address', 'form-group d-flex flex-column gap-4 mb-5')}>
                  <div className={cx('form-group')}>
                    <input
                      id="address"
                      type="text"
                      required
                      name="address"
                      className={cx('input', 'form-control p-3')}
                      maxLength={200}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                    <label className="text-capitalize">Address</label>
                    <span className="text-danger ps-3">{addressMessage != '' ? addressMessage : ''}</span>
                  </div>
                  <div className={cx('form-group')}>
                    <input
                      required
                      id="postal_code"
                      onChange={(e) => {
                        setPostalCode(e.target.value);
                      }}
                      name="postal-code"
                      className={cx('input', 'form-control p-3')}
                      value={postalCode}
                      maxLength={5}
                    />
                    <label className="text-capitalize">postal code</label>
                    <span className="text-danger ps-3">{postalCodeMessage != '' ? postalCodeMessage : ''}</span>
                  </div>
                </div>
                <div className={cx('credit-card_add_btn', 'd-flex justify-content-end gap-2')}>
                  <Button onClick={handleCancelCreditCard}>Cancel</Button>
                  <Button id="btn-submit-credit" className={cx('btn-submit-credit')} primary={true} disabled={true}>
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={cx('bank-account', 'd-flex flex-column')}>
          <div className={cx('bank-account_header', 'd-flex flex-row justify-content-between')}>
            <div className={cx('bank-account_header_title')}>My Bank Accounts</div>
            <Button onClick={handleShowAddBankAccount} className={cx('bank-account_header_button', 'text-capitalize')}>
              <FontAwesomeIcon icon={faPlus} /> Add New Bank Account
            </Button>
          </div>
          <div className={cx('bank-account_footer')}>You don’t have bank accounts yet.</div>
          <div
            id="bank-account_add"
            className={cx('bank-account_add', 'show-hide d-flex justify-content-center align-items-center')}
          >
            <div className={cx('bank-account_add_wrapper')}>
              <h4 className={cx('bank-account_add_title', 'mb-4')}>User Information</h4>
              <form onSubmit={handleSubmitAddBank}>
                <div className="d-flex gap-3 flex-column mb-5">
                  <div className={cx('bank-account_add_name', 'form-group')}>
                    <input
                      id="bank_name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      name="name"
                      className={cx('input', 'form-control p-3')}
                      placeholder="Name"
                    />
                    <span className="text-danger ps-3">{nameMessage != '' ? nameMessage : ''}</span>
                  </div>
                  <div className={cx('bank-account_add_number', 'form-group')}>
                    <input
                      id="ic_number"
                      onChange={(e) => {
                        setIcNumber(e.target.value.replace(/[ a-zA-Z]/g, ''));
                        console.log(icNumber);
                      }}
                      value={icNumber}
                      name="ic-number"
                      className={cx('input', 'form-control p-3')}
                      placeholder="IC Number"
                    />
                    <span className="text-danger ps-3">{icNumberMessage != '' ? icNumberMessage : ''}</span>
                  </div>
                </div>
                <div className={cx('bank-account_add_btn', 'd-flex justify-content-end gap-2')}>
                  <Button onClick={handleCancelBankAccount}>Cancel</Button>
                  <Button primary={true}>Submit</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Account>
  );
}
