import classNames from 'classnames/bind';

import styles from './SubLayout.module.scss';
import Header from '../Header';
import Seller from '~/layout/Component/Seller';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

export default function SubLayout({ children }) {
  const { seller } = useSelector((state) => state.Auth);
  return (
    <Seller>
      <div className={cx('wrapper', 'd-flex flex-row')}>
        <Header title="seller_centre" />
        {seller?.shop?.status && <main className={cx('seller_main')}>{children}</main>}
      </div>
    </Seller>
  );
}
