import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';

import styles from './FlashSaleHome.module.scss';
import Timer from '~/components/Timer';
import { Link } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);

const products = [
  {
    id: 1,
    title: `điện thoại Vivo Y11 2sim ram 6G/128G máy Chính Hãng, Cày Game lướt Wed Tiktok Facebook Youtube đỉnh
    chất, Bảo hành 12 tháng - TTN 01`,
    image: 'https://lzd-img-global.slatic.net/g/p/1302e7de2d8f357dc2dda3542d628f00.jpg_400x400q80.jpg_.webp',
    price: 500000,
    discount: 50,
  },
  {
    id: 5,
    title: `điện thoại Vivo Y11 2sim ram 6G/128G máy Chính Hãng, Cày Game lướt Wed Tiktok Facebook Youtube đỉnh
    chất, Bảo hành 12 tháng - TTN 01`,
    image: 'https://lzd-img-global.slatic.net/g/p/1302e7de2d8f357dc2dda3542d628f00.jpg_400x400q80.jpg_.webp',
    price: 500000,
    discount: 50,
  },
  {
    id: 4,
    title: `điện thoại Vivo Y11 2sim ram 6G/128G máy Chính Hãng, Cày Game lướt Wed Tiktok Facebook Youtube đỉnh
    chất, Bảo hành 12 tháng - TTN 01`,
    image: 'https://lzd-img-global.slatic.net/g/p/1302e7de2d8f357dc2dda3542d628f00.jpg_400x400q80.jpg_.webp',
    price: 500000,
    discount: 50,
  },
  {
    id: 3,
    title: `điện thoại Vivo Y11 2sim ram 6G/128G máy Chính Hãng, Cày Game lướt Wed Tiktok Facebook Youtube đỉnh
    chất, Bảo hành 12 tháng - TTN 01`,
    image: 'https://lzd-img-global.slatic.net/g/p/1302e7de2d8f357dc2dda3542d628f00.jpg_400x400q80.jpg_.webp',
    price: 500000,
    discount: 50,
  },
  {
    id: 2,
    title: `điện thoại Vivo Y11 2sim ram 6G/128G máy Chính Hãng, Cày Game lướt Wed Tiktok Facebook Youtube đỉnh
    chất, Bảo hành 12 tháng - TTN 01`,
    image: 'https://lzd-img-global.slatic.net/g/p/1302e7de2d8f357dc2dda3542d628f00.jpg_400x400q80.jpg_.webp',
    price: 500000,
    discount: 50,
  },
  {
    id: 6,
    title: `điện thoại Vivo Y11 2sim ram 6G/128G máy Chính Hãng, Cày Game lướt Wed Tiktok Facebook Youtube đỉnh
    chất, Bảo hành 12 tháng - TTN 01`,
    image: 'https://lzd-img-global.slatic.net/g/p/1302e7de2d8f357dc2dda3542d628f00.jpg_400x400q80.jpg_.webp',
    price: 500000,
    discount: 50,
  },
];

function FlashSaleHome() {
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
        <Row className={cx('flash-sale-content-body')}>
          {products.map((product) => (
            <Col className={cx('fs-content-body-container')} key={product.id}>
              <Link className={cx(`fs-content-body-unit`)}>
                <div className={cx('fs-img-container')}>
                  <Image src={product.image} />
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
                    <span className={cx('itemdiscount')}>-{product.discount}%</span>
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
