import classNames from 'classnames/bind';
import styles from './JustForYou.module.scss';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const cx = classNames.bind(styles);

const products = [
  {
    id: 1,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 2,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 3,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 4,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 5,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 6,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 7,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 8,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 9,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 10,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 11,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 12,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 13,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 14,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 15,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 16,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 17,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 18,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 19,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 20,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 21,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 22,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 23,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
  {
    id: 24,
    title: 'Tai nghe chụp tai F10+ màu Trắng (gấp gọn được)',
    img: 'https://lzd-img-global.slatic.net/g/p/10fb9d5dc553a9869e4ada56413054df.jpg_200x200q80.jpg_.webp',
    price: 100000,
    discount: 50,
    reviews_star: 5,
    total_reviews: 1000,
    event: true,
    overseas: true,
  },
];

//jfy allow products show
const totalLoadMore = 12;

function JFYContent() {
  const [loadMore, setLoadMore] = useState(1);
  const handleLoadMore = () => {
    if (products.length > loadMore * totalLoadMore) {
      setLoadMore(loadMore + 1);
    }
  };
  return (
    <div>
      <Row className={cx('jfy-content')}>
        {products
          .filter((product) => product.id <= loadMore * totalLoadMore)
          .map((product) => (
            <Col className={cx('jfy-content-container')} key={product.id}>
              <Link>
                <div className={cx('jfy-content-img')}>
                  <Image src={product.img} />
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
                  <span className={cx('jfy-price-discounted')}>{(product.price * product.discount) / 100}</span>
                  <div className={cx('jfy-price-discount')}>
                    <span className={cx('jfy-price')}>{product.price}</span>
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
