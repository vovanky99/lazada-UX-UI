import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import Images from '~/components/Images';
import Button from '~/components/Button';

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
            <div className={cx('col')} key={index}>
              <div className={cx('d-flex flex-column')}>
                <h4 className={cx('lfc-title')}>{dtft.title} </h4>
                {dtft.data.map((dt, index) => (
                  <div className={cx('', 'col')} key={index}>
                    <Button className={cx('lfc_footer_contact_element')} to={dt.path}>
                      {dt.title}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={cx('lfc_social', 'col d-flex flex-column')}>
            <h4 className={cx('lfc-title')}>follow us</h4>
            <ul className={cx('lfc-social-media', 'd-flex flex-column')}>
              <li>
                <Button className={cx('lfc_footer_contact_element')} to="/">
                  <Images
                    className="me-2"
                    src="https://down-vn.img.susercontent.com/file/2277b37437aa470fd1c71127c6ff8eb5"
                    alt="https://down-vn.img.susercontent.com/file/2277b37437aa470fd1c71127c6ff8eb5"
                  ></Images>
                  <span>Facebook</span>
                </Button>
              </li>
              <li>
                <Button className={cx('lfc_footer_contact_element')} to="/">
                  <Images
                    className="me-2"
                    src="https://down-vn.img.susercontent.com/file/f4f86f1119712b553992a75493065d9a"
                    alt="https://down-vn.img.susercontent.com/file/f4f86f1119712b553992a75493065d9a"
                  ></Images>
                  <span>LinkedIn</span>
                </Button>
              </li>
              <li>
                <Button className={cx('lfc_footer_contact_element')} to="/">
                  <Images
                    className="me-2"
                    src="https://down-vn.img.susercontent.com/file/5973ebbc642ceee80a504a81203bfb91"
                    alt="https://down-vn.img.susercontent.com/file/5973ebbc642ceee80a504a81203bfb91"
                  ></Images>
                  <span>Instagram</span>
                </Button>
              </li>
            </ul>
          </div>
          <div className={cx('lfc-app', 'col d-flex flex-column')}>
            <h4 className={cx('lfc-title')}>LIFE CIRCLE APP DOWNLOAD</h4>
            <div className={cx('lfc-app_qr-code', 'd-flex flex-row gap-3')}>
              <Button className={cx('lfc_footer_contact_element', 'd-block p-2')} to="/">
                <Images
                  src="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472"
                  alt="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472"
                />
              </Button>
              <div className={cx('lfc-app_contain', 'col')}>
                <Button className={cx('lfc_footer_contact_element', ' p-2')} to="/">
                  <Images src="https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163" />
                </Button>
                <Button className={cx('lfc_footer_contact_element', ' p-2')} to="/">
                  <Images src="https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def" />
                </Button>
                <Button className={cx('lfc_footer_contact_element', ' p-2')} to="/">
                  <Images src="https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('ft-second')}>
        <div className={cx('ft-second-wrapper', 'd-flex justify-content-between')}>
          <p>© {new Date().getFullYear()} Life Cilcle. All Rights Reserved .</p>
          <p>Country & Region:VietNam</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
