import classNames from 'classnames/bind';
import styles from './JustForYou.module.scss';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import axios from '~/api/axios';

const cx = classNames.bind(styles);

//jfy allow products show
const totalLoadMore = 12;

function JFYContent() {
  const [loadMore, setLoadMore] = useState(1);
  const [products, setProducts] = useState([]);
  const handleLoadMore = () => {
    if (products.length >= loadMore * totalLoadMore) {
      setLoadMore(loadMore + 1);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .get('/api/posts/products')
          .then((res) => setProducts(res.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log('network error: ', error.message);
      }
    };
    fetch();
  }, []);
  return (
    <div>
      <Row className={cx('jfy-content')}>
        {products
          .filter((product, index) => index <= loadMore * totalLoadMore - 1)
          .map((product) => (
            <Col className={cx('jfy-content-container')} key={product.id}>
              <Link>
                <div className={cx('jfy-content-img')}>
                  <Image src={product.images} />
                </div>
                <div style={{ padding: '4px 8px 12px' }}>
                  <div className={cx('jfy-product-title')}>
                    {product.event == true ? (
                      <Image
                        src="https://lzd-img-global.slatic.net/g/gcp/lazada/84a95bc1-4abf-4c03-96ce-2bac31f35756_ALL-90-36.png_2200x2200q80.png_.webp"
                        alt="https://lzd-img-global.slatic.net/g/gcp/lazada/84a95bc1-4abf-4c03-96ce-2bac31f35756_ALL-90-36.png_2200x2200q80.png_.webp"
                      />
                    ) : (
                      ''
                    )}
                    {product.title}
                  </div>
                  <span className={cx('jfy-price-discounted')}>
                    {product.discount > 0 ? (product.price * product.discount) / 100 : product.price}
                  </span>
                  <div className={cx('jfy-price-discount')}>
                    <span className={cx('jfy-price')}>{product.discount > 0 ? product.price : ''}</span>
                    <span className={cx('jfy-discount')}>{product.discount}</span>
                  </div>
                  <div className={cx('jfy-reviews-star')}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <span className={cx('total-reviews')}>{product.total_reviews}</span>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
      </Row>

      <div className={cx('jfy-loadmore')} style={{ textAlign: 'center' }}>
        <Button onClick={handleLoadMore} variant="outline-primary">
          Load More
        </Button>
      </div>
    </div>
  );
}

export default JFYContent;
