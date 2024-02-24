import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFilter, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReguler } from '@fortawesome/fontawesome-free-regular';

import styles from './SideBar.module.scss';
import Checkbox from '~/Layout/FrontEnd/Checkbox';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const cx = classNames.bind(styles);
export default function SideBar({ data }) {
  const [priceWarning, setPriceWarning] = useState('');
  const [priceStart, setPriceStart] = useState('');
  const [priceEnd, setPriceEnd] = useState('');

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>
        <FontAwesomeIcon icon={faFilter} /> BỘ LỌC TÌM KIẾM
      </h2>
      {/* filter products cat */}
      <fieldset className={cx('filter-group_cat')}>
        <legend className={cx('filter-group_header')}>Theo Danh Mục</legend>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <button className={cx('show')}>
          Show <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </fieldset>
      {/* location sell */}
      <fieldset className={cx('filter-group_cat')}>
        <legend className={cx('filter-group_header')}>Theo Danh Mục</legend>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <button className={cx('show')}>
          Show <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </fieldset>
      {/* filter price */}
      <fieldset className={cx('filter-group_cat')}>
        <legend className={cx('filter-group_header')}>Theo Danh Mục</legend>
        <div className={cx('filter-price', 'd-flex flex-row align-items-start')}>
          <input
            className={cx('to')}
            placeholder="Từ"
            value={priceStart}
            onChange={(e) => {
              setPriceStart(e.target.value.replace(/[^0-9]/g, ''));
            }}
            onKeyUp={() => {
              if (priceStart < 0) {
                setPriceStart(1);
              }
            }}
          />
          <div className={cx('space')}>__</div>
          <input
            className={cx('from')}
            placeholder="Đến"
            value={priceEnd}
            onChange={(e) => {
              setPriceEnd(e.target.value.replace(/[^0-9]/g, ''));
            }}
            onKeyUp={() => {
              if (priceEnd < 0) {
                setPriceEnd(1);
              }
            }}
          />
        </div>
        {priceWarning != '' ? <span>{priceWarning}</span> : ''}
        <button className={cx('apply', 'btn')}>APPLY</button>
      </fieldset>

      {/* filter products status */}
      <fieldset className={cx('filter-group_cat')}>
        <legend className={cx('filter-group_header')}>Theo Danh Mục</legend>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <div className={cx('checkbox-filter')}>
          <Checkbox
            ClassName={cx('filter-checkbox')}
            Label="Thời Trang Nam (249k+)"
            BorderColer="#00000042"
            Size="13px"
            Top="3px"
            IconCheck={cx('icon-check')}
          />
        </div>
        <button className={cx('show')}>
          Show <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </fieldset>
      {/* filter rate star */}
      <fieldset className={cx('filter-group_cat', 'd-flex flex-column gap-3')}>
        <legend className={cx('filter-group_header')}>Theo Danh Mục</legend>
        <div className={cx('check-star-filter', 'd-flex flex-row gap-2 align-items-center')}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
        <div className={cx('check-star-filter', 'd-flex flex-row gap-2 align-items-center')}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarReguler} />
          Up
        </div>
        <div className={cx('check-star-filter', 'd-flex flex-row gap-2 align-items-center')}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          Up
        </div>

        <div className={cx('check-star-filter', 'd-flex flex-row gap-2 align-items-center')}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          Up
        </div>
        <div className={cx('check-star-filter', 'd-flex flex-row gap-2 align-items-center')}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          up
        </div>
      </fieldset>
      {/* delete all select */}
      <Button className={cx('delete-all')}>DELETE ALL</Button>
    </div>
  );
}
