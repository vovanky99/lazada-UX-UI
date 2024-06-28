import { useRef } from 'react';
import classNames from 'classnames/bind';
import { useImmer } from 'use-immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from '../RegisterShop.module.scss';
import Button from '~/components/Button';
import Radio from '~/components/Radio';
import Location from '../Location';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import { FormSearch } from '~/layout/Component/FormSearch';

const cx = classNames.bind(styles);

export default function TaxInfo() {
  const locationRef = useRef();
  const [taxInfo, setTaxInfo] = useImmer({
    name_business: '',
    bussiness_type: '',
    register_bussiness_address: {
      ward_id: '',
      address: '',
    },
    email_receive_electronic_invoice: {
      email_1: '',
    },
    tax_code: '',
  });

  const handlePassLocationValue = (value) => {
    setTaxInfo((draft) => {
      for (let key in value) {
        if (draft.hasOwnProperty[key]) {
          draft[key] = value[key];
        }
      }
    });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
  };

  const handleAddEmail = (e) => {};

  const handleBackSettingShipping = (e) => {
    const settingShip = document.getElementById('setting_ship');
    const settingContent = document.getElementById('setting_shipping_content');
    const taxInfo = document.getElementById('tax_info');
    const taxInfoContent = document.getElementById('tax_info_content');
    if (settingShip && settingContent) {
      localStorage.removeItem('taxInfo', true);
      settingShip.classList.add('active');
      settingShip.classList.remove('finished');
      taxInfo.classList.remove('active');
      settingContent.classList.add('active');
      taxInfoContent.classList.remove('active');
      localStorage.setItem('settingShipping', true);
    }
  };
  return (
    <form className={cx('tax_info_form')} noValidate>
      <div className={cx('form_header')}>
        <div className={cx('form_header_alert', 'd-flex flex-row')}>
          <FontAwesomeIcon icon={faExclamation} />
          <p>
            The collection of Tax Information and Identification Information is mandatory according to the regulations
            of Vietnam's Cybersecurity, E-commerce, and Tax laws. Tax Information and Identification Information will be
            protected according to Shopee's privacy policy. The seller is fully responsible for the accuracy of the
            information.
          </p>
        </div>
        <div className={cx('form_header_content', 'd-flex flex-column')}>
          <div className={cx('bussiness_type', 'd-flex flex-row')}>
            <label htmlFor="bussiness_type_option" className="form-label">
              business type
            </label>
            <div id="bussiness_type_option" className={cx('bussiness_type_option', 'd-flex flex-row')}>
              <Radio title="Individual" primary />
              <Radio title="Household business" primary />
              <Radio title="Company" primary />
            </div>
          </div>
          <div className={cx('registered_business_address', 'd-flex flex-row')}>
            <label htmlFor="registered_business_address_content" className="form-label">
              Registered business address
            </label>
            <div
              id="registered_business_address_content"
              className={cx('registered_business_address_content', 'd-flex flex-column')}
            >
              <Location useLabel={false} ref={locationRef} handlePassLocationValue={handlePassLocationValue} />
              <FormText title="address" name="address" useLabel={false} rows={2} />
            </div>
          </div>
          <div className={cx('email_receive_electronic_invoice', 'd-flex flex-row')}>
            <label htmlFor="email_receive_electronic_invoice_content" className="form-label">
              Email to receive electronic invoice
            </label>
            <div
              id="email_receive_electronic_invoice_content"
              className={cx('email_receive_electronic_invoice_content', 'd-flex flex-column')}
            >
              {Object.keys(taxInfo.email_receive_electronic_invoice).map((dt, index) => (
                <FormSearch
                  title="email"
                  name={dt}
                  useTippy={false}
                  useLabel={false}
                  handleOnchange={handleOnchange}
                  key={index}
                >
                  <div className={cx('email_length')}>{dt[0]}</div>
                </FormSearch>
              ))}
              <Button className={cx('add_email')} type="button" transparent small onClick={handleAddEmail}>
                <FontAwesomeIcon icon={faPlus} />
                <div className={cx('add_email_title', 'text-capitalize')}>add email</div>
                <div className={cx('add_email_limit')}>
                  ({Object.keys(taxInfo.email_receive_electronic_invoice).length}/5)
                </div>
              </Button>
            </div>
          </div>
          <div className={cx('tax_code', 'd-flex flex-row')}>
            <label htmlFor="tax_code_content" className="form-label">
              Tax code
            </label>
            <div id="tax_code_content" className={cx('tax_code_content', 'd-flex flex-column')}>
              <FormSearch title="" name="tax_code" useTippy={false} useLabel={false} handleOnchange={handleOnchange}>
                <div className={cx('tax_code_length')}></div>
              </FormSearch>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('form_btn', 'd-flex flex-row justify-content-between text-capitalize')}>
        <Button type="button" small outline onClick={handleBackSettingShipping}>
          Back
        </Button>
        <Button type="button" small primary>
          next
        </Button>
      </div>
    </form>
  );
}
