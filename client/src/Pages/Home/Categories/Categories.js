import classNames from 'classnames/bind';
import style from './Categories.module.scss';
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '~/api/axios';

const cx = classNames.bind(style);

function Categories() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .get('http://127.0.0.1:8000/api/posts/cat')
          .then((res) => setData(res.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log('Network Error:', error.message);
      }
    };
    fetch();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <span className={cx('cat-title')}>Categories</span>
      <Row className={cx('cat-content')}>
        {data.map((cat) => (
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
