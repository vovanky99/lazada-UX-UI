import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import FooterFirst from './FooterFirst';
import FooterSecond from './FooterSecond';

const cx = classNames.bind(styles);

const dataFooter = [
  {
    title: 'CONTACT US',
    data: [
      {
        title: 'Hotline & Online chat (24/7)',
        path: '/hotline-onlinechat',
      },
      {
        title: 'Help Center',
        path: '/help-center',
      },
      {
        title: 'How to Buy',
        path: '/how-to-buy',
      },
      {
        title: 'Shipping & Delivery',
        path: '/shipping-delivery',
      },
      {
        title: 'International Product Policy',
        path: '/international-product-policy',
      },
      {
        title: 'How to Return',
        path: '/how-to-return',
      },
    ],
  },
  {
    title: 'LAZADA VIETNAM',
    data: [
      {
        title: 'All Categories',
        path: '/all-category',
      },
      {
        title: 'About Lazada',
        path: '/about-lazada',
      },
      {
        title: 'Sell on Lazada',
        path: '/sell-on-lzd',
      },
      {
        title: 'Terms & Conditions',
        path: '/term-conditons',
      },
      {
        title: 'Privacy Policy',
        path: '/privacy-policy',
      },
      {
        title: 'Careers',
        path: '/careers',
      },
    ],
  },
];

function Footer() {
  return (
    <footer>
      <div className={cx('ft-first')}>
        <FooterFirst dataFooter={dataFooter} />
      </div>
      <div className={cx('ft-second')}>
        <FooterSecond />
      </div>
    </footer>
  );
}

export default Footer;
