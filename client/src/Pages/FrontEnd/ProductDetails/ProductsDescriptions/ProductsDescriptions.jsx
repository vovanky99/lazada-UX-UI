import { Image } from 'react-bootstrap';

import classNames from 'classnames/bind';
import styles from '../ProductDetails.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import ProductsSuggest from '../ProductsSuggest';
import SlideReviews from '~/components/SlickSlider/SlideReviews';
import Pagination from '~/Layout/Pagination';

const cx = classNames.bind(styles);

export default function ProductsDescriptions({ id, PD_Description, PD_Reviews, PD_topProduct, PD_Suggest, PD_store }) {
  const [likeReviews, setLikeReviews] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  let pageSize = 5;
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  const dataReviews = PD_Reviews.slice(firstPageIndex, lastPageIndex);

  /*onclick handle like reviews */
  const onClickHandleLikeReviews = () => {
    likeReviews == true ? setLikeReviews(false) : setLikeReviews(true);
  };

  /*onclick reviews sidebar*/
  useEffect(() => {
    const btns = document.querySelectorAll('button.btn_score');
    const handleSelectScoreReviews = (e) => {
      e.preventDefault();
      for (let i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains('rating_active') == true) {
          btns[i].classList.remove('rating_active');
        }
        e.target.classList.add('rating_active');
      }
    };
    btns.forEach((el) => el.addEventListener('click', handleSelectScoreReviews));
    return () => {
      btns.forEach((el) => el.removeEventListener('click', handleSelectScoreReviews));
    };
  }, []);

  /*handle pagination reviews*/
  // useEffect(() => {
  //   const btns = document.querySelectorAll('.pagination_number');
  //   const prev = document.getElementById('prev');
  //   const next = document.getElementById('next');
  //   const handleClickPaginationNumber = (e) => {
  //     if (e.currentTarget.classList.contains('pagination_active') == false) {
  //       for (let i = 0; i < btns.length; i++) {
  //         btns[i].classList.remove('pagination_active');
  //         e.currentTarget.classList.add('pagination_active');
  //       }
  //     }
  //   };
  //   const handlePrev = () => {
  //     for (let i = 0; i < btns.length; i++) {
  //       if (btns[i].classList.contains('pagination_active') && i > 0) {
  //         btns[i].classList.remove('pagination_active');
  //         btns[i - 1].classList.add('pagination_active');
  //         break;
  //       }
  //     }
  //   };
  //   const handleNext = () => {
  //     for (let i = 0; i < btns.length - 1; i++) {
  //       if (btns[i].classList.contains('pagination_active')) {
  //         btns[i].classList.remove('pagination_active');
  //         btns[i + 1].classList.add('pagination_active');
  //         break;
  //       }
  //     }
  //   };
  //   prev.addEventListener('click', handlePrev);
  //   next.addEventListener('click', handleNext);
  //   btns.forEach((el) => el.addEventListener('click', handleClickPaginationNumber));
  //   return () => {
  //     if (prev) {
  //       prev.removeEventListener('click', handlePrev);
  //     }
  //     if (next) {
  //       next.removeEventListener('click', handleNext);
  //     }
  //     if (btns) {
  //       btns.forEach((el) => el.removeEventListener('click', handleClickPaginationNumber));
  //     }
  //   };
  // }, []);

  return (
    <section className={cx('products-details', 'd-flex ')}>
      <div className={cx('products-details-content')}>
        <div className={cx('product-descriptions')}>
          <h2>Product Description</h2>
          <div className={cx('product-descriptions-content')}>
            <div style={{ whiteSpace: 'pre-wrap' }}>
              <p>{PD_Description}</p>
            </div>
          </div>
        </div>
        <div id={id} className={cx('products-rating')}>
          <h3>Product Ratings</h3>
          <div className={cx('products-rate-content')}>
            <div className={cx('products-rate-header', 'd-flex')}>
              <div className={cx('avg-star')}>
                <div className={cx('products-rate-overview')}>
                  <span className={cx('rating-score')}>4.8</span>
                  <span className={cx('rating-score-out-of')}>out of 5</span>
                </div>
                <div className={cx('rating-star')}>
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
              </div>
              <div className={cx('products-rate-tabs', 'd-flex')}>
                <button className={cx('btn_score', 'rating_active')} id="all-rating">
                  All
                </button>
                <button className={cx('btn_score')} id="rating-5">
                  5 star(99)
                </button>
                <button className={cx('btn_score')} id="rating-4">
                  4 star(99)
                </button>
                <button className={cx('btn_score')} id="rating-3">
                  3 star(99)
                </button>
                <button className={cx('btn_score')} id="rating-2">
                  2 star(99)
                </button>
                <button className={cx('btn_score')} id="rating-1">
                  1 star(99)
                </button>
              </div>
            </div>
            <div className={cx('products-rate-list')}>
              <div className={cx('products-comment-list')}>
                <div className={cx('product-rating', 'd-flex')}>
                  <Link className={cx('user-review-avatar')}>
                    <Image src="https://down-vn.img.susercontent.com/file/29baad6b574cef5ec3d6d576703c8e6f_tn" />
                  </Link>
                  <div className={cx('user-review-content')}>
                    <div className={cx('author-name')}>trrspnvhc9qhu8rojb_mbua7ytz2</div>
                    <div className={cx('user-review-star')}>
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStarRegular} />
                    </div>
                    <div className={cx('user-review-time')}>2023-07-09 | Variation:jd den trang thap,38</div>
                    <div className={cx('reviews-content-main')}>
                      <div>
                        Mau Sac: <span>den</span>
                      </div>
                      <div>
                        dung voi mo ta: <span>tam</span>
                      </div>
                      <div>
                        chat lieu: <span>...</span>
                      </div>
                      <div className={cx('reviews-content')}>
                        Giá này cũng tạm. Có chỉ thừa. Mang chơi chơi cũng được. Mang size 38 dài thì vừa nhưng ngang
                        thì hơi chật. Vận chuyển lâu hơn dự kiến .
                      </div>
                    </div>
                    <SlideReviews />
                    <div
                      className={cx('like-reviews')}
                      style={{ cursor: 'pointer' }}
                      onClick={onClickHandleLikeReviews}
                    >
                      {likeReviews ? (
                        <FontAwesomeIcon style={{ color: 'blue' }} icon={faThumbsUp} />
                      ) : (
                        <FontAwesomeIcon icon={faThumbsUp} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx('products-ratings-page-controller', 'd-flex justify-content-end')}>
                {/* <button id="prev">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className={cx('pagination_number', 'pagination_active')}>1</button>
                <button className={cx('pagination_number')}>2</button>
                <button id="next">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button> */}
                <Pagination
                  className={cx('pagination-bar')}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  totalCount={dataReviews.length}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
        <ProductsSuggest PD={PD_Suggest} shopPD={PD_store} />
      </div>
      <div className={cx('top-pick-from-shop')}>
        <h2>Top Picks From Shop</h2>
        {PD_topProduct.map((pd, index) => (
          <Link
            className={cx('shop-suggest-products')}
            to={`http://localhost:3000/products/${pd.title}/${pd.id}`}
            key={index}
          >
            <div className={cx('img')}>
              <Image src={`${pd.images}`} />
            </div>
            <div className={cx('shop-suggest-products-name')}>{pd.title}</div>
            <div className={cx('shop-suggest-products-price')}>
              {(pd.price - (pd.discount / 100) * pd.price).toFixed(1)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
