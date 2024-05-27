import classNames from 'classnames/bind';

import styles from './LogoBars.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function HeaderBanner({ to, src, alt, className }) {
  return (
    <div>
      <Link className={cx('container-img')}>
        <img className={cx('hdbn-img', className)} src={src} alt={alt} />
      </Link>
    </div>
  );
}

export default HeaderBanner;
