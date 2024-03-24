import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Search.Module.scss';
import SideBar from './SideBar';
import SearchContent from './SearchContent';
import axios from '~/api/axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAuthContext from '~/contexts/Auth/AuthContent';
import useDebounce from '~/Hooks/Debounce/Debounce';
import QueryString from 'qs';

const cx = classNames.bind(styles);

export default function Search() {
  const { searchTitle } = useAuthContext();
  const Params = useParams();
  const navigate = useNavigate();

  const [searchVl, setSearchVl] = useState(null);
  const [selectCat, setSelectCat] = useState('');
  const [decrease, setDecrease] = useState('');
  const [categories, setCat] = useState(null);
  const [priceTo, setPriceTo] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [reviewsScore, setReviewsScore] = useState('');
  //handle search
  useEffect(() => {
    const getSearchCat = async () => {
      try {
        if (Params.title || searchTitle) {
          const res = await axios.get('/api/search/getcat', {
            params: {
              q: Params.title || searchTitle,
            },
          });
          setCat(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    setTimeout(() => {
      getSearchCat();
    }, 3000);
  }, [searchTitle]);
  useEffect(() => {
    const getSearch = async () => {
      try {
        if (Params.title || searchTitle) {
          const res = await axios.get('/api/search', {
            params: {
              q: Params.title || searchTitle,
              order: decrease,
              cat: selectCat,
              to: priceTo, //price to
              from: priceFrom, //price from
              score: reviewsScore,
            },
          });
          setSearchVl(res.data);
        } else {
          navigate('/');
        }
      } catch (e) {
        console.log(e);
      }
    };
    setTimeout(() => {
      getSearch();
    }, 3000);
  }, [searchTitle, decrease, selectCat, priceFrom, priceTo, reviewsScore]);

  const onChangePrice = (to, from) => {
    setPriceTo(to);
    setPriceFrom(from);
  };
  const onChangeScore = (value) => {
    setReviewsScore(value);
  };
  console.log(reviewsScore);
  const onChange = (value) => {
    setDecrease(value);
  };
  const getCatID = (value) => {
    setSelectCat(value.join());
  };

  return (
    <div className={cx('search-wrapper', 'd-flex')}>
      <div className={cx('main-content', 'd-flex flex-row')}>
        <section className={cx('sidebar')}>
          {categories ? (
            <SideBar onChangeScore={onChangeScore} getCatID={getCatID} onChangePrice={onChangePrice} cat={categories} />
          ) : (
            ''
          )}
        </section>
        <section className={cx('result-content')}>
          {searchVl ? <SearchContent data={searchVl} titleSearch={Params.title} Price={onChange} /> : ''}
        </section>
      </div>
    </div>
  );
}
