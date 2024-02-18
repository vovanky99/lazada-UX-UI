import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import SlideShow from './SlideShow';
import Channels from './Channels';
import FlashSaleHome from './FlashSalesHome/FlashSaleHome';
import LazMall from './LazMall';
import Categories from './Categories';
import JustForYou from './JustForYou';

const cx = classNames.bind(styles);

function Home() {
  return (
    <section className={cx('wrapper')}>
      <div className={cx('mutiple-slide-show')}>
        <SlideShow />
      </div>
      <div className={cx('channels')}>
        <Channels />
      </div>
      <div className={cx('flash-sale')}>
        <FlashSaleHome />
      </div>
      <div className={cx('lazmall')}>
        <LazMall />
      </div>
      <div className={cx('categories')}>
        <Categories />
      </div>
      <div className={cx('just-for-you')}>
        <JustForYou />
      </div>
    </section>
  );
}

export default Home;
