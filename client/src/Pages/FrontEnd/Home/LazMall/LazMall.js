import classNames from 'classnames/bind';

import style from './LazMall.module.scss';
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '~/api/axios';

import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function LazMall() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get('http://127.0.0.1:8000/api/posts/shop')
          .then((res) => setdata(res.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log('Network Error:', error.message);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 3000);
    // clearTimeout(mytimeout);
  }, []);
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
        <Row className={cx('lz-content', 'gap-3 flex-wrap')}>
          {data.map((lzs) => (
            <Col className={cx('lz-content-container', 'p-0')} key={lzs.id}>
              <Link>
                <div className={cx('lz-img-cover')}>
                  <Image src={lzs.img_cover} />
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
