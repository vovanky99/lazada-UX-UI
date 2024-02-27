import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './MenuCategory.module.scss';
import MenuChildren from './MenuChildren';
import { useEffect, useState } from 'react';
import axios from '~/api/axios';

const cx = classNames.bind(styles);

function MenuCategory() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const MenuItems = async () => {
      await axios
        .get('http://127.0.0.1:8000/api/posts/menu')
        .then((res) => setData(res.data))
        .catch((e) => console.log(e));
    };
    MenuItems();
  }, [data]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('menu-category')}>
        <Link className={cx('menu-label')}>
          <span className={cx('menu-text')}>categories</span>
        </Link>
        <nav className={cx('menu-show-category')}>
          {data.map((d, index) => (
            <div>
              <MenuChildren index={index} data={d} />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default MenuCategory;
