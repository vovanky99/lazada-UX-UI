import classNames from 'classnames/bind';
import style from './Categories.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import Images from '~/components/Images';

const cx = classNames.bind(style);

function Categories() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .get('/api/posts/cat')
          .then((res) => setData(res.data))
          .catch((error) => console.log(error));
      } catch (e) {
        console.log(e);
      }
    };
    setTimeout(() => {
      fetch();
    }, 3000);
  }, []);
  return (
    <div className={cx('wrapper')}>
      <span className={cx('cat-title')}>Categories</span>
      <div className={cx('cat-content', 'd-flex flex-row flex-wrap')}>
        {data.map((cat) => (
          <div className={cx('cat-content-container')} key={cat.id}>
            <Link>
              <div className={cx('cat-img')}>
                <Images src={cat.images} alt={cat.images} />
              </div>
              <div className={cx('cats-title')}>
                <span>{cat.title}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
