import classNames from 'classnames/bind';
import style from './Categories.module.scss';
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

const categories = [
  {
    id: 1,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 2,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 3,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 4,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 5,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 6,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 7,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 8,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 9,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 10,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 11,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 12,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 13,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 14,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 15,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
  {
    id: 16,
    title: 'Wireless and Bluetooth Speakers',
    images: 'https://lzd-img-global.slatic.net/g/p/7798493caebb76b50b8a5aa8f290ddad.jpg_170x170q80.jpg_.webp',
  },
];

function Categories() {
  return (
    <div className={cx('wrapper')}>
      <span className={cx('cat-title')}>Categories</span>
      <Row className={cx('cat-content')}>
        {categories.map((cat) => (
          <Col className={cx('cat-content-container')} key={cat.id}>
            <Link>
              <div className={cx('cat-img')}>
                <Image src={cat.images} alt={cat.images} />
              </div>
              <div className={cx('cats-title')}>
                <span>{cat.title}</span>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Categories;
