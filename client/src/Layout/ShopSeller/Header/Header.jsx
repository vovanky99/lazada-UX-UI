import classNames from 'classnames/bind';

import styles from '~/layout/ShopSeller/MainLayout/MainLayout.module.scss';

const cx = classNames.bind(styles);

export default function Header() {
  return (
    <>
      <header className={cx('seller_header')}>
        <h2>header</h2>
      </header>
    </>
  );
}
