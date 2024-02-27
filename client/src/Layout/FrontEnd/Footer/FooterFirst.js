import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function FooterFirst({ dataFooter }) {
  return (
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
              <Image src="https://lzd-img-global.slatic.net/g/tps/tfs/TB1iTziekWE3KVjSZSyXXXocXXa-42-42.png" />
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
  );
}

export default FooterFirst;
