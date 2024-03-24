import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFilter, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReguler } from '@fortawesome/fontawesome-free-regular';

import styles from './SideBar.module.scss';
import Checkbox from '~/Layout/FrontEnd/Checkbox';
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';
import useDebounce from '~/Hooks/Debounce/Debounce';

const cx = classNames.bind(styles);
export default function SideBar({ getCatID, onChangePrice, onChangeScore, cat }) {
  const catRef = useRef();
  const [priceWarning, setPriceWarning] = useState('');
  const [priceStart, setPriceStart] = useState('');
  const [priceEnd, setPriceEnd] = useState('');
  const [showCat, setShowCat] = useState(false);
  const [catValue, setCatValue] = useState([]);
  const [score, setScore] = useState('');
  const [newCatValue, setNewCatValue] = useState([]);

  useEffect(() => {
    let c = catRef.current;

    const handleclickShowCat = (e) => {
      setShowCat(true);
    };
    if (c) {
      c.addEventListener('click', handleclickShowCat);
    }
    return () => {
      if (c) {
        c.removeEventListener('click', handleclickShowCat);
      }
    };
  }, [showCat]);

  //get cat id
  getCatID(useDebounce(catValue, 300));
  useEffect(() => {
    let select_cat = document.querySelectorAll('.select-cat');
    const handleClickSelectCat = (e) => {
      if (catValue.indexOf(parseInt(e.target.value)) >= 0) {
        const newValue = catValue;
        newValue.splice(catValue.indexOf(parseInt(e.target.value)), 1);
        setNewCatValue(newValue);
        setCatValue(newCatValue);
      } else {
        setCatValue((oldValue) => [...oldValue, parseInt(e.target.value)]);
      }
    };
    if (select_cat) {
      select_cat.forEach((e) => e.addEventListener('click', handleClickSelectCat));
    }
    return () => {
      if (select_cat) {
        select_cat.forEach((e) => e.removeEventListener('click', handleClickSelectCat));
      }
    };
  }, [catValue, newCatValue]);
  //handle set filter reviews score
  onChangeScore(score);
  useEffect(() => {
    let reviews = document.querySelectorAll('.reviews_score');
    const handleClickScore = (e) => {
      if (e.currentTarget.classList.contains('score_active') == false) {
        for (let i = 0; i < reviews.length; i++) {
          if (reviews[i].classList.contains) {
            reviews[i].classList.remove('score_active');
            e.currentTarget.classList.add('score_active');
          }
        }
      } else {
        e.currentTarget.classList.remove('score_active');
      }
      if (score == parseInt(e.target.value)) {
        setScore('');
      } else {
        setScore(parseInt(e.target.value));
      }
    };
    if (reviews) {
      reviews.forEach((e) => e.addEventListener('click', handleClickScore));
    }
    return () => {
      if (reviews) {
        reviews.forEach((e) => e.addEventListener('click', handleClickScore));
      }
    };
  }, [score]);

  //handle search allow price
  const handleSubmitRangePrice = (e) => {
    e.preventDefault();
    if (priceStart > priceEnd) {
      setPriceWarning('please enter price start smaller price end');
    } else if (!priceEnd && !priceStart) {
      setPriceWarning('please set price!');
    } else {
      setPriceWarning('');
      onChangePrice(priceStart ? priceStart : 0, priceEnd ? priceEnd : 0);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>
        <FontAwesomeIcon icon={faFilter} /> BỘ LỌC TÌM KIẾM
      </h2>
      {/* filter products cat */}
      <fieldset className={cx('filter-group_cat')}>
        <legend className={cx('filter-group_header')}>By Category</legend>

        {cat.slice(0, showCat == false ? 5 : cat.length).map((cat, index) => (
          <div key={index} className={cx('checkbox-filter')}>
            <Checkbox
              checkboxclass="select-cat"
              valueInput={cat.cat_id}
              ClassName={cx('filter-checkbox')}
              Label={cat.cat_title}
              BorderColer="#00000042"
              Size="13px"
              Top="3px"
              IconCheck={cx('icon-check')}
            />
          </div>
        ))}
        {showCat == false ? (
          <button ref={catRef} className={cx('show')}>
            Show <FontAwesomeIcon icon={faChevronDown} />
          </button>
        ) : (
          ''
        )}
      </fieldset>
      {/* location sell */}
      {/* <fieldset className={cx('filter-group_cat')}>
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
      </fieldset> */}
      {/* filter price */}
      <fieldset className={cx('filter-group_cat')}>
        <legend className={cx('filter-group_header')}>Theo Danh Mục</legend>
        <form onSubmit={handleSubmitRangePrice}>
          <div className={cx('filter-price', 'd-flex flex-row align-items-start')}>
            <input
              className={cx('to')}
              placeholder="Từ"
              value={priceStart}
              onChange={(e) => {
                setPriceStart(parseInt(e.target.value.replace(/[^0-9]/g, '')));
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
                setPriceEnd(parseInt(e.target.value.replace(/[^0-9]/g, '')));
              }}
              onKeyUp={() => {
                if (priceEnd < 0) {
                  setPriceEnd(1);
                }
              }}
            />
          </div>
          {priceWarning != '' ? <span className="text-danger mb-3 d-block fs-5">{priceWarning}</span> : ''}
          <button className={cx('apply', 'btn')}>APPLY</button>
        </form>
      </fieldset>
      {/* filter rate star */}
      <fieldset className={cx('filter-group_cat', 'd-flex flex-column gap-3')}>
        <legend className={cx('filter-group_header')}>Theo Danh Mục</legend>
        <Button value={5} className={cx('check-star-filter', 'reviews_score d-flex flex-row gap-2 align-items-center')}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </Button>
        <Button value={4} className={cx('check-star-filter', 'reviews_score d-flex flex-row gap-2 align-items-center')}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarReguler} />
          Up
        </Button>
        <Button
          value={3}
          className={cx('check-star-filter', ' reviews_score d-flex flex-row gap-2 align-items-center')}
        >
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          Up
        </Button>

        <Button value={2} className={cx('check-star-filter', 'reviews_score d-flex flex-row gap-2 align-items-center')}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          Up
        </Button>
        <Button value={1} className={cx('check-star-filter', 'reviews_score d-flex flex-row gap-2 align-items-center')}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          <FontAwesomeIcon icon={faStarReguler} />
          up
        </Button>
      </fieldset>
      {/* delete all select */}
      <Button className={cx('delete-all')}>DELETE ALL</Button>
    </div>
  );
}
