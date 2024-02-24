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
        <Image
          src="https://lzd-img-global.slatic.net/g/p/f2427846325bd9783b54a24a53f4f150.jpg_200x200q80.jpg_.webp"
          alt="https://lzd-img-global.slatic.net/g/p/f2427846325bd9783b54a24a53f4f150.jpg_200x200q80.jpg_.webp"
        />
      </div>
      <div className={cx('content', 'd-flex flex-column')}>
        <div className={cx('title')}>
          Rocoren 3A Micro USB Fast Charging Charger Cable for Samsung Redmi Huawei Android Mobile Phone USB Cable
        </div>
        <span className={cx('price')}>29,000</span>
        <span className={cx('discount')}>47% Off</span>
        <div className={cx('footer', 'd-flex flex-row justify-content-between')}>
          <div className={cx('d-flex ', 'align-items-center')}>
            <span className={cx('quantity')}>18 sold</span>
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
