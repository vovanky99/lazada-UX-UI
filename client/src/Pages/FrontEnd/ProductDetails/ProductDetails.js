import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faCartPlus,
  faChevronDown,
  faChevronRight,
  faMessage,
  faMinus,
  faPlus,
  faRotate,
  faRotateLeft,
  faShield,
  faShop,
  faStar,
  faTruck,
  faTruckFast,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import SlickSlide from '~/components/SlickSlider/SlickSlider';
import { useEffect, useRef, useState } from 'react';
import Timer from '~/components/Timer';
import LocationShipping from './LocationShipping';
import { Image } from 'react-bootstrap';
import routes from '~/config/routes';
import ProductsDescriptions from './ProductsDescriptions';

const cx = classNames.bind(styles);

export default function ProductDetails() {
  const btnHlRef1 = useRef();
  const btnHlRef2 = useRef();

  const [denounce, setDenounce] = useState(false);
  // const [denounceAnimate, setDenounceAnimate] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [location, setLocation] = useState('phuong ky long, thi xa ky anh ');
  const title = 'Giày JOD P.ANDA Giày Thể Thao cao cổ Đen Trắng nam nữ, jd Cổ Cao Hot Trend UU 2';
  const [srcHighlightImgCat, setSrcHighlightImgCat] = useState('');
  const [srcHL, setSrcHL] = useState('');
  const [quantity, setQuantity] = useState(1);

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
  const handleOnClickHighlight = (e) => {
    const btns = document.getElementsByClassName('btn-active');
    e.preventDefault();
    if (e.target.classList.contains('slide_active') == false) {
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains('slide_active')) {
          btns[i].classList.remove('slide_active');
        }
      }
      setSrcHL(e.currentTarget.value);
      e.target.classList.add('slide_active');
    } else {
      e.target.classList.remove('slide_active');
      setSrcHL('');
    }
  };
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
  const handleOnclickSize = (e) => {
    const btns = document.getElementsByClassName('btn-size');
    if (e.target.classList.contains('slide_active') == false) {
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains('slide_active')) {
          btns[i].classList.remove('slide_active');
        }
      }
      e.target.classList.add('slide_active');
    } else {
      e.target.classList.remove('slide_active');
    }
  };
  const handleOnclickQuantityMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleOnclickQuantityPlus = () => {
    if (quantity < 1000) {
      setQuantity(quantity + 1);
    }
  };
  return (
    <section className={cx('wrapper')}>
      <div className={cx('main-content', 'd-flex flex-column')}>
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
            <SlickSlide title={title} srcHighlightParent={srcHighlightImgCat} srcHL={srcHL} changeSrcHL={changeSrcHL} />
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
                    onClick={handleOnClickHighlight}
                    value={`https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lftaifzma9nucb`}
                    className={cx('classify-content-element', 'btn-active d-flex flex-row align-items-center')}
                  >
                    <Image src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lftaifzma9nucb" />
                    Cổ Cao
                  </button>
                  <button
                    onClick={handleOnClickHighlight}
                    ref={btnHlRef2}
                    value={`https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lftaifzma9nucb`}
                    className={cx('classify-content-element', ' btn-active d-flex flex-row align-items-center ')}
                  >
                    <Image src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lftaifzma9nucb" />
                    Cổ Thấp
                  </button>
                </div>
              </section>
              <section className={cx('size', 'd-flex')}>
                <h3>Size</h3>
                <div className={cx('size-content', 'd-flex flex-row flex-wrap gap-3')}>
                  <button className="btn-size" onClick={handleOnclickSize}>
                    38
                  </button>
                  <button className="btn-size" onClick={handleOnclickSize}>
                    38
                  </button>
                  <button className="btn-size" onClick={handleOnclickSize}>
                    38
                  </button>
                  <button className="btn-size" onClick={handleOnclickSize}>
                    38
                  </button>
                  <button className="btn-size" onClick={handleOnclickSize}>
                    38
                  </button>
                  <button className="btn-size" onClick={handleOnclickSize}>
                    38
                  </button>
                </div>
              </section>
              <section className={cx('quantity', 'd-flex')}>
                <h3>Quantity</h3>
                <div className={cx('quantity-content', 'd-flex align-items-center gap-3')}>
                  <div className={cx('quantity-order')}>
                    <button onClick={handleOnclickQuantityMinus}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      id="quantity_order"
                      name="quantity_order"
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                        setQuantity(value);
                      }}
                      onKeyUp={(e) => {
                        if (e.target.value > 1000) {
                          setQuantity(1000);
                        }
                        if (e.target.value < 1) {
                          setQuantity(1);
                        }
                      }}
                    />
                    <button onClick={handleOnclickQuantityPlus}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div className={cx('quantity-avail')}>1000 pieces available</div>
                </div>
              </section>
              <div className={cx('btn-select', 'd-flex gap-4')}>
                <form>
                  <button className={cx('add-to-cart', 'text-capitalize')}>
                    <FontAwesomeIcon icon={faCartPlus} />
                    Add to cart
                  </button>
                </form>
                <form>
                  <button className={cx('buy-now', 'text-capitalize')}>buy now</button>
                </form>
              </div>
              <div className={cx('policy-buy-products', 'd-flex justify-content-between')}>
                <div className={cx('rotate-left')}>
                  <FontAwesomeIcon icon={faRotateLeft} className="me-3" />7 Days Return
                </div>
                <div className={cx('rotate-left')}>
                  <FontAwesomeIcon icon={faShield} className="me-3" />
                  100% Authentic
                </div>
                <div className={cx('rotate-left')}>
                  <FontAwesomeIcon icon={faTruck} className="me-3" />
                  Free Shipping
                </div>
              </div>
            </div>
          </section>
        </section>
        <section className={cx('shop-products')}>
          <div className={cx('shop-products-content', 'd-flex')}>
            <section className={cx('shop-products-content-left', 'd-flex')}>
              <Link to={routes.shop}>
                <div className={cx('shop-logo')}>
                  <Image src="https://down-vn.img.susercontent.com/file/vn-11134216-7qukw-ljuyqivjrhtu57_tn" />
                </div>
                <div className={cx('shopmall')}>
                  <Image src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/483071c49603aa7163a7.png" />
                </div>
              </Link>
              <div className={cx('shop-name', 'd-flex flex-column justify-content-between')}>
                <h4>Duvis</h4>
                <div className={cx('status-active')}>Active 11 minutes ago</div>
                <div className={cx('btn-contact-shop', 'd-flex gap-3')}>
                  <button>
                    <FontAwesomeIcon icon={faMessage} />
                    Chat Now
                  </button>
                  <Link>
                    <FontAwesomeIcon icon={faShop} />
                    View Shop
                  </Link>
                </div>
              </div>
            </section>
            <section className={cx('shop-products-content-right', ' text-capitalize')}>
              <div className={cx('shop-rating', 'd-flex justify-content-between')}>
                <label className="text-capitolize">Ratings</label>
                <span>531</span>
              </div>
              <Link className={cx('shop-product', 'd-flex justify-content-between')}>
                <label className="text-capitolize">products</label>
                <span>531</span>
              </Link>
              <div className={cx('shop-response-rate', 'd-flex justify-content-between')}>
                <label className="text-capitolize">response rate</label>
                <span>85%</span>
              </div>
              <div className={cx('shop-reponse-time', 'd-flex justify-content-between')}>
                <label className="text-capitolize">response time</label>
                <span>within hours</span>
              </div>
              <div className={cx('shop-joined', 'd-flex justify-content-between')}>
                <label className="text-capitolize">joined</label>
                <span>28 months ago</span>
              </div>
              <div className={cx('shop-rating', 'd-flex justify-content-between')}>
                <label className="text-capitolize">follower</label>
                <span>6.7k</span>
              </div>
            </section>
          </div>
        </section>
        <ProductsDescriptions />
      </div>
    </section>
  );
}
