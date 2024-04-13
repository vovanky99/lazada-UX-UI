import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Search.Module.scss';
import SideBar from './SideBar';
import SearchContent from './SearchContent';
import axios from '~/api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Search() {
  const Params = useParams();
  const navigate = useNavigate();

  const [searchVl, setSearchVl] = useState(null);
  const [selectCat, setSelectCat] = useState([]);
  const [decrease, setDecrease] = useState('');
  const [categories, setCat] = useState(null);
  const [priceTo, setPriceTo] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [reviewsScore, setReviewsScore] = useState('');
  //handle search
  useEffect(() => {
    const getSearchCat = async () => {
      try {
        if (Params.title) {
          const res = await axios.get('/api/search/getcat', {
            params: {
              q: Params.title,
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
  }, []);

  useEffect(() => {
    const catSL = selectCat.join(',');
    const getSearch = async () => {
      try {
        if (Params.title) {
          const res = await axios.get('/api/search', {
            params: {
              q: Params.title,
              order: decrease,
              cat: catSL,
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
  }, [decrease, selectCat, priceFrom, priceTo, reviewsScore]);

  const onChangePrice = (to, from) => {
    setPriceTo(to);
    setPriceFrom(from);
  };
  const onChangeScore = (value) => {
    setReviewsScore(value);
  };
  const onChange = (value) => {
    setDecrease(value);
  };
  const getCatID = (value) => {
    if (selectCat.indexOf(value) >= 0) {
      setSelectCat((state) => state.filter((item) => item != value));
    } else if (value == '') {
      setSelectCat([]);
    } else {
      setSelectCat((oldValue) => [...oldValue, value]);
    }
  };

  return (
    <div className={cx('search-wrapper', 'd-flex')}>
      <div className={cx('main-content', 'd-flex flex-row')}>
        {searchVl && categories ? (
          <>
            <section className={cx('sidebar')}>
              <SideBar
                onChangeScore={onChangeScore}
                getCatID={getCatID}
                onChangePrice={onChangePrice}
                cat={categories}
              />
            </section>
            <section className={cx('result-content')}>
              <SearchContent data={searchVl} titleSearch={Params.title} Price={onChange} />
            </section>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
