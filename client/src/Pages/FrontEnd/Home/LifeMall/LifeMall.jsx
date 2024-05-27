import classNames from 'classnames/bind';

import style from './LifeMall.module.scss';
import { Link } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '~/api/axios';

import { useEffect, useState } from 'react';
import Images from '~/components/Images';

const cx = classNames.bind(style);

function LifeMall() {
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
      <div className={cx('lfc-container')}>
        <div className={cx('lfc-header', 'd-flex flex-row justify-content-between align-items-center')}>
          <h4 className={cx('lfc-header-left')}>Life Mall</h4>
          <Link className={cx('lfc-header-right')}>
            <span className="text-capitalize" href="#">
              Shop More <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </Link>
        </div>
        <div className={cx('lfc-content', 'd-flex flex-row flex-wrap')}>
          {data.map((lzs) => (
            <div className={cx('lfc-content-container')} key={lzs.id}>
              <Link>
                <div className={cx('lfc-img-cover')}>
                  <Images src={lzs.img_cover} />
                </div>
                <div className={cx('lfc-logo')}>
                  <Images src={lzs.logo} />
                </div>
                <span className={cx('card-official-stores-h1')}>{lzs.name}</span>
                <span className={cx('card-official-stores-p')}>{lzs.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LifeMall;
