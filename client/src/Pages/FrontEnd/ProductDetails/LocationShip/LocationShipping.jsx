import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import {
  faCaretDown,
  faCircleDot,
  faLocationCrosshairs,
  faMagnifyingGlass,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/fontawesome-free-regular';
import { Link } from 'react-router-dom';

import styles from './Location.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import axios from '~/api/axios';
import Checkbox from '~/components/Checkbox';
import useDebounce from '~/hooks/Debounce';

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
  const isAuth = useSelector((state) => state.Auth.isAuthenticated);
  const locationRef = useRef();
  const homeRef = useRef();
  const searchAddAddressRef = useRef();
  const searchAddressref = useRef();
  const textRef = useRef();
  const phoneRef = useRef();
  const phoneTippyRef = useRef();
  const searchResultARef = useRef();
  const phone = useSelector((state) => state.Auth.user.phone_number);
  const debounce = useDebounce();
  const [clickCircle, setclickCircle] = useState(true);
  const [addAddress, setAddAddress] = useState(false);
  const [address, setAddress] = useState(null);
  const [searchAddressValue, setSearchAddressValue] = useState('');
  const [searchAddressTippy, setSearchAddressTippy] = useState(false);

  /* state add address*/
  const [oldValue, setOldValue] = useState('City, District, Ward');
  const [newValue, setNewValue] = useState('');
  const [phoneNunber, setPhoneNumber] = useState(null);
  const [tippyPhone, setTippyPhone] = useState(false);

  const handleClick = async (e) => {
    changeLocationValue(e.target.value);
  };

  const handleclickCircle = () => {
    setclickCircle(false);
  };
  /* handle add address */
  const handleAddAddress = (e) => {
    setAddAddress(true);
  };
  /* handle cancel add */
  const handleCancleAdd = () => {
    setAddAddress(false);
  };

  /*handle search address */
  const handleSAClickOutside = (e) => {
    setSearchAddressTippy(false);
  };
  useEffect(() => {
    const s = searchAddressref.current;
    const sR = searchResultARef.current;
    const handleSearchAddressClick = (e) => {
      setSearchAddressTippy(true);
    };
    const handleResize = () => {
      sR.style.width = `${s.offsetWidth}px`;
    };
    if (s) {
      s.addEventListener('click', handleSearchAddressClick);
    }
    if (s && sR) {
      handleResize();
      sR.addEventListener('resize', handleResize);
    }
    return () => {
      if (s) {
        s.removeEventListener('click', handleSearchAddressClick);
      }
      if (s && sR) {
        sR.removeEventListener('resize', handleResize);
      }
    };
  }, [searchAddressValue, searchAddressTippy]);

  /* handle get current location  */
  const getAddress = async (lat, long) => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`);
      setAddress(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const location = locationRef.current;
    const getLocation = (e) => {
      e.stopPropagation();
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          getAddress(position.coords.latitude, position.coords.longitude);
        });
      } else {
        console.log('Geolocation is not available in your browser.');
      }
    };
    if (location) {
      location.addEventListener('click', getLocation);
    }
    return () => {
      if (location) {
        location.removeEventListener('click', getLocation);
      }
    };
  }, [address]);

  /* handle search address */
  useEffect(() => {
    const search = searchAddAddressRef.current;
    // handle change textarea enable when search address have value default
    const isDisable = () => {
      if (search && search.value !== '') {
        textRef.current.disabled = 'enabled';
      }
    };
    isDisable();

    if (search) {
    }
    return () => {};
  }, [oldValue, newValue]);
  /* handle search phone use tippy */
  useEffect(() => {
    const p = phoneRef.current;
    const pt = phoneTippyRef.current;
    const handleFocusPhone = (e) => {
      setTippyPhone(true);
    };
    const handleBlurPhone = (e) => {
      setTippyPhone(false);
    };
    const handleResize = () => {
      pt.style.width = `${p.offsetWidth}`;
    };
    if (p) {
      p.addEventListener('blur', handleBlurPhone);
    }
    if (p) {
      p.addEventListener('focus', handleFocusPhone);
    }
    if (pt) {
      pt.addEventListener('resize', handleResize);
    }
    if (pt) {
      handleResize();
    }
    return () => {
      if (p) {
        p.removeEventListener('blur', handleBlurPhone);
      }
      if (p) {
        p.removeEventListener('focus', handleFocusPhone);
      }
      if (pt) {
        pt.removeEventListener('resize', handleResize);
      }
    };
  }, [tippyPhone]);
  return (
    <section className={cx('shipping-show-wrapper')}>
      <div className={cx('shipping-show')}>
        <div className={cx('shipping-title-container', 'd-flex flex-row justify-content-between')}>
          <span className={cx('shipping-title')}>shipping location</span>
          <span className={cx('close')} style={{ cursor: 'pointer' }} onClick={onClick}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        <div className={cx('shipping-scroll')}>
          <Tippy
            interactive
            visible={searchAddressTippy && searchAddressValue.length > 0}
            placement="bottom"
            offset={[-35, 1]}
            render={(attrs) => (
              <div
                ref={searchResultARef}
                className={cx('search-result')}
                tabIndex="-1"
                {...attrs}
                style={{ listStyle: 'none' }}
              >
                <div>
                  {console.log(searchAddressTippy && searchAddressValue.length > 0)}
                  {city.map((ct, index) => (
                    <span key={index}>
                      {ct.name} {ct.children !== '' && ct.children.map(() => <li></li>)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            onClickOutside={handleSAClickOutside}
          >
            <div className={cx('search-location', 'd-flex justify-content-between mb-4')}>
              <input
                value={searchAddressValue}
                ref={searchAddressref}
                onChange={(e) => {
                  setSearchAddressValue(e.target.value);
                }}
                className={cx('input-search')}
                placeholder="Search city, district"
                type="text"
              />
              <button className={cx('bg-danger border-none col-2')} type="submit" disabled>
                Use
              </button>
            </div>
          </Tippy>
          <div
            className={cx('use-my-location', 'mb-4 d-flex flex-row align-items-center gap-2')}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon className="fs-4" icon={faLocationCrosshairs} />
            {address ? (
              <div className={cx('current-location', 'd-flex flex-column')}>
                <span className="text-capitalize">use current location</span>
                {console.log(address)}
                <div>{`${address.address.quarter}, ${address.address.suburb}, ${address.address.city}`}</div>
              </div>
            ) : (
              <Button className="ms-3 p-0 bg-white" ref={locationRef}>
                Use my current location
              </Button>
            )}
          </div>
          {isAuth ? (
            <div>
              <ul>
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
                  <Button onClick={handleAddAddress}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add Address
                  </Button>
                </li>
              </ul>
            </div>
          ) : (
            <div className={cx('d-flex flex-column')}>
              <span className=" text-capitalize">My Location</span>
              <div className={cx('d-flex flex-row gap-2')}>
                <Link to={config.routes.signIn}>Login</Link>
                <span className=" text-capitalize">Select Delevery Address</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {addAddress ? (
        <div className={cx('add-shipping')}>
          <h4 className={cx('text-capitalize')}>New address</h4>
          <form noValidate>
            <div className={cx('add-ship_header', 'form-group')}>
              <div className={cx('form-group d-flex flex-row justify-content-between')}>
                <div className={cx('search-contain')}>
                  <input required className={cx('form-control ')} type="text" placeholder="FullName" />
                  <div className={cx('position-label')}>FullName</div>
                </div>
                <div className={cx('search-contain')}>
                  <Tippy
                    visible={tippyPhone}
                    offset={[700, 150]}
                    placement="bottom"
                    render={(attrs) => (
                      <div ref={phoneTippyRef} className={cx('phone-tippy')} tabIndex="-1" {...attrs}>
                        {phone}
                        <Button primary={true}>use</Button>
                      </div>
                    )}
                  >
                    <>
                      <input
                        ref={phoneRef}
                        required
                        className={cx('form-control')}
                        type="number"
                        value={phoneNunber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                        placeholder="Phone Number"
                      />
                      <div className={cx('position-label')}>Phone Number</div>
                    </>
                  </Tippy>
                </div>
              </div>
              <div className={cx('search-contain', 'form-group')}>
                <Tippy render={(attrs) => <div className={cx('search-contain-tippy')} tabIndex="-1" {...attrs}></div>}>
                  <>
                    <input
                      className={cx('search_address', 'form-control')}
                      type="text"
                      ref={searchAddAddressRef}
                      value={newValue}
                      onChange={(e) => {
                        setNewValue(e.target.value);
                      }}
                      required
                      placeholder={oldValue}
                    />
                    <div className={cx('position-label')}>City, District, Ward</div>
                    <p
                      className={cx('search-search_value', 'd-flex flex-row justify-content-between')}
                      type="button"
                      transparent={true}
                    >
                      <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                    </p>
                    <p
                      className={cx('caret-search_value', 'd-flex flex-row justify-content-between')}
                      type="button"
                      transparent={true}
                    >
                      <FontAwesomeIcon className={cx('icon-caret')} icon={faCaretDown} />
                    </p>
                    <Button
                      className={cx('close-search_value', 'd-flex flex-row justify-content-between')}
                      type="button"
                      transparent={true}
                    >
                      <FontAwesomeIcon className={cx('icon-close')} icon={faXmark} />
                    </Button>
                  </>
                </Tippy>
              </div>
              <div className={cx('search-contain', 'form-group')}>
                <textarea
                  required
                  ref={textRef}
                  className="form-control"
                  placeholder="Street Name, Building, House No."
                  maxLength={128}
                  disabled="disabled"
                />
                <div className={cx('position-label')}>Street Name, Building, House No.</div>
              </div>
              <div className={cx('form-group')}>
                <label className="text-capitalize">Label as</label>
                <div className={cx('is-home', 'form-group')}>
                  <Button type="button" ref={homeRef} transparent={true}>
                    Home
                  </Button>
                  <Button type="button" ref={homeRef} transparent={true}>
                    Work
                  </Button>
                </div>
              </div>
              <div className={cx('form-group')}>
                <Checkbox
                  Size="18px"
                  IconCheck={cx('icon-check')}
                  requir={false}
                  ClassName={cx('checkbox_default')}
                  Label="Set As Default !"
                />
              </div>
            </div>
            <div className={cx('add-shiping_bootom', 'form-group d-flex justify-content-end')}>
              <Button onClick={handleCancleAdd} transparent={true}>
                Cancel
              </Button>
              <Button className={cx('submit-address')} primary={true}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      ) : (
        ''
      )}
    </section>
  );
}
