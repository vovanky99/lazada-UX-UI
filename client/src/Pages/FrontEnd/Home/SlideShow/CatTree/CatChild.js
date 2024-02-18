import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../SlideShow.module.scss';
import routes from '~/config/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function CatChild({ id, name, slug }) {
  return (
    <li>
      <Link
        key={id}
        to={routes.Cat + '/' + slug}
        className={cx('cat-child', 'd-flex justify-content-between align-items-center text-capitalize')}
      >
        {name}
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </li>
  );
}
