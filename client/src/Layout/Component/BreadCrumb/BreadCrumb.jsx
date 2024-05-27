import classNames from 'classnames/bind';

import styles from './BreadCrumb.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Bread from './Bread';

const cx = classNames.bind(styles);

export default function BreadCrumb({ className, path, isAdmin = false, isClient = false, isManageShop = false }) {
  let currentLink = '';
  const disabled = path.split('/').slice(1).length - 1;
  const crumbs = path
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb, index) => {
      currentLink += `/${crumb}`;
      return (
        <div key={index} className=" d-flex flex-row align-items-center">
          <Bread
            className={cx('text-capitalize')}
            path={currentLink}
            rolePath={isAdmin ? 'admin' : isClient ? 'client' : isManageShop ? 'manageshop' : ''}
            disabled={index === disabled ? true : false}
          />
          <FontAwesomeIcon icon={faChevronRight} style={{ display: index === disabled ? 'none' : 'inline-block' }} />
        </div>
      );
    });

  return <nav className={cx('breadcrumb', className + ' d-flex flex-row')}>{crumbs}</nav>;
}
