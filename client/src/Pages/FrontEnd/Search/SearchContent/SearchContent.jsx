import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faExclamation, faGrip, faShirt } from '@fortawesome/free-solid-svg-icons';
import { faClock, faCommentDots, faStar as faStarRegular } from '@fortawesome/fontawesome-free-regular';

import styles from './SearchContent.module.scss';
import Products from '~/layout/FrontEnd/Products';
import Pagination from '~/layout/Component/Pagination';
import Button from '~/components/Button';
import Images from '~/components/Images';

const cx = classNames.bind(styles);

export default function SearchContent({ data, titleSearch, Price }) {
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 16;
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentTableData = data.slice(firstPageIndex, lastPageIndex);

  const [display, setDisplay] = useState('flex-column');
  const [imgWidth, setImgWidth] = useState('100%');
  const [gap, setGap] = useState('15px');

  // handle convert grid and list
  useEffect(() => {
    const grid = document.getElementById('grid');
    const list = document.getElementById('list');
    const PD_grid_list = document.getElementById('products-grid-list');
    const widthProduct = document.querySelectorAll('.width-product');
    const hanldeClick = (e) => {
      if (e.currentTarget.classList.contains('active-grid') === true) {
        PD_grid_list.style['flexDirection'] = 'row';
        grid.style['color'] = '#183545';
        list.style['color'] = '#dadada';
        setDisplay('flex-column');
        setImgWidth('100%');
        widthProduct.forEach((e) => (e.style['width'] = 'calc((100% - (15px * 3)) / 4)'));
        setGap('15px');
      } else {
        PD_grid_list.style['flexDirection'] = 'column';
        list.style['color'] = '#183545';
        grid.style['color'] = '#dadada';
        widthProduct.forEach((e) => (e.style['width'] = '100%'));
        setDisplay('flex-row');
        setImgWidth('20%');
        setGap('20px');
      }
    };
    if (grid) {
      grid.addEventListener('click', hanldeClick);
    }
    if (list) {
      list.addEventListener('click', hanldeClick);
    }
    return () => {
      if (grid) {
        grid.removeEventListener('click', hanldeClick);
      }
      if (list) {
        list.removeEventListener('click', hanldeClick);
      }
    };
  }, [display]);

  return (
    <div className={cx('wrapper', 'd-flex flex-column')}>
      <div className={cx('title')}>
        <span>SHOP LIÊN QUAN ĐẾN</span>
        <span>{titleSearch}</span>
      </div>
      <div className={cx('shop', 'd-flex flex-row justify-content-between')}>
        <div className={cx('shop-left', 'd-flex flex-row align-items-center')}>
          <div className={cx('shop-img')}>
            <Images
              src="https://down-vn.img.susercontent.com/file/59ec532c43cc0879f6c0649c82d03641_tn"
              alt="https://down-vn.img.susercontent.com/file/59ec532c43cc0879f6c0649c82d03641_tn"
            />
          </div>
          <Button to={'/'} className={cx('shop-main')}>
            <div className={cx('shop-name')}>Dep Nam</div>
            <div className={cx('shop-username')}>DepNamTuyetNhung</div>
            <div className={cx('shop-follow-count')}>
              <span className={cx('shop-count-number')}>6,9k</span>
              <span className=" text-capitalize">&ensp;Người theo dõi</span>
              <span> | </span>
              <span className={cx('shop-count-number')}>113</span>
              <span className=" text-capitalize">&ensp;Đang theo dõi</span>
            </div>
          </Button>
        </div>
        <div className={cx('shop-right', 'd-flex flex-row align-items-center')}>
          <div className={cx('shop-products', 'd-flex flex-column')}>
            <div className={cx('icon-number')}>
              <FontAwesomeIcon icon={faShirt} />
              89
            </div>
            <span className=" text-capitalize">sản phẩm</span>
          </div>
          <div className={cx('shop-rate', 'd-flex flex-column')}>
            <div className={cx('icon-number')}>
              <FontAwesomeIcon icon={faStarRegular} />
              4.9
            </div>
            <span className=" text-capitalize">Đánh giá</span>
          </div>
          <div className={cx('shop-feedback', 'd-flex flex-column')}>
            <div className={cx('icon-number')}>
              <FontAwesomeIcon icon={faCommentDots} />
              90%
            </div>
            <span className=" text-capitalize">Tỉ Lệ Phản Hồi</span>
          </div>
          <div className={cx('shop-time-feedback', 'd-flex flex-column')}>
            <div className={cx('icon-number')}>
              <FontAwesomeIcon icon={faClock} />
              Trong Vài Giờ
            </div>
            <span className=" text-capitalize">Thời Gian Phản Hồi</span>
          </div>
        </div>
      </div>
      <div className={cx('search-products-title')}>
        <span>
          <FontAwesomeIcon icon={faExclamation} /> Kết quả tìm kiếm cho từ khoá
        </span>
        <span>{titleSearch}</span>
      </div>
      <div className={cx('search-products-container', 'd-flex flex-column')}>
        <div className={cx('search-products-header', 'd-flex flex-row justify-content-between align-items-center')}>
          <div className={cx('sort-by', 'd-flex flex-row')}>
            <label>Sort By:</label>
            <select
              onChange={(e) => {
                Price(e.target.value);
              }}
            >
              <option value="">Best Match</option>
              <option value="ASC">Price low to high</option>
              <option value="DESC">Price high to low</option>
            </select>
          </div>
          <div className={cx('view', 'd-flex flex-row')}>
            <label>View:</label>
            <div className={cx('list-grid', 'd-flex flex-row')}>
              <div id="grid" className={cx('grid', 'active-grid')}>
                <FontAwesomeIcon icon={faGrip} />
              </div>
              <div id="list" className={cx('list')}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
          </div>
        </div>
        <div id="products-grid-list" className={cx('search-products-content', 'd-flex flex-wrap')}>
          {currentTableData.map((pd, index) => (
            <div key={index} className={cx('container-products', 'width-product')}>
              <Link to={`http://localhost:3000/products/${pd.title}/${pd.id}`}>
                <Products data={pd} display={display} imgWidth={imgWidth} Gap={gap} />
              </Link>
            </div>
          ))}
        </div>
        <div className={cx('search-page-navigate', 'd-flex flex-row justify-content-end')}>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
