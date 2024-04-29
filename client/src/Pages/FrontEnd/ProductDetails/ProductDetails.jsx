import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faCartPlus,
  faChevronDown,
  faChevronLeft,
  faMinus,
  faPlus,
  faRotateLeft,
  faShield,
  faStar,
  faTruck,
  faTruckFast,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import SlickSlide from '~/components/SlickSlider/SlickSlider';
import { useEffect, useRef, useState } from 'react';
import Timer from '~/components/Timer';
import LocationShipping from './LocationShip';
import ProductsDescriptions from './ProductsDescriptions';
import BreadCumbs from './BreadCumbs';
import Button from '~/components/Button';
import axios from '~/api/axios';
import { useParams } from 'react-router-dom';
import Images from '~/components/Images';

const cx = classNames.bind(styles);

export default function ProductDetails() {
  const btnHlRef = useRef();
  const params = useParams();

  const [denounce, setDenounce] = useState(false);
  const [reason, setReason] = useState('');
  const [reportId, setReportId] = useState(null);
  const [shipping, setShipping] = useState(false);
  const [location, setLocation] = useState('phuong ky long, thi xa ky anh');
  const [srcHighlightImgCat, setSrcHighlightImgCat] = useState('');
  const [srcHL, setSrcHL] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState(false);
  const [images, setImages] = useState(null);
  const [product, setProduct] = useState(null);
  const [shop, setShop] = useState(null);
  const [productSuggest, setProductSuggest] = useState(null);
  const [productStore, setProductStore] = useState(null);
  const [productTopShop, setProductTopShop] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [productType, setProductType] = useState(null);
  const [reports, setReports] = useState(null);
  const [contentReports, setContentReports] = useState('');

  /* handle scroll body hidden*/
  const handleScrollBody = (parameter) => {
    if (parameter == true) {
      document.querySelector('body').style['overflowY'] = 'hidden';
    } else {
      document.querySelector('body').style['overflowY'] = 'scroll';
    }
  };
  handleScrollBody(denounce || shipping);
  /* handle change value location*/
  const changeLocationValue = (value) => {
    setLocation(value);
  };
  /* handle show hide denounce*/

  // useEffect(() => {}, [denounce]);
  const handleOnClickDenounce = () => {
    setDenounce(true);
  };
  const handleOnClickDenounceClose = (e) => {
    setDenounce(false);
    setReason('');
  };

  /* handle show hide shipping*/
  const hanldeShippingShow = () => {
    setShipping(true);
  };
  const handleOnClickShippingClose = () => {
    setShipping(false);
  };

  /* handle highlight*/
  useEffect(() => {
    const c = document.querySelectorAll('.btn-hl-ref');
    const handleOnClickHighlight = (e) => {
      const btns = document.getElementsByClassName('btn-active');
      if (e.currentTarget.classList.contains('slide_active') == false) {
        for (let i = 0; i < btns.length; i++) {
          if (btns[i].classList.contains('slide_active')) {
            btns[i].classList.remove('slide_active');
          }
        }
        e.currentTarget.classList.add('slide_active');
        if (e.currentTarget.childNodes[0].src != '') {
          setSrcHL(e.currentTarget.childNodes[0].src);
        }
      } else {
        e.currentTarget.classList.remove('slide_active');
        setSrcHL('');
      }
    };
    if (c) {
      c.forEach((e) => e.addEventListener('click', handleOnClickHighlight));
    }
    return () => {
      if (c) {
        c.forEach((e) => e.removeEventListener('click', handleOnClickHighlight));
      }
    };
  }, [data, srcHL]);
  /*mouse over product type */
  useEffect(() => {
    const handleOnMouse = (e) => {
      if (e.currentTarget.value != '') {
        setSrcHighlightImgCat(e.currentTarget.childNodes[0].src);
      }
    };
    const btnElement = document.querySelectorAll('.btn-hl-ref');
    if (btnElement) {
      btnElement.forEach((e) => e.addEventListener('mouseover', handleOnMouse));
    }
    return () => {
      if (btnElement) {
        btnElement.forEach((e) => e.removeEventListener('mouseover', handleOnMouse));
      }
    };
  }, [data, srcHighlightImgCat]);
  /*mouse out product type */
  useEffect(() => {
    const handleOnMouseOut = (e) => {
      if (e.currentTarget.value != '') {
        setSrcHighlightImgCat('');
      }
    };
    const btnElement = document.querySelectorAll('.btn-hl-ref');
    if (btnElement) {
      btnElement.forEach((e) => e.addEventListener('mouseout', handleOnMouseOut));
    }
    return () => {
      if (btnElement) {
        btnElement.forEach((e) => e.removeEventListener('mouseout', handleOnMouseOut));
      }
    };
  }, [data, srcHighlightImgCat]);

  /*handle change default highlight*/
  const changeSrcHL = (value) => {
    setSrcHL(value);
  };

  /*handle active slide with src highlight*/
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

  /* handle increase and decrease */
  const handleOnclickQuantityMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleOnclickQuantityPlus = () => {
    if (quantity < product.quantities) {
      setQuantity(quantity + 1);
    }
  };

  //handle send report reason
  useEffect(() => {
    const send_reason = document.querySelectorAll('#show-denounce div ul li');
    let show_denounce = document.getElementById('show-denounce-content');
    const back_report = document.getElementById('back-report');
    //handle back report
    const handleBackReport = () => {
      setReason('');
      setReportId();
      show_denounce.style['display'] = 'flex';
    };
    const handleClickSend = (e) => {
      setReason(e.target.outerText);
      setReportId(parseInt(e.target.dataset.id));
      show_denounce.style['display'] = 'none';
    };
    if (send_reason) {
      send_reason.forEach((e) => e.addEventListener('click', handleClickSend));
    }
    if (back_report) {
      back_report.addEventListener('click', handleBackReport);
    }
    return () => {
      if (send_reason) {
        send_reason.forEach((e) => e.removeEventListener('click', handleClickSend));
      }
      if (back_report) {
        back_report.removeEventListener('click', handleBackReport);
      }
    };
  }, [data, reason]);

  //handle submit for report
  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (contentReports != '' && reason != '') {
      const sendReport = async () => {
        try {
          await axios.post('/api/product-detail/reports-product', {
            content: contentReports,
            title_id: reportId,
            product_id: product.id ? product.id : '',
          });
          setContentReports('');
          setReportId('');
          setReason('');
          setDenounce(false);
        } catch (e) {
          console.log(e);
        }
      };
      sendReport();
    }
  };

  //get data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/product-detail?id=' + params.id);
        setImages(res.data.images);
        setProduct(res.data.products[0]);
        setProductStore(res.data.shop_products);
        setProductSuggest(res.data.will_you_aslo_like);
        setProductTopShop(res.data.top_products_shop);
        setShop(res.data.shop);
        setReviews(res.data.reviews);
        setProductType(res.data.product_type_details);
        setReports(res.data.reports);
        setData(true);
      } catch (e) {
        console.log(e);
      }
    };

    setTimeout(() => {
      getData();
    }, 3000);
  }, [params.id]);

  /*handle submit buy now */
  const handleSubmitBuynow = () => {};

  /*handle submit add to cart */
  const handleSubmitAddCart = () => {};

  return (
    <section className={cx('wrapper')}>
      {data ? (
        <div className={cx('main-content', 'd-flex flex-column')}>
          <BreadCumbs />
          <section className={cx('product-briefing', 'd-flex')}>
            {/* <h1 style={{ position: 'absolute', zIndex: '-999', width: '1px', height: '1px', overflow: 'hidden' }}>
            {product.title}
          </h1> */}
            <section className={cx('images-products', 'd-flex flex-row col-5')}>
              {images.length != 0 ? (
                <SlickSlide
                  data={images}
                  title={product.title}
                  srcHighlightParent={srcHighlightImgCat}
                  srcHL={srcHL}
                  changeSrcHL={changeSrcHL}
                />
              ) : (
                ''
              )}
            </section>
            <section className={cx('products-content', 'col-7')}>
              <div className={cx('products-content-main', 'd-flex flex-column')}>
                <h2 className={cx('title', 'mb-2')}>{product.title}</h2>
                <div className={cx('reviews_headers', 'd-flex flex-row justify-content-between')}>
                  <div className={cx('d-flex flex-row align-items-center')}>
                    <div className={cx('reviews', 'd-flex flex-row align-items-center')}>
                      <div
                        className={cx('stars', 'me-2')}
                        style={{ '--rating': `${product.score ? product.score : 0}` }}
                      ></div>
                      {/* <span className="me-1">{product.total_reviews}</span>
                      <a href="#reviews_product" className={cx('core')}>
                        Ratings
                      </a> */}
                    </div>
                    <div className={cx('total-reviews', 'd-flex flex-row align-items-center')}>
                      <div className={cx('me-2 fs-4')}>{product.total_reviews} </div>
                      <a href="#reviews_product">Đánh Giá</a>
                    </div>
                    <div className={cx('selled', 'd-flex flex-row align-items-center')}>
                      <div className={cx('me-2 fs-4')}>{product.sold}</div>
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
                    <div id="show-denounce-content" className={cx('show-denounce-content', 'text-start')}>
                      <div className={cx('show-denounce-title', 'd-flex justify-content-between')}>
                        <span>Select a Reason</span>
                        <button className="btn" onClick={handleOnClickDenounceClose}>
                          <FontAwesomeIcon icon={faXmark} style={{ fontSize: '2rem', color: '#595959' }} />
                        </button>
                      </div>
                      <ul className={cx('scroll-denounce')}>
                        {reports.map((r, index) => (
                          <li data-id={r.id} key={index}>
                            {r.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {reason != '' ? (
                      <div className={cx('send-reason')}>
                        <div className={cx('seand-reason-header', 'd-flex flex-row  align-items-center')}>
                          <button id="back-report" className="btn">
                            <FontAwesomeIcon icon={faChevronLeft} />
                          </button>
                          <span>{reason}</span>
                          <button className="btn" onClick={handleOnClickDenounceClose}>
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </div>
                        <form
                          onSubmit={handleSubmitReport}
                          className={cx('d-flex flex-column justify-content-end align-items-end')}
                        >
                          <textarea
                            placeholder="Report Description (10-50 character allowed)"
                            onChange={(e) => {
                              setContentReports(e.target.value);
                            }}
                          />
                          <button className={cx('btn text-capitalize')}>send report</button>
                        </form>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                {/* <div className={cx('flash-sale', 'd-flex flex-row justify-content-between align-items-center')}>
                  <div className={cx('flash-sale-left')}>
                    FLA
                    <FontAwesomeIcon icon={faBolt} style={{ color: '#FB517E', fontSize: '1.8rem' }} />H SALE
                  </div>
                  <time className={cx('flash-sale-right', 'd-flex align-items-center fs-5')}>
                    ENDS IN
                    <Timer className={cx('fl-timer', 'align-items-center ms-2')} deadline={'january, 24, 2024'} />
                  </time>
                </div> */}
                <div className={cx('price')}>
                  <span className={cx('discount', 'me-3')}>{product.price}</span>
                  <span className={cx('discount_Price')}>
                    {(product.price - (product.discount / 100) * product.price).toFixed(1)}
                    <span className={cx('voucher-discount', 'ms-3')}>{product.discount}%</span>
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
                {Object.entries(productType).map((pdt, index) => {
                  return (
                    <section className={cx('classify', 'd-flex flex-row')} key={index}>
                      <h3 className={cx('classify-title')}>{pdt[0]}</h3>
                      <div className={cx('classify-content', 'd-flex justify-content-start col flex-wrap')}>
                        {pdt[1].map((pt, index) => (
                          <Button
                            key={index}
                            id="button"
                            // ref={btnHlRef}
                            value={`${pt.image ? pt.image : ''}`}
                            className={cx(
                              'classify-content-element',
                              'btn-hl-ref btn-active d-flex flex-row align-items-center',
                            )}
                          >
                            <Images src={`${pt.image ? pt.image : ''}`} />
                            {pt.title}
                          </Button>
                        ))}
                      </div>
                    </section>
                  );
                })}

                <section className={cx('quantity', 'd-flex')}>
                  <h3>Quantity</h3>
                  <div className={cx('quantity-content', 'd-flex align-items-center gap-3')}>
                    <div className={cx('quantity-order', 'd-flex align-items-center')}>
                      <Button onClick={handleOnclickQuantityMinus}>
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>
                      <input
                        id="quantity_order"
                        name="quantity_order"
                        value={quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                          setQuantity(value);
                        }}
                        onKeyUp={(e) => {
                          if (e.target.value > product.quantities) {
                            setQuantity(product.quantities);
                          }
                          if (e.target.value < 1) {
                            setQuantity(1);
                          }
                        }}
                      />
                      <Button onClick={handleOnclickQuantityPlus}>
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </div>
                    <div className={cx('quantity-avail')}>{product.quantities} pieces available</div>
                  </div>
                </section>
                <div className={cx('btn-select', 'd-flex gap-4')}>
                  <form onSubmit={handleSubmitAddCart}>
                    <button className={cx('add-to-cart', 'text-capitalize')}>
                      <FontAwesomeIcon icon={faCartPlus} />
                      Add to cart
                    </button>
                  </form>
                  <form>
                    <button onSubmit={handleSubmitBuynow} className={cx('buy-now', 'text-capitalize')}>
                      buy now
                    </button>
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
          <section className={cx('shop-products')}></section>
          <ProductsDescriptions
            PD_Description={product.descriptions}
            id={'#reviews_product'}
            PD_Reviews={reviews}
            PD_topProduct={productTopShop}
            PD_Suggest={productSuggest}
            PD_store={productStore}
          />
        </div>
      ) : (
        ''
      )}
    </section>
  );
}
