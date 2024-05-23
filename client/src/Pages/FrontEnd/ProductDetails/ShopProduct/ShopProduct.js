import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShop } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';

const cx = classNames.bind(styles);
export default function ShopProduct() {
  return (
    <>
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
    </>
  );
}
