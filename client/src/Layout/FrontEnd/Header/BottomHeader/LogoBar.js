import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './LogoBars.module.scss';
import HeaderBanner from './HeaderBanner';
import SearchResult from './SearchResult';
import useDebounce from '~/Hooks/Debounce/Debounce';
import * as SearchServices from '~/Services/SearchServices';
import config from '~/config';
import useAuthContext from '~/contexts/Auth/AuthContent';
import Images from '~/components/Images';

const cx = classNames.bind(styles);

function LogoBars() {
  const { setSearchTitle } = useAuthContext();
  const location = useLocation();
  const Params = useParams();
  let searchResultRef = useRef();
  let ctnWidthSearhRef = useRef();

  //set default when run routes search
  let defaultSearch = '';
  if (location.pathname.indexOf('/search') >= 0) {
    defaultSearch = Params.title;
  }
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(defaultSearch || '');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [delay, setDelay] = useState(500);
  const debounceValue = useDebounce(searchValue, delay);
  // const lengthBold = useDebounce(searchValue.length, delay);

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
    sessionStorage.setItem('search_value', searchValue);
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

  //handle search click
  const handleClickSearch = (e) => {
    setSearchValue(e.target.childNodes[0].textContent);
    setSearchTitle(searchValue);
    setShowResult(false);
  };
  //handle submit form search
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSearchTitle(searchValue);
    navigate(`/search/` + searchValue);
    setShowResult(false);
  };

  //handle tippy reponsive
  useEffect(() => {
    const rs = searchResultRef.current;
    const width = ctnWidthSearhRef.current;
    const onWindowResize = () => {
      rs.style.width = `${width.offsetWidth}px`;
    };
    if (rs && width) {
      window.addEventListener('resize', onWindowResize);
    }
    if (rs && width) {
      onWindowResize();
    }
    return () => {
      if (rs && width) {
        window.removeEventListener('resize', onWindowResize);
      }
    };
  }, [searchValue]);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('logo-bars-content', 'row align-items-center')}>
        <div className={cx('logo', 'col-xl-2 col col-lg-2 col-md-3 col-sm-3')}>
          <Link className={cx('logo-normal')} to="/">
            <img
              src={require('~/assets/images/logo2/png/logo-no-background.png')}
              alt="Online Shopping Life Circle Logo"
              data-spm-anchor-id="a2o4n.home.dhome.i0.68b43bdcN0AOoI"
            />
          </Link>
          <Link className={cx('logo-xs')} to="/">
            <Images src={require('~/assets/images/logo1/logo-xs.png')} />
          </Link>
        </div>
        <div
          ref={ctnWidthSearhRef}
          className={cx('search-container', 'col-xl-8 col col-lg-8 col-md-7 col-sm-7 d-block mx-0')}
        >
          <Tippy
            interactive
            visible={showResult && searchValue.length > 0}
            offset={[0, 0]}
            // onShow={({ popper, reference }) => {
            //   popper.style.width = reference.getBoundingClientRect.width + 'px';
            // }}
            placement="bottom"
            render={(attrs) => (
              <div ref={searchResultRef} className={cx('search-result')} tabIndex="-1" {...attrs}>
                <div className={cx('search-result-main')}>
                  {searchResult.map((d, index) => (
                    <SearchResult
                      handleClickSearch={handleClickSearch}
                      searchValue={searchValue}
                      title={d.title}
                      key={index}
                      // lengthBold={lengthBold}
                      delay={delay}
                      id={d.id}
                    />
                  ))}
                </div>
              </div>
            )}
            onClickOutside={handleHideResult}
          >
            <form onSubmit={handleSubmitSearch} className={cx('search-content', 'row mx-0')} noValidate>
              <input
                className={cx('search-input', 'col-10')}
                onChange={handleChange}
                value={searchValue}
                onFocus={() => {
                  setShowResult(true);
                }}
                autoComplete="off"
                name="search"
                placeholder="Search in Life Circle"
              />
              <button className={cx('search-button', 'col')}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </Tippy>
        </div>
        <div className={cx('nav-cars', 'col-xl-1 col col-lg-1 col-md-2 col-sm-2 text-center')}>
          <Link to={config.routes.cart} className={cx('cart-contain')}>
            {/* <FontAwesomeIcon icon={faCartShopping} /> */}
            <Images className={cx('cart-img')} src={require('~/assets/images/cart/cart.png')} />
          </Link>
        </div>
        <div className={cx('header-banner', 'col-xl-1 col')}>
          <HeaderBanner
            to={'//www.lazada.vn/lazada-co-brand-card?spm=a2o4n.home.header.dewallet.68b43bdcN0AOoI'}
            src={'//icms-image.slatic.net/images/ims-web/2069479e-741a-4807-8469-298d9e86ead7.png'}
            alt={'VIB_100K'}
          />
        </div>
      </div>
    </div>
  );
}

export default LogoBars;
