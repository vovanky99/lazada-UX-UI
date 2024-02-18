import { useState } from 'react';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faLocationCrosshairs, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { faCircle } from '@fortawesome/fontawesome-free-regular';

const cx = classNames.bind(styles);

const city = [
  {
    name: 'ha noi',
    children: [
      {
        name: 'dong da',
        children: '',
      },
      {
        name: 'go vap',
        children: '',
      },
      {
        name: 'hoang mai',
        children: '',
      },
      {
        name: 'ho guom',
        children: '',
      },
    ],
  },
  {
    name: 'da nang',
    children: '',
  },
  {
    name: 'tp ho chi minh',
    children: '',
  },
  {
    name: 'da nang',
    children: '',
  },
  {
    name: 'hue',
    children: '',
  },
];

const old_contact = [
  {
    name: 'ronal',
    phone_number: '0987842258',
    address: 'số 60 đường lê văn thiêm phường kỳ long',
  },
  {
    name: 'ronal',
    phone_number: '0987842258',
    address: 'số 60 đường lê văn thiêm phường kỳ long',
  },
];

export default function LocationShipping({ changeLocationValue, onClick }) {
  const [clickCircle, setclickCircle] = useState(true);
  const [clear, setClear] = useState(false);
  const handleClick = async (e) => {
    changeLocationValue(e.target.value);
  };
  const handleclickCircle = () => {
    setclickCircle(false);
  };

  return (
    <section className={cx('shipping-show-wrapper')}>
      <div className={cx('shipping-show')}>
        <div className={cx('shipping-title-container', 'd-flex flex-row justify-content-between')}>
          <span className={cx('shipping-title')}> shipping location</span>
          <span className={cx('close')} style={{ cursor: 'pointer' }} onClick={onClick}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        <ul className={cx('shipping-scroll')}>
          <Tippy
            interactive
            visible={false}
            render={(attrs) => (
              <ul className={cx('search-result')} tabIndex="-1" {...attrs} style={{ listStyle: 'none' }}>
                {city.map((ct, index) => (
                  <li key={index}>
                    {ct.name} {ct.children != '' && ct.children.map(() => <li></li>)}
                  </li>
                ))}
              </ul>
            )}
          >
            <li className={cx('search-location', 'd-flex justify-content-between mb-4')}>
              <input className={cx('input-search')} placeholder="Search city, district" type="text" />
              <button className={cx('bg-danger border-none col-2')} type="submit">
                Use
              </button>
            </li>
          </Tippy>
          <li className={cx('use-my-location', 'mb-4')}>
            <FontAwesomeIcon className="fs-4" icon={faLocationCrosshairs} />
            <span className="ms-3">Use my current location</span>
          </li>
          <li className={cx('address-old', 'd-flex flex-column')}>
            <div className="fs-4 ">My Address</div>
            {old_contact.map((old_ct, index) => (
              <div key={index} className={cx('border', 'd-flex flex-row py-4 gap-3')}>
                <span>
                  {clickCircle ? (
                    <FontAwesomeIcon onClick={handleclickCircle} icon={faCircle} style={{ cursor: 'pointer' }} />
                  ) : (
                    <FontAwesomeIcon className={cx('fa-circle-dot')} icon={faCircleDot} />
                  )}
                </span>
                <div className="d-flex flex-column gap-1">
                  <span className={cx('color-name', 'd-flex flex-row')}>
                    {old_ct.name} <p>| {old_ct.phone_number}</p>
                  </span>
                  <span className={'address-details'}>{old_ct.address}</span>
                  <button style={{ width: '60px' }} disabled variant="outline-danger">
                    default
                  </button>
                </div>
              </div>
            ))}
          </li>
          <li className={cx('add-address', 'mt-3')}>
            <button>
              <FontAwesomeIcon icon={faPlus} />
              Add Address
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
