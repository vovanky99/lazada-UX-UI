import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faChevronDown, faChevronRight, faStar, faTruckFast, faXmark } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import SlickSlide from '~/components/SlickSlider/SlickSlider';
import { useEffect, useRef, useState } from 'react';
import Timer from '~/components/Timer';
import LocationShipping from './LocationShipping';
import { Image } from 'react-bootstrap';

import './active.css';

const cx = classNames.bind(styles);

export default function ProductDetails() {
  const btnHlRef1 = useRef();
  const btnHlRef2 = useRef();

  const [denounce, setDenounce] = useState(false);
  // const [denounceAnimate, setDenounceAnimate] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [location, setLocation] = useState('phuong ky long, thi xa ky anh ');
  const [srcHighlightImgCat, setSrcHighlightImgCat] = useState('');
  const [srcHL, setSrcHL] = useState('');

  const changeLocationValue = (value) => {
    setLocation(value);
  };
  const handleOnClickDenounce = () => {
    setDenounce(true);
  };
  const handleOnClickDenounceClose = (e) => {
    setDenounce(false);
  };
  const hanldeShippingShow = () => {
    setShipping(true);
  };
  const handleOnClickShippingClose = () => {
    setShipping(false);
  };

  useEffect(() => {
    const btnElement = btnHlRef1.current;
    const btnElement2 = btnHlRef2.current;
    const handleOnClickHighlight = (e) => {
      setSrcHL(e.currentTarget.value);
      if (e.target.classList.contains('active') == false) {
        e.target.classList.add('active');
      } else {
        e.target.classList.remove('active');
      }
      e.preventDefault();
    };

    if (btnElement) {
      btnElement.addEventListener('click', handleOnClickHighlight);
    }
    if (btnElement2) {
      btnElement2.addEventListener('click', handleOnClickHighlight);
    }
    return () => {
      if (btnElement) {
        btnElement.removeEventListener('click', handleOnClickHighlight);
      } else {
        btnElement2.removeEventListener('click', handleOnClickHighlight);
      }
    };
  }, [btnHlRef1, btnHlRef2]);
  useEffect(() => {
    const handleOnMouse = (e) => {
      setSrcHighlightImgCat(e.currentTarget.value);
      e.preventDefault();
    };
    const btnElement = btnHlRef1.current;
    const btnElement2 = btnHlRef2.current;
    if (btnElement) {
      btnElement.addEventListener('mouseover', handleOnMouse);
    }
    if (btnElement2) {
      btnElement2.addEventListener('mouseover', handleOnMouse);
    }
    return () => {
      if (btnElement) {
        btnElement.removeEventListener('mouseover', handleOnMouse);
      } else {
        btnElement2.removeEventListener('mouseover', handleOnMouse);
      }
    };
  }, []);
  useEffect(() => {
    const handleOnMouseLeave = (e) => {
      e.preventDefault();
      setSrcHighlightImgCat('');
    };
    const btnElement = btnHlRef1.current;
    const btnElement2 = btnHlRef2.current;
    if (btnElement) {
      btnElement.addEventListener('mouseleave', handleOnMouseLeave);
    }
    if (btnElement2) {
      btnElement2.addEventListener('mouseleave', handleOnMouseLeave);
    }
    return () => {
      if (btnElement) {
        btnElement.removeEventListener('mouseleave', handleOnMouseLeave);
      } else {
        btnElement2.removeEventListener('mouseleave', handleOnMouseLeave);
      }
    };
  }, []);
  const changeSrcHL = (value) => {
    setSrcHL(value);
  };
  return (
    <section className={cx('wrapper')}>
      <div className={cx('main-content', 'd-lex flex-column')}>
        <nav className={cx('breadcum', 'py-3')}>
          <ul className={cx('d-flex flex-row fs-5')} style={{ listStyle: 'none', marginBottom: '0' }}>
            <li className={cx('')}>
              <Link to={config.routes.Cat}>
                Computers & Laptops
                <FontAwesomeIcon icon={faChevronRight} className="mx-2" />
              </Link>
            </li>
            <li>
              <Link to={config.routes.Cat}>
                Desktops Computers
                <FontAwesomeIcon icon={faChevronRight} className="mx-2" />
              </Link>
            </li>
            <li>
              <Link to={config.routes.Cat}>
                Gaming Desktops
                <FontAwesomeIcon icon={faChevronRight} className="mx-2" />
              </Link>
            </li>
            <li>
              <a style={{ cursor: 'none', color: 'gray' }} href="#">
                Gaming Desktops
              </a>
            </li>
          </ul>
        </nav>
        <section className={cx('product-briefing', 'd-flex')}>
          <h1 style={{ position: 'absolute', zIndex: '-999', width: '1px', height: '1px', overflow: 'hidden' }}>
            1 [FREE SHIP]Giày JOD P.ANDA Giày Thể Thao cao cổ Đen Trắng nam nữ, jd Cổ Cao Hot Trend UU 2
          </h1>
          <section className={cx('images-products', 'd-flex flex-row col-5')}>
            <SlickSlide srcHighlightParent={srcHighlightImgCat} srcHL={srcHL} changeSrcHL={changeSrcHL} />
          </section>
          <section className={cx('products-content', 'col-7')}>
            <div className={cx('products-content-main', 'd-flex flex-column')}>
              <h2 className={cx('title', 'mb-2')}>
                Giày Converse_Cổ Cao Nam Nữ, Giày CV 1970s Cổ Cao Trắng Đen Nam Nữ Hàng Đẹp Full Box Bill AM Sneaker
              </h2>
              <div className={cx('reviews_headers', 'd-flex flex-row justify-content-between')}>
                <div className={cx('d-flex flex-row')}>
                  <div className={cx('reviews', 'd-flex flex-row align-items-center')}>
                    <div className={cx('stars', 'me-2')}>
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <span className="me-1">493</span>
                    <a href="#reviews_product" className={cx('core')}>
                      Ratings
                    </a>
                  </div>
                  <div className={cx('total-reviews', 'd-flex flex-row align-items-center')}>
                    <div className={cx('me-2 fs-4')}>2,3k </div>
                    <a href="#reviews_product">Đánh Giá</a>
                  </div>
                  <div className={cx('selled', 'd-flex flex-row align-items-center')}>
                    <div className={cx('me-2 fs-4')}>2,3k </div>
                    <span href="#reviews_product">Đã Bán</span>
                  </div>
                </div>
                <button
                  className={cx('fs-5')}
                  onClick={handleOnClickDenounce}
                  style={{ border: 'none', backgroundColor: 'white' }}
                >
                  Report
                </button>
                <div id="show-denounce" className={cx('show-denounce', `${denounce ? 'show' : ''}`)}>
                  <div className={cx('show-denounce-content', 'text-start')}>
                    <div className={cx('d-flex justify-content-between')}>
                      <span>Select a Reason</span>
                      <span style={{ cursor: 'pointer' }} onClick={handleOnClickDenounceClose}>
                        <FontAwesomeIcon icon={faXmark} />
                      </span>
                    </div>
                    <ul className={cx('scroll-denounce')}>
                      <li>sản phẩm bị cấm buôn bán</li>
                      <li>sản phẩm bị cấm buôn bán</li>
                      <li>sản phẩm bị cấm buôn bán</li>
                      <li>sản phẩm bị cấm buôn bán</li>
                      <li>sản phẩm bị cấm buôn bán</li>
                      <li>sản phẩm bị cấm buôn bán</li>
                      <li>sản phẩm bị cấm buôn bán</li>
                      <li>sản phẩm bị cấm buôn bán</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={cx('flash-sale', 'd-flex flex-row justify-content-between align-items-center')}>
                <div className={cx('flash-sale-left')}>
                  FLA
                  <FontAwesomeIcon icon={faBolt} style={{ color: '#FB517E', fontSize: '1.8rem' }} />H SALE
                </div>
                <time className={cx('flash-sale-right', 'd-flex align-items-center fs-5')}>
                  {/* <FontAwesomeIcon icon={faClock} /> */}
                  ENDS IN
                  <Timer className={cx('fl-timer', 'align-items-center ms-2')} deadline={'january, 24, 2024'} />
                </time>
              </div>
              <div className={cx('price')}>
                <span className={cx('discount', 'me-3')}>400.000</span>
                <span className={cx('discount_Price')}>
                  200.000
                  <span className={cx('voucher-discount', 'ms-3')}>50%</span>
                </span>
              </div>
              <section className={cx('shipping', 'd-flex flex-row')}>
                <h3>shipping</h3>
                <div className={cx('shipping-content', 'd-flex flex-row')}>
                  <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faTruckFast} />
                  </div>
                  <div className={cx('content-main', 'ms-3')}>
                    <div className={cx('shipping-to', 'd-flex flex-row')}>
                      <span className="d-block" style={{ width: '130px' }}>
                        shipping to
                      </span>
                      <span onClick={hanldeShippingShow}>
                        {location}
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
                      {shipping && (
                        <LocationShipping
                          changeLocationValue={changeLocationValue}
                          onClick={handleOnClickShippingClose}
                        />
                      )}
                    </div>
                    <div className={cx('shipping-fee', 'd-flex flex-row')}>
                      <span className="d-block" style={{ width: '130px' }}>
                        shipping fee
                      </span>
                      <span className={cx('fee')}>8.000</span>
                    </div>
                  </div>
                </div>
              </section>
              <section className={cx('classify', 'd-flex flex-row')}>
                <h3 className={cx('classify-title')}>Phân loại</h3>
                <div className={cx('classify-content', 'd-flex justify-content-start')}>
                  <button
                    id="button"
                    ref={btnHlRef1}
                    value={`https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lftaifzma9nucb`}
                    className={cx('classify-content-element', 'd-flex flex-row align-items-center')}
                  >
                    <Image src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lftaifzma9nucb" />
                    Cổ Cao
                  </button>
                  <button
                    ref={btnHlRef2}
                    value={`https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lftaifzma9nucb`}
                    className={cx('classify-content-element', 'd-flex flex-row align-items-center ')}
                  >
                    <Image src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lftaifzma9nucb" />
                    Cổ Thấp
                  </button>
                </div>
              </section>
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}
