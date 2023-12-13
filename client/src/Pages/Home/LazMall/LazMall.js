import classNames from 'classnames/bind';

import style from './LazMall.module.scss';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(style);

const lzShop = [
  {
    id: 1,
    name: 'Thảo Nguyên Shop',
    logo: 'https://lzd-img-global.slatic.net/g/shop/85843141db5651c3e46c8c63072e9bb9.jpeg_2200x2200q80.jpg_.webp',
    cover_image: 'https://lzd-img-global.slatic.net/g/p/cec3573ae164b42fc902773a7d69f3d5.png_400x400q80.png_.webp',
  },
  {
    id: 2,
    name: 'Thảo Nguyên Shop',
    logo: 'https://lzd-img-global.slatic.net/g/shop/85843141db5651c3e46c8c63072e9bb9.jpeg_2200x2200q80.jpg_.webp',
    cover_image: 'https://lzd-img-global.slatic.net/g/p/cec3573ae164b42fc902773a7d69f3d5.png_400x400q80.png_.webp',
  },
  {
    id: 3,
    name: 'Thảo Nguyên Shop',
    logo: 'https://lzd-img-global.slatic.net/g/shop/85843141db5651c3e46c8c63072e9bb9.jpeg_2200x2200q80.jpg_.webp',
    cover_image: 'https://lzd-img-global.slatic.net/g/p/cec3573ae164b42fc902773a7d69f3d5.png_400x400q80.png_.webp',
  },
  {
    id: 4,
    name: 'Thảo Nguyên Shop',
    logo: 'https://lzd-img-global.slatic.net/g/shop/85843141db5651c3e46c8c63072e9bb9.jpeg_2200x2200q80.jpg_.webp',
    cover_image: 'https://lzd-img-global.slatic.net/g/p/cec3573ae164b42fc902773a7d69f3d5.png_400x400q80.png_.webp',
  },
  {
    id: 5,
    name: 'Thảo Nguyên Shop',
    logo: 'https://lzd-img-global.slatic.net/g/shop/85843141db5651c3e46c8c63072e9bb9.jpeg_2200x2200q80.jpg_.webp',
    cover_image: 'https://lzd-img-global.slatic.net/g/p/cec3573ae164b42fc902773a7d69f3d5.png_400x400q80.png_.webp',
  },
  {
    id: 6,
    name: 'Thảo Nguyên Shop',
    logo: 'https://lzd-img-global.slatic.net/g/shop/85843141db5651c3e46c8c63072e9bb9.jpeg_2200x2200q80.jpg_.webp',
    cover_image: 'https://lzd-img-global.slatic.net/g/p/cec3573ae164b42fc902773a7d69f3d5.png_400x400q80.png_.webp',
  },
];

function LazMall() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('lz-container')}>
        <div className={cx('lz-header')}>
          <span className={cx('lz-header-left')}>LazMall</span>
          <Link className={cx('lz-header-right')}>
            <span href="#">
              Shop More <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </Link>
        </div>
        <Row className={cx('lz-content')}>
          {lzShop.map((lzs) => (
            <Col className={cx('lz-content-container')} key={lzs.id}>
              <Link>
                <div className={cx('lz-img-cover')}>
                  <Image src={lzs.cover_image} />
                </div>
                <div className={cx('lz-logo')}>
                  <Image src={lzs.logo} />
                </div>
                <span className={cx('card-official-stores-h1')}>{lzs.name}</span>
                <span className={cx('card-official-stores-p')}>{lzs.name}</span>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default LazMall;
