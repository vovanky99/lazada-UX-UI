import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function FooterSecond() {
  return (
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
  );
}

export default FooterSecond;
