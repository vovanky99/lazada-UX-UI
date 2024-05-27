import classNames from 'classnames/bind';
import styles from './BreadCumbs.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';

const cx = classNames.bind(styles);

export default function BreadCumds() {
  return (
    <>
      <nav className={cx('breadcum', 'py-3')}>
        <ul className={cx('d-flex flex-row fs-5')} style={{ listStyle: 'none', marginBottom: '0' }}>
          <li className={cx('')}>
            <Link to={config.routes.cat}>
              Computers & Laptops
              <FontAwesomeIcon icon={faChevronRight} className="mx-2" />
            </Link>
          </li>
          <li>
            <Link to={config.routes.cart}>
              Desktops Computers
              <FontAwesomeIcon icon={faChevronRight} className="mx-2" />
            </Link>
          </li>
          <li>
            <Link to={config.routes.cat}>
              Gaming Desktops
              <FontAwesomeIcon icon={faChevronRight} className="mx-2" />
            </Link>
          </li>
          <li>
            <span style={{ color: 'gray' }}>Gaming Desktops</span>
          </li>
        </ul>
      </nav>
    </>
  );
}
