import classNames from 'classnames/bind';

import styles from '~/layout/ShopSeller/Footer/Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <>
      <footer className={cx('seller_footer')}>
        <h2>footer</h2>
      </footer>
    </>
  );
}
