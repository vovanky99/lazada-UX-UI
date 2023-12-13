import classNames from 'classnames/bind';

import styles from './LogoBars.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function HeaderBanner({ to, src, alt, classes }) {
  return (
    <div>
      <Link to={to}>
        <img className={cx('hdbn-img', classes)} src={src} alt={alt} />
      </Link>
    </div>
  );
}

export default HeaderBanner;
