import classNames from 'classnames/bind';

import styles from './DetailInfo.module.scss';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

export default function DetailInfo({ cat }) {
  return (
    <div className={cx('detail_info', 'd-flex flex-column')}>
      <h4 className={cx('title', cat && 'text-black')}>
        <Translate>pages.seller.add_product.detail_info</Translate>
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
