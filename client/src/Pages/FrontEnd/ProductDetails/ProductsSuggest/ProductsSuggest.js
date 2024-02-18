import classNames from 'classnames/bind';
import styles from '../ProductDetails.module.scss';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function ProductsSuggest() {
  return (
    <div className={cx('products-suggest')}>
      <div className={cx('from-store')}>
        <h4>From The Same Store</h4>
        <div className={cx('from-store-content', 'd-flex')}>
          <Link className={cx('from-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className={cx('from-other-store')}>
        <h4>You may also like</h4>
        <div className={cx('from-other-store-content', 'd-flex flex-wrap')}>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
          <Link className={cx('from-other-store-product')}>
            <div className={cx('img')}>
              <Image src="https://img.lazcdn.com/g/p/e39064ea746da15aeb08a7a924292cd6.jpg_200x200q80.jpg_.webp" />
            </div>
            <div className={cx('from-other-store-product-content')}>
              <h5>(Voucher) Sở Hữu Điện Thoại lP15 Pro Max 512GB VNA</h5>
              <span>38,000</span>
              <div className={cx('from-other-store-product-star')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
