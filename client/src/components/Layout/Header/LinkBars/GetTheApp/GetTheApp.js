import classNames from 'classnames/bind';
import { Row, Col, Stack } from 'react-bootstrap';

import styles from './GetTheApp.module.scss';
const cx = classNames.bind(styles);
function GetTheApp() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>Download the App for the best experience</div>
      <Row className={cx('get-the-app-promotion', 'd-flex flex-row')}>
        <Col className={cx('get-the-app-qr', 'col-6')}>
          <img
            className={cx('get-the-app-lazada-qr')}
            src="//laz-img-cdn.alicdn.com/images/ims-web/TB18FIJtBLoK1RjSZFuXXXn0XXa.png"
            alt="//laz-img-cdn.alicdn.com/images/ims-web/TB18FIJtBLoK1RjSZFuXXXn0XXa.png"
          />
        </Col>
        <Col className={cx('promotion-text', 'col-6')}>
          <a
            href="//www.lazada.vn/wow/i/vn/VNCampaign/uu-dai-tren-lazada-app/?spm=a2o4n.home.header.2.4e383bdcwQI1oV"
            data-spm-anchor-id="a2o4n.home.header.2"
          >
            <div className={cx('get-the-app-download-text', 'd-flex flex-column')}>
              <p data-spm-anchor-id="a2o4n.home.header.i1.4e383bdcwQI1oV">Shop through our app to enjoy:&nbsp;</p>
              <ul>
                <li>Exclusive Vouchers&nbsp;</li>
                <li>Better deals&nbsp;</li>
                <li>Personalised recommendations&nbsp;</li>
                <li>Find out first&nbsp;</li>
              </ul>
            </div>
          </a>
        </Col>
      </Row>
      <Row className={cx('app-store')}>
        <Col>
          <a href="#" className={cx('store-link')} data-spm-anchor-id="a2o4n.home.header.3">
            <i className={cx('app-apple')} data-spm-anchor-id="a2o4n.home.header.i5.19053bdcaI2Uej"></i>
          </a>
        </Col>
        <Col>
          <a href="#" className={cx('store-link')} data-spm-anchor-id="a2o4n.home.header.4">
            <i className={cx('app-google')}></i>
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default GetTheApp;
