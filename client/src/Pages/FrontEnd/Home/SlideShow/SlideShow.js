import classNames from 'classnames/bind';
import { Carousel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './SlideShow.module.scss';
import Images from '~/components/Images';
import CatTree from './CatTree';
import axios from '~/api/axios';

const cx = classNames.bind(styles);

function SlideShow() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const MenuItems = async () => {
      await axios.get('/api/posts/menu').then((res) => setData(res.data));
    };
    setTimeout(() => {
      MenuItems();
    }, 3000);
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('banner-container-inner', 'd-flex flex-row gap-2')}>
        {/* <div className={cx('categories-tree-container', 'd-flex flex-column col-2')}>
          {data.map((dt, index) => (
            <CatTree key={index} personData={dt} />
          ))}
         
        </div> */}
        <div className={cx('slide-left', 'col-9')}>
          <Carousel indicators={true} controls={false} fade pause={'hover'} className={cx('slide-indicator')}>
            <Carousel.Item interval={3000} className={cx('each-banner-container')}>
              <Link>
                <Images
                  className={'slide-show-img'}
                  src={
                    'https://lzd-img-global.slatic.net/us/domino/6923b579-dca9-4941-ab44-4ffef3764b7c_VN-1976-688.jpg_2200x2200q80.jpg_.webp'
                  }
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item interval={3000} className={cx('each-banner-container')}>
              <Link>
                <Images
                  className={'slide-show-img'}
                  src={
                    'https://lzd-img-global.slatic.net/us/domino/0c74466f-2c57-4a8d-9d50-c35cf1a49a68_VN-1976-688.jpg_2200x2200q80.jpg_.webp'
                  }
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item interval={3000} className={cx('each-banner-container')}>
              <Link>
                <Images
                  className={'slide-show-img'}
                  src={
                    'https://lzd-img-global.slatic.net/us/domino/71907212-cc92-4cee-afcb-972ddda1d2be_VN-1976-688.jpg_2200x2200q80.jpg_.webp'
                  }
                />
              </Link>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className={cx('slide-right', 'col d-flex flex-column gap-2')}>
          <div className={cx('img-top')}>
            <Link>
              <Images src="https://cf.shopee.vn/file/vn-50009109-a48b19584f4988dfefa3c9f785218ae1_xhdpi" />
            </Link>
          </div>
          <div className={cx('img-bottom')}>
            <Link>
              <Images src="https://cf.shopee.vn/file/vn-50009109-a48b19584f4988dfefa3c9f785218ae1_xhdpi" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideShow;
