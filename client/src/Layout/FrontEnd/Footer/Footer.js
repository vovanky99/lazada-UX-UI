import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';
import Images from '~/components/Images';

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
    title: 'About Life circle',
    data: [
      {
        title: 'All Categories',
        path: '/all-category',
      },
      {
        title: 'Sell on Life Circle',
        path: '/sell-on-lfc',
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
        <div className={cx('wrapper', 'd-flex flex-row justify-content-between')}>
          {dataFooter.map((dtft, index) => (
            <div className={cx('')} key={index}>
              <div className={cx('d-flex flex-column')}>
                <h3 className={cx('ft-first-title')}>{dtft.title} </h3>
                {dtft.data.map((dt, index) => (
                  <Col key={index}>
                    <Link to={dt.path}>{dt.title}</Link>
                  </Col>
                ))}
              </div>
            </div>
          ))}
          <div>
            <Row className={cx('lzd-footer-app-downloads')}>
              <Col>
                <div className={cx('lzd-footer-appicon')}>
                  <Images src="https://lzd-img-global.slatic.net/g/tps/tfs/TB1iTziekWE3KVjSZSyXXXocXXa-42-42.png" />
                </div>
                <div className={cx('lzd-app-download-text')}>
                  <div className={cx('title')}>Go where your heart beats</div>
                  <div className={cx('text')} data-spm-anchor-id="a2o4n.home-vn.footer_top.i12.24303bdcCo87NW">
                    Download the App
                  </div>
                </div>
              </Col>
              <Col className={cx('pull-left')}>
                <a className={cx('icon-appStore-footer')} href="#"></a>
                <a className={cx('icon-android-footer')} href="#"></a>
                <a className={cx('icon-huawei-footer')} href="#"></a>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className={cx('ft-second')}>
        <div className={cx('ft-second-wrapper', 'd-flex flex-row justify-content-between')}>
          <div>
            <h3 className={cx('lfc-title')}>follow us</h3>
            <div className={cx('lfc-social-media', 'd-flex flex-row')}>
              <div>
                <Link>
                  <img
                    src="https://lzd-img-global.slatic.net/g/tps/imgextra/i3/O1CN01Wdetn224xMIRNihao_!!6000000007457-2-tps-34-34.png"
                    alt="fb"
                  ></img>
                </Link>
              </div>
              <div>
                <Link>
                  <img
                    src="https://lzd-img-global.slatic.net/g/tps/imgextra/i4/O1CN01zt1zOu1zsFnzoIWje_!!6000000006769-2-tps-34-34.png"
                    alt="yt"
                  ></img>
                </Link>
              </div>
              <div>
                <Link>
                  <img
                    src="https://lzd-img-global.slatic.net/g/tps/imgextra/i4/O1CN011gka8L1E0PIZlHK7e_!!6000000000289-2-tps-34-34.png"
                    alt="ins"
                  ></img>
                </Link>
              </div>
            </div>
          </div>
          <div className={cx('ft-second-p')}>
            <p>© Life Cilcle {new Date().getFullYear()} </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
