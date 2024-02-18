import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './LogoBars.module.scss';
import HeaderBanner from './HeaderBanner';
import { Col, Row } from 'react-bootstrap';
import SearchResult from './SearchResult';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '~/Hooks/Debounce/Debounce';

import * as SearchServices from '~/Services/SearchServices';

const cx = classNames.bind(styles);

function LogoBars() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [delay, setDelay] = useState(500);
  const debounceValue = useDebounce(searchValue, delay);

  const lengthBold = searchValue.length;
  useEffect(() => {
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }
    const getProductsSearch = async () => {
      const result = await SearchServices.search(debounceValue);
      setSearchResult(result);
    };
    getProductsSearch();
  }, [debounceValue]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  return (
    <div className={cx('wrapper')}>
      <Row className={cx('logo-bars-content')}>
        <Col xl={2} className={cx('logo')}>
          <Link to="/">
            <img
              src={require('~/assets/images/logo2/png/logo-no-background.png')}
              alt="Online Shopping Life Circle Logo"
              data-spm-anchor-id="a2o4n.home.dhome.i0.68b43bdcN0AOoI"
            />
          </Link>
        </Col>
        <Col xl={7} className={cx('search-container')}>
          <Tippy
            interactive
            visible={showResult && searchValue.length > 0}
            offset={[-16, 0]}
            render={(attrs) => (
              <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                <ul className={cx('search-result-main')}>
                  {searchResult.map((d, index) => (
                    <SearchResult title={d.title} key={index} lengthBold={lengthBold} delay={delay} />
                  ))}
                </ul>
              </div>
            )}
            onClickOutside={handleHideResult}
          >
            <div className={cx('search-content')}>
              <input
                onChange={handleChange}
                onFocus={() => {
                  setShowResult(true);
                }}
                name="search"
                placeholder="Search in Life Circle"
              />
              <button>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </Tippy>
        </Col>
        <Col xl={1} className={cx('nav-cars')}>
          <Link>
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
        </Col>
        <Col xl={2}>
          <HeaderBanner
            to={'//www.lazada.vn/lazada-co-brand-card?spm=a2o4n.home.header.dewallet.68b43bdcN0AOoI'}
            src={'//icms-image.slatic.net/images/ims-web/2069479e-741a-4807-8469-298d9e86ead7.png'}
            alt={'VIB_100K'}
          />
        </Col>
      </Row>
    </div>
  );
}

export default LogoBars;
