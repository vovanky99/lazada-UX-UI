import classNames from 'classnames/bind';

import styles from '../../Products.module.scss';

const cx = classNames.bind(styles);

export default function SalesInfo() {
  return <div className={cx('seller_product', 'd-flex flex-row')}></div>;
}
