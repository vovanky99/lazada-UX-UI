import classNames from 'classnames/bind';

import styles from './SalesInfo.module.scss';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

export default function SalesInfo({ cat = false }) {
  return (
    <div className={cx('sales_info', 'd-flex flex-column')}>
      <h4 className={cx('title', cat && 'text-black')}>
        <Translate>pages.seller.add_product.sales_info</Translate>
      </h4>
      {cat ? (
        <div className={cx('content')}></div>
      ) : (
        <div className={cx('none_content')}>
          <Translate>pages.seller.add_product.have_not_select_cat</Translate>
        </div>
      )}
    </div>
  );
}
