import classNames from 'classnames/bind';

import styles from './Products.module.scss';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function Products({ data, display = 'flex-column', imgWidth = '100%', Gap = '15px' }) {
  return (
    <div className={cx('wrapper', display + ' d-flex')} style={{ gap: Gap }}>
      <div className={cx('img')} style={{ width: imgWidth }}>
        <Image src={data.images} alt={data.images} />
      </div>
      <div className={cx('content', 'd-flex flex-column')}>
        <div className={cx('title')}>{data.title}</div>
        <span className={cx('price')}>{(data.price - data.price * (data.discount / 100)).toFixed(2)}</span>
        <span className={cx('discount')}>{data.discount}%</span>
        <div className={cx('footer', 'd-flex flex-row justify-content-between')}>
          <div className={cx('d-flex ', 'align-items-center')}>
            <span className={cx('quantity')}>{data.sold ? data.sold : 0} sold</span>
            <span className={cx('space')}>|</span>
            <span className={cx('rate-star')}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
          <div className={cx('area', 'text-capitalize')}>overseas</div>
        </div>
      </div>
    </div>
  );
}
