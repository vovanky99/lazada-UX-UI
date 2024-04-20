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

const cx = classNames.bind(styles);

export default function ProductsDescriptions({ id }) {
  const [likeReviews, setLikeReviews] = useState(false);
  //onclick handle like reviews
  const onClickHandleLikeReviews = () => {
    likeReviews == true ? setLikeReviews(false) : setLikeReviews(true);
  };

  //onclick reviews sidebar
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

  //handle pagination reviews
  useEffect(() => {
    const btns = document.querySelectorAll('.pagination_number');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const handleClickPaginationNumber = (e) => {
      if (e.currentTarget.classList.contains('pagination_active') == false) {
        for (let i = 0; i < btns.length; i++) {
          btns[i].classList.remove('pagination_active');
          e.currentTarget.classList.add('pagination_active');
        }
      }
    };
    const handlePrev = () => {
      for (let i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains('pagination_active') && i > 0) {
          btns[i].classList.remove('pagination_active');
          btns[i - 1].classList.add('pagination_active');
          break;
        }
      }
    };
    const handleNext = () => {
      for (let i = 0; i < btns.length - 1; i++) {
        if (btns[i].classList.contains('pagination_active')) {
          btns[i].classList.remove('pagination_active');
          btns[i + 1].classList.add('pagination_active');
          break;
        }
      }
    };
    prev.addEventListener('click', handlePrev);
    next.addEventListener('click', handleNext);
    btns.forEach((el) => el.addEventListener('click', handleClickPaginationNumber));
    return () => {
      if (prev) {
        prev.removeEventListener('click', handlePrev);
      }
      if (next) {
        next.removeEventListener('click', handleNext);
      }
      if (btns) {
        btns.forEach((el) => el.removeEventListener('click', handleClickPaginationNumber));
      }
    };
  }, []);

  return (
    <section className={cx('products-details', 'd-flex ')}>
      <div className={cx('products-details-content')}>
        <div className={cx('product-descriptions')}>
          <h2>Product Description</h2>
          <div className={cx('product-descriptions-content')}>
            <div>
              <p style={{ whiteSpace: 'pre-wrap' }}>
                ✔️𝐇𝐚̀𝐧𝐠 𝐛𝐞̂𝐧 𝐦𝐢̀𝐧𝐡 𝐛𝐚́𝐧 𝐫𝐞̉ 𝐧𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐛𝐨𝐱(𝐡𝐨̣̂𝐩).𝐀𝐞 𝐧𝐚̀𝐨 𝐦𝐮𝐨̂́𝐧 𝐦𝐮𝐚 𝐭𝐡𝐞̂𝐦 𝐡𝐨̣̂𝐩 𝐯𝐚̀𝐨 𝐦𝐮𝐚 𝐤𝐞̀𝐦 𝐝𝐞𝐚𝐥 𝐬𝐨̂́𝐜 𝐦𝐮𝐚 𝐭𝐡𝐞̂𝐦
                𝐛𝐨𝐱(𝐡𝐨̣̂𝐩) 𝐠𝐢𝐮́𝐩 𝐦𝐢̀𝐧𝐡 𝐧𝐡𝐞́ ✔️𝐇𝐚̀𝐧𝐠 𝐛𝐞̂𝐧 𝐦𝐢̀𝐧𝐡 𝐛𝐚́𝐧 𝐫𝐞̉ 𝐧𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐛𝐨𝐱(𝐡𝐨̣̂𝐩).𝐀𝐞 𝐧𝐚̀𝐨 𝐦𝐮𝐨̂́𝐧 𝐦𝐮𝐚 𝐭𝐡𝐞̂𝐦 𝐡𝐨̣̂𝐩 𝐯𝐚̀𝐨 𝐦𝐮𝐚 𝐤𝐞̀𝐦
                𝐝𝐞𝐚𝐥 𝐬𝐨̂́𝐜 𝐦𝐮𝐚 𝐭𝐡𝐞̂𝐦 𝐛𝐨𝐱(𝐡𝐨̣̂𝐩) 𝐠𝐢𝐮́𝐩 𝐦𝐢̀𝐧𝐡 𝐧𝐡𝐞́ kính chào anh chị !! - Shop cam kết bán sản phẩm chất lượng,
                giá cả rẻ nhất thị trường - Tất cả giày đều đi kèm hộp và bill đầy đủ, nhưng trong quá trình vận chuyển
                rất có thể hộp sẽ bị móp méo, điều này shop không hề mong muốn và cũng không thể can thiệp được vào công
                việc vận chuyển của bên shopee, nên mong anh/chị thông cảm. - Tất cả giầy shop bán xuất trực tiếp từ kho
                nên không chăm chút được cẩn thận. Cũng hy hữu có thể xảy ra khi giày bị méo form, nhưng khi nhận giầy
                anh/chị đi lên chân 5' là giầy vào lại form ạ. -Tất cả sản phẩm mình đều hỗ trợ cho khách xem hàng, quý
                khách cứ bảo là shop cho kiểm tra hàng rồi shiper sẽ gọi cho shop. Nhưng nhiều shiper khó tính họ theo
                đúng quy định của shopee là không được đồng kiểm. Nên quý khách thông cảm - Nến anh/chị nhận được sản
                phẩm lỗi hoặc do nhầm lẫn. Mong các bạn nhắn tin cho shop khắc phục trước khi đánh giá sản phẩm ạ ❤ Shop
                cam kết sẽ luôn có trách nhiệm với sản phẩm đã bán❤ 🔶QUY ĐỊNH ĐỔI TRẢ HÀNG: Quý khách có quyền đổi trả
                hàng trong vòng 07 ngày kể từ ngày nhận hàng (với điều kiện GIÀY CÒN MỚI NGUYÊN-CHƯA QUA SỬ DỤNG) cho
                những trường hợp sau: ✔️Hàng lỗi nghiêm trọng do sản xuất; hàng giao sai mẫu, nhầm size. Anh/chị vui
                lòng inbox lại Shop để được hướng dẫn trả hàng/hoàn tiền và Shopee sẽ hỗ trợ 100% phí ship. ✔️Trường hợp
                anh/chị đổi giày do muốn đổi size, đổi mẫu khác thì cũng xin inbox lại shop để được hướng dẫn. Nếu
                anh/chị không đến đổi trực tiếp được thì chi phí ship 2 chiều sẽ chịu 100% để thuê bên vận chuyển, bưu
                điện đi đổi hộ. Vì vậy, anh/chị vui lòng đọc kỹ quy định đổi trả hàng ạ😊 - Hãy inbox Chat với shop nếu
                anh/chị cần tư vấn ạ. - ☎️ Hotline : 0363 078 622
              </p>
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
                <button id="prev">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className={cx('pagination_number', 'pagination_active')}>1</button>
                <button className={cx('pagination_number')}>2</button>
                <button id="next">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <ProductsSuggest />
      </div>
      <div className={cx('top-pick-from-shop')}>
        <h2>Top Picks From Shop</h2>
        <Link className={cx('shop-suggest-products')}>
          <div className={cx('img')}>
            <Image src="https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lkxce87ekonf79_tn" />
          </div>
          <div className={cx('shop-suggest-products-name')}>
            Giày Thể Thao adidas Forum 84 Low ADV. Giày das forum 3 sọc l.,Giày Thể Thao Adidas Forum 85 phiên bản mới
            nhất nam nữ
          </div>
          <div className={cx('shop-suggest-products-price')}>₫99.000 - ₫198.000</div>
        </Link>
        <Link className={cx('shop-suggest-products')}>
          <div className={cx('img')}>
            <Image src="https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lkxce87ekonf79_tn" />
          </div>
          <div className={cx('shop-suggest-products-name')}>
            Giày Thể Thao adidas Forum 84 Low ADV. Giày das forum 3 sọc l.,Giày Thể Thao Adidas Forum 85 phiên bản mới
            nhất nam nữ
          </div>
          <div className={cx('shop-suggest-products-price')}>₫99.000 - ₫198.000</div>
        </Link>
        <Link className={cx('shop-suggest-products')}>
          <div className={cx('img')}>
            <Image src="https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lkxce87ekonf79_tn" />
          </div>
          <div className={cx('shop-suggest-products-name')}>
            Giày Thể Thao adidas Forum 84 Low ADV. Giày das forum 3 sọc l.,Giày Thể Thao Adidas Forum 85 phiên bản mới
            nhất nam nữ
          </div>
          <div className={cx('shop-suggest-products-price')}>₫99.000 - ₫198.000</div>
        </Link>
        <Link className={cx('shop-suggest-products')}>
          <div className={cx('img')}>
            <Image src="https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lkxce87ekonf79_tn" />
          </div>
          <div className={cx('shop-suggest-products-name')}>
            Giày Thể Thao adidas Forum 84 Low ADV. Giày das forum 3 sọc l.,Giày Thể Thao Adidas Forum 85 phiên bản mới
            nhất nam nữ
          </div>
          <div className={cx('shop-suggest-products-price')}>₫99.000 - ₫198.000</div>
        </Link>
        <Link className={cx('shop-suggest-products')}>
          <div className={cx('img')}>
            <Image src="https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lkxce87ekonf79_tn" />
          </div>
          <div className={cx('shop-suggest-products-name')}>
            Giày Thể Thao adidas Forum 84 Low ADV. Giày das forum 3 sọc l.,Giày Thể Thao Adidas Forum 85 phiên bản mới
            nhất nam nữ
          </div>
          <div className={cx('shop-suggest-products-price')}>₫99.000 - ₫198.000</div>
        </Link>
      </div>
    </section>
  );
}
