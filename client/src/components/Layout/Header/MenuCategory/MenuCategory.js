import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './MenuCategory.module.scss';
import MenuChildren from './MenuChildren';
import { useState } from 'react';

const cx = classNames.bind(styles);

const MenuItems = [
  {
    id: 1,
    title: 'Home & Lifestyle',
    path: '/home-lifestyle',
    parent_id: 0,
  },
  {
    id: 2,
    title: `Women's Fashion & Accessories`,
    path: '/home-lifestyle',
    parent_id: 0,
  },
  {
    id: 3,
    title: `Men's Fashion & Accessories`,
    path: '/home-lifestyle',
    parent_id: 0,
  },

  { id: 4, title: 'Lighting', path: '/home-lifestyle', parent_id: 1 },
  { id: 5, title: 'Home Décor', path: '/home-lifestyle', parent_id: 1 },
  { id: 6, title: 'Furniture', path: '/home-lifestyle', parent_id: 1 },
  { id: 7, title: 'dacs', path: '/home-lifestyle', parent_id: 2 },
  { id: 8, title: 'Home ', path: '/home-lifestyle', parent_id: 2 },
  { id: 9, title: 'Furniture3', path: '/home-lifestyle', parent_id: 2 },
];

function MenuCategory() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('menu-category')}>
        <Link className={cx('menu-label')}>
          <span className={cx('menu-text')}>categories</span>
        </Link>
        <nav className={cx('menu-show-category')}>
          {MenuItems.map((menuItem, index) => (
            <div>
              <MenuChildren index={index} data={menuItem} />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default MenuCategory;
