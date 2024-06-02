import classNames from 'classnames/bind';
import styles from '../ProductDetails.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Images from '~/components/Images';

const cx = classNames.bind(styles);

export default function ProductsSuggest({ PD, shopPD }) {
  return (
    <div className={cx('products-suggest')}>
      <div className={cx('from-store')}>
        <h4>From The Same Store</h4>
        <div className={cx('from-store-content', 'd-flex flex-row flex-wrap')}>
          {shopPD.map((pd, index) => (
            <Link
              to={`http://localhost:3000/products/${pd.title}/${pd.id}`}
              className={cx('from-store-product')}
              key={index}
            >
              <div className={cx('img')}>
                <Images src={`${pd.images}`} />
              </div>
              <div className={cx('from-store-product-content', 'd-flex flex-column')}>
                <h5>{pd.title}</h5>
                <span>{(pd.price - (pd.discount / 100) * pd.price).toFixed(1)}</span>
                <div
                  className={cx('from-store-product-star')}
                  style={{ '--rating': `${pd.score ? pd.score : 0}` }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className={cx('from-other-store')}>
        <h4>You may also like</h4>
        <div className={cx('from-other-store-content', 'd-flex flex-wrap')}>
          {PD.map((p, index) => (
            <Link
              className={cx('from-other-store-product')}
              to={`http://localhost:3000/products/${p.title}/${p.id}`}
              key={index}
            >
              <div className={cx('img')}>
                <Images src={`${p.images}`} />
              </div>
              <div className={cx('from-other-store-product-content', 'd-flex flex-column')}>
                <h5>{p.title}</h5>
                <span>{(p.price - (p.discount / 100) * p.price).toFixed(1)}</span>
                <div
                  className={cx('from-other-store-product-star')}
                  style={{ '--rating': `${p.score ? p.score : 0}` }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
