import classNames from 'classnames/bind';

import styles from './Channels.module.scss';
import { Link } from 'react-router-dom';
import Images from '~/components/Images';

const cx = classNames.bind(styles);

function Channels() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('lazmall')}>
        <Link className={cx('rax-view')}>
          <Images
            src="https://lzd-img-global.slatic.net/g/icms/images/ims-web/b63063bc-be69-43a4-b839-574e5702bab1.png_2200x2200q80.png_.webp"
            data-once="true"
            data-spm-anchor-id="a2o4n.home-vn.6598063730.i6.d43c3bdcQ1kVrN"
          />
          <span className={cx('channel-desc')}>LazMall</span>
        </Link>
      </div>
      <div className={cx('vouchers')}>
        <Link style={{ borderLeft: '1px solid #eee' }} className={cx('rax-view')}>
          <Images
            src="https://lzd-img-global.slatic.net/us/domino/f516c1dd-162e-4ace-aa7c-61d1b59ee254_SG-240-36.png_2200x2200q80.png_.webp"
            data-once="true"
          />
          <span className={cx('channel-desc')}>Vouchers</span>
        </Link>
      </div>
      <div className={cx('top-up')}>
        <Link style={{ borderLeft: '1px solid #eee' }} className={cx('rax-view')}>
          <Images
            src="https://lzd-img-global.slatic.net/us/domino/746c05bc-701c-4072-8f88-d0e92f49c3d1_MY-240-36.jpg_2200x2200q80.jpg_.webp"
            data-once="true"
            data-spm-anchor-id="a2o4n.home-vn.6598063730.i1.b0553bdcgT1Se1"
          />
          <span className={cx('channel-desc')}>Top-Up</span>
        </Link>
      </div>
    </div>
  );
}
export default Channels;
