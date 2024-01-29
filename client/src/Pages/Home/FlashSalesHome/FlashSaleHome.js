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
          .get('http://127.0.0.1:8000/api/posts/flashsale')
          .then((res) => setProducts(res.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log('network error: ', error.message);
      }
    };
    fetch();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <span className={cx('title-flash-sale')}>flash sale</span>
      <div className={cx('flash-sale-content')}>
        <div className={cx('fs-content-header')}>
          <div className={cx('fs-content-header-left')}>
            <div className={cx('fs-text')}>on sale now</div>
            <div className={cx('fs-content-header-timer')}>
              <div className={cx('timer-text')}>Ending in</div>
              <div className={cx('timer-time')}>
                <Timer deadline={'December, 6, 2022'} />
              </div>
            </div>
          </div>
          <div className={cx('fs-content-header-right')}>
            <Button className={cx('change-button')} href="#" variant="outline-danger">
              SHOP ALL PRODUCTS
            </Button>
          </div>
        </div>
        <Row className={cx('flash-sale-content-body', 'flex-wrap gap-3')}>
          {products.map((product) => (
            <Col className={cx('fs-content-body-container', 'p-0')} key={product.id}>
              <Link className={cx(`fs-content-body-unit`)}>
                <div className={cx('fs-img-container')}>
                  <Image src={product.images} />
                </div>
                <div className={cx('fs-card-text')}>
                  <span className={cx('fs-card-title')} style={{ WebkitLineClamp: '2', lineClamp: '2' }}>
                    {product.title}
                  </span>
                  <div className={cx('fs-card-price')}>
                    <span className={cx('currency')}>₫</span>
                    <span className={cx('price-discount')}>{Math.floor((product.price * product.discount) / 100)}</span>
                  </div>
                  <div className={cx('fs-card-origin-price')}>
                    <div className={cx('fs-origin-price')}>
                      <span className={cx('currency')}>₫</span>
                      <span className={cx('price')}>{product.price}</span>
                    </div>
                    <span className={cx('itemdiscount', 'pb-5')}>-{product.discount}%</span>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default FlashSaleHome;
