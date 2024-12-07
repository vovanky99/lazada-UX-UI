import classNames from 'classnames/bind';

import styles from '../Products.module.scss';
import Translate from '~/layout/Component/Translate';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import BasicInfo from './BasicInfo';
import { useEffect, useRef, useState } from 'react';
import SalesInfo from './SalesInfo';
import DetailInfo from './DetailInfo';
import OtherInfo from './OtherInfo';
import TransportInfo from './TransportInfo';

const cx = classNames.bind(styles);

export default function AddProducts() {
  const tabsContentRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const [hasCat, setHasCat] = useState(false);

  const passHasCat = () => {
    setHasCat(true);
  };

  useEffect(() => {
    const btnItem = document.querySelectorAll('.btn_item');
    const border = document.getElementById('tabs_border');
    const tabsContent = tabsContentRef.current;
    const handleBorderActive = () => {
      for (let i = 0; i < btnItem.length; i++) {
        if (btnItem[i].classList.contains('tabs_active')) {
          const left = btnItem[i].getBoundingClientRect().left - tabsContent.getBoundingClientRect().left;
          border.style.width = `${btnItem[i].clientWidth}px`;
          border.style.left = `${left}px`;
          border.style.bottom = '0px';
        }
      }
    };

    const handleClick = (e) => {
      for (let i = 0; i < btnItem.length; i++) {
        if (btnItem[i].classList.contains('tabs_active')) {
          btnItem[i].classList.remove('tabs_active');
        }
      }
      e.currentTarget.classList.add('tabs_active');
      handleBorderActive();
    };
    if (border && btnItem) {
      handleBorderActive();
    }
    if (btnItem) {
      btnItem.forEach((d) => d.addEventListener('click', handleClick));
    }
    return () => {
      if (btnItem) {
        btnItem.forEach((d) => d.removeEventListener('click', handleClick));
      }
    };
  }, []);

  useEffect(() => {
    const scroll = document.getElementById('product_footer');
    const topScroll = document.getElementById('product_header');

    const handleScroll = (e) => {
      const scrollPosition = window.screenY + window.innerHeight;
      const elementBottom = scroll.getBoundingClientRect().bottom + window.screenY;
      const elementTop = topScroll.getBoundingClientRect().top + window.screenY;
      if (elementTop !== 56) {
        // 56 is height of header or top position when sticky
        topScroll.classList.remove('active');
      } else {
        topScroll.classList.add('active');
      }
      if (elementBottom === scrollPosition) {
        scroll.classList.remove('active');
      } else {
        scroll.classList.add('active');
      }
    };
    if (scroll) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scroll) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  return (
    <section id="seller_add_product" className={cx('seller_product', 'd-flex flex-row')}>
      <section className={cx('sellet_product_left', 'd-flex flex-column')}>
        <div className={cx('seller_note')}>
          <div className={cx('layer_top')}></div>
          <div className={cx('seller_note_title')}>
            <div className={cx('note_top')}>
              <p className={cx('note_title')}>
                <Translate>pages.seller.add_product.suggest.title</Translate>
              </p>
            </div>
          </div>
          <div className={cx('seller_note_content', 'd-flex flex-column justify-content-start align-items-start')}>
            <Button
              to="#images"
              full_width
              transparent
              className={cx('note_item', 'd-flex flex-row gap-3 justify-content-start align-items-start')}
            >
              <div className={cx('note_icon')}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <div className={cx('title')}>
                <Translate>pages.seller.add_product.suggest.add_image</Translate>
              </div>
            </Button>
            <Button
              to="#video"
              full_width
              transparent
              className={cx('note_item', 'd-flex flex-row gap-3 justify-content-start align-items-start')}
            >
              <div className={cx('note_icon')}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <div className={cx('title')}>
                <Translate>pages.seller.add_product.suggest.add_video</Translate>
              </div>
            </Button>
            <Button
              to="#title"
              full_width
              transparent
              className={cx('note_item', 'd-flex flex-row gap-3 justify-content-start align-items-start')}
            >
              <div className={cx('note_icon')}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <div className={cx('title')}>
                <Translate>pages.seller.add_product.suggest.product_title</Translate>
              </div>
            </Button>
            <Button
              to="#description"
              full_width
              transparent
              className={cx('note_item', 'd-flex flex-row gap-3 justify-content-start align-items-start')}
            >
              <div className={cx('note_icon')}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <div className={cx('title')}>
                <Translate>pages.seller.add_product.suggest.descriptions</Translate>
              </div>
            </Button>
            <Button
              to="#brand"
              full_width
              transparent
              className={cx('note_item', 'd-flex flex-row gap-3 justify-content-start align-items-start')}
            >
              <div className={cx('note_icon')}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <div className={cx('title')}>
                <Translate>pages.seller.add_product.suggest.add_brand</Translate>
              </div>
            </Button>
          </div>
          <div className={cx('')} style={{ display: 'none' }}></div>
        </div>
      </section>
      <section className={cx('seller_add_product', 'd-flex flex-column')}>
        <div id="product_header" className={cx('add_product_header')}>
          <div ref={tabsContentRef} className={cx('tabs_content', 'd-flex flex-row')}>
            <div type="button" className={cx('btn_product_item', 'btn_item tabs_active')}>
              <Translate>pages.seller.add_product.basic_info</Translate>
            </div>
            <div type="button" className={cx('btn_product_item', 'btn_item')}>
              <Translate>pages.seller.add_product.sales_info</Translate>
            </div>
            <div type="button" className={cx('btn_product_item', 'btn_item')}>
              <Translate>pages.seller.add_product.transport</Translate>
            </div>
            <div type="button" className={cx('btn_product_item', 'btn_item')}>
              <Translate>pages.seller.add_product.other_info</Translate>
            </div>
          </div>
          <div id="tabs_border" className={cx('tabs_border')}></div>
        </div>
        <div id="basic_info" className={cx('basic_info', 'add_product_item')}>
          <BasicInfo cat={hasCat} passHasCat={passHasCat} />
        </div>
        <div id="detail_info">
          <DetailInfo cat={hasCat} />
        </div>
        <div id="sales_info">
          <SalesInfo cat={hasCat} />
        </div>
        <div id="transport">
          <TransportInfo cat={hasCat} />
        </div>
        <div id="other_info">
          <OtherInfo cat={hasCat} />
        </div>
        <div
          id="product_footer"
          className={cx('add_product_footer', 'active product_button d-flex flex-row justify-content-end')}
        >
          <Button outline small>
            <Translate>cancel</Translate>
          </Button>
          <Button outline small disabled={disabled}>
            <Translate>pages.seller.add_product.save_hide</Translate>
          </Button>
          <Button small primary disabled={disabled}>
            <Translate>pages.seller.add_product.save_show</Translate>
          </Button>
        </div>
      </section>
    </section>
  );
}
