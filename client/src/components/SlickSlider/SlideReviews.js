import classNames from 'classnames/bind';
import { Button, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './SlickSlide.module.scss';
import './css/affec.css';

const cx = classNames.bind(styles);

export default function SlideReviews({ data, wrapper, activeSlide, numberShow = 1 }) {
  //onclick images zoom-in
  useEffect(() => {
    const images = document.querySelectorAll('.zoom-click');
    const btn_left = document.getElementById('btn-left');
    const btn_right = document.getElementById('btn-right');
    const value_zoom_in = document.getElementById('value-zoom-in');
    const vlZoomInContent = document.getElementById('value-zoom-in-content');
    const rating_media_list = 'rating-media-list';
    function ChangeStyle(elmId, style, value) {
      let elem = document.getElementById(elmId);
      if (typeof elem != 'undefined' && elem !== null) {
        elem.style[style] = value;
      }
    }
    function handleClickZoomInLoop(DFpixel = 10, pixel = 420) {
      for (let i = 0; i <= images.length - 1; i++) {
        if (images[i].classList.contains('zoom_out')) {
          if (i > 1) {
            ChangeStyle(rating_media_list, 'transform', `translateX(-${pixel * i}px)`);
          } else {
            ChangeStyle(rating_media_list, 'transform', `translateX(-${DFpixel}px)`);
          }
          if (i == 0) {
            btn_left.style['display'] = 'none';
          } else {
            btn_left.style['display'] = 'block';
          }
          if (i == images.length - 1) {
            btn_right.style['display'] = 'none';
          } else {
            btn_right.style['display'] = 'block';
          }
        }
      }
    }
    function handlePrev(DFpixel = 10, pixel = 420) {
      for (let i = 1; i <= images.length - 1; i++) {
        if (images[i].classList.contains('zoom_out')) {
          images[i].classList.remove('zoom_out');
          images[i - 1].classList.add('zoom_out');
          if (i - 1 == 0) {
            ChangeStyle(rating_media_list, 'transform', `translateX(-${DFpixel}px)`);
          } else {
            ChangeStyle(rating_media_list, 'transform', `translateX(-${pixel * (i - 1)}px)`);
          }
          if (i - 1 == 0) {
            btn_left.style['display'] = 'none';
          } else {
            btn_left.style['display'] = 'block';
          }
          if (i - 1 == images.length - 1) {
            btn_right.style['display'] = 'none';
          } else {
            btn_right.style['display'] = 'block';
          }
        }
      }
    }
    function handleNext(pixel = 420) {
      for (let i = images.length - 1; i >= 0; i--) {
        if (images[i].classList.contains('zoom_out')) {
          console.log(i);
          images[i].classList.remove('zoom_out');
          images[i + 1].classList.add('zoom_out');
          if (i == 0) {
            ChangeStyle(rating_media_list, 'transform', `translateX(-${pixel * 1}px)`);
          } else {
            ChangeStyle(rating_media_list, 'transform', `translateX(-${pixel * (i + 1)}px)`);
          }
          btn_left.style['display'] = 'block';
          if (i + 1 == images.length - 1) {
            btn_right.style['display'] = 'none';
          } else {
            btn_right.style['display'] = 'block';
          }
        }
      }
    }

    const handleClickZoomIn = (e) => {
      console.log(e.currentTarget.classList.contains('zoom_in'));
      if (e.currentTarget.classList.contains('zoom_in')) {
        for (let i = 0; i < images.length; i++) {
          images[i].classList.remove('zoom_out');
          images[i].classList.add('zoom_in');
        }
        e.currentTarget.classList.remove('zoom_in');
        e.currentTarget.classList.add('zoom_out');
        value_zoom_in.style['display'] = 'flex';
        handleClickZoomInLoop();
      } else {
        e.currentTarget.classList.remove('zoom_out');
        e.currentTarget.classList.add('zoom_in');
        value_zoom_in.style['display'] = 'none';
        ChangeStyle(rating_media_list, 'transform', 'none');
      }
    };

    const handleClickPrev = () => {
      handlePrev();
    };
    const handleClickNext = () => {
      handleNext();
    };
    const handleMouseOver = () => {
      btn_left.style['transform'] = 'scale(1.5,1.5)';
      btn_right.style['transform'] = 'scale(1.5,1.5)';
    };
    const handleMouseLeave = () => {
      btn_left.style['transform'] = 'scale(1,1)';
      btn_right.style['transform'] = 'scale(1,1)';
    };
    images.forEach((el) => el.addEventListener('click', handleClickZoomIn));
    if (btn_left) {
      btn_left.addEventListener('click', handleClickPrev);
      btn_left.addEventListener('mouseover', handleMouseOver);
      btn_left.addEventListener('mouseleave', handleMouseLeave);
    }
    if (btn_right) {
      btn_right.addEventListener('click', handleClickNext);
      btn_right.addEventListener('mouseover', handleMouseOver);
      btn_right.addEventListener('mouseleave', handleMouseLeave);
    }
    if (vlZoomInContent) {
      vlZoomInContent.addEventListener('mouseover', handleMouseOver);
      vlZoomInContent.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (images) {
        images.forEach((el) => el.removeEventListener('click', handleClickZoomIn));
      }
      if (btn_left) {
        btn_left.removeEventListener('click', handleClickPrev);
        btn_left.removeEventListener('mouseover', handleMouseOver);
        btn_left.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (btn_right) {
        btn_right.removeEventListener('click', handleClickNext);
        btn_right.removeEventListener('mouseover', handleMouseOver);
        btn_right.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (vlZoomInContent) {
        vlZoomInContent.removeEventListener('mouseover', handleMouseOver);
        vlZoomInContent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className={cx('wrapper-slideshow', wrapper + '')}>
      <div className={cx('reviews-img-all', 'd-flex gap-3')}>
        <div>
          <Image
            className={cx('zoom-click', 'zoom_in')}
            src="https://down-tx-vn.img.susercontent.com/vn-11134103-7qukw-ljs1xxgeaqic92_tn.webp"
          />
        </div>
        <div>
          <Image
            className={cx('zoom-click', 'zoom_in')}
            src="https://img.lazcdn.com/g/p/0ef88b13ea61cf3c78fa2ef33a4dbc1f.jpg_80x80q80.jpg_.webp"
          />
        </div>
        <div>
          <Image
            className={cx('zoom-click', 'zoom_in')}
            src="https://down-vn.img.susercontent.com/file/sg-11134201-7rbk4-lognsnfg8a5c9b_tn"
          />
        </div>
      </div>
      <div id="value-zoom-in" className={cx('value-zoom-in', activeSlide + ' ')}>
        <button id="btn-left" className={cx('btn-left')}>
          <FontAwesomeIcon icon={faChevronLeft} />{' '}
        </button>
        <div id="value-zoom-in-content" className={cx('value-zoom-in-content')}>
          <ul id="rating-media-list" className={cx('rating-media-list', 'transform-rating-media')}>
            <li>
              <Image src="https://down-tx-vn.img.susercontent.com/vn-11134103-7qukw-ljs1xxgeaqic92_tn.webp" />
            </li>
            <li>
              <Image src="https://img.lazcdn.com/g/p/0ef88b13ea61cf3c78fa2ef33a4dbc1f.jpg_80x80q80.jpg_.webp" />
            </li>
            <li>
              <Image src="https://down-vn.img.susercontent.com/file/sg-11134201-7rbk4-lognsnfg8a5c9b_tn" />
            </li>
          </ul>
        </div>
        <button id="btn-right" className={cx('btn-right')}>
          <FontAwesomeIcon icon={faChevronRight} />{' '}
        </button>
      </div>
    </div>
  );
}
