import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';

import styles from './FlashSaleHome.module.scss';
import Timer from '~/components/Timer';
import { Link } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from '~/api/axios';

const cx = classNames.bind(styles);

function FlashSaleHome() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .get('/api/posts/flashsale')
          .then((res) => setProducts(res.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log('network error: ', error.message);
      }
    };
    setTimeout(() => {
      fetch();
    }, 3000);
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('flash-sale-content')}>
        <div className={cx('fs-content-header')}>
          <div className={cx('fs-content-header-left')}>
            <div className={cx('fs-text')}>
              <span className={cx('title-flash-sale')}>flash sale</span>
            </div>
            <div className={cx('fs-content-header-timer')}>
              <div className={cx('timer-time')}>
                <Timer deadline={'December, 6, 2022'} dateClass={cx('date-class')} textFs={cx('text-fs')} />
              </div>
            </div>
          </div>
          <div className={cx('fs-content-header-right')}>
            <Button className={cx('change-button')} href="#" variant="outline-danger">
              SHOP ALL PRODUCTS
            </Button>
          </div>
        </div>
        <div className={cx('flash-sale-content-body', 'd-flex flex-row')}>
          {products.map((product, index) => (
            <div className={cx('fs-content-body-container')} key={index}>
              <Link to={`products/${product.title}/${product.id}`} className={cx(`fs-content-body-unit`)}>
                <div className={cx('fs-img-container')}>
                  <Image src={product.images} />
                </div>
                <div className={cx('fs-card-text')}>
                  <span className={cx('fs-card-title')} style={{ WebkitLineClamp: '2', lineClamp: '2' }}>
                    {product.title}
                  </span>
                  <div className={cx('fs-card-price')}>
                    <span className={cx('currency')}>₫</span>
                    <span className={cx('price-discount')}>
                      {(product.price - product.price * (product.discount / 100)).toFixed(2)}
                    </span>
                  </div>
                  <div className={cx('fs-card-origin-price', 'd-flex flex-row')}>
                    <div className={cx('fs-origin-price')}>
                      <span className={cx('currency')}>₫</span>
                      <span className={cx('price')}>{product.price}</span>
                    </div>
                    <span className={cx('itemdiscount')}>-{product.discount}%</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlashSaleHome;
