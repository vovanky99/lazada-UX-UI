import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import styles from '../SlideShow.module.scss';
import Images from '~/components/Images';

const cx = classNames.bind(styles);

//fucntion handle mouse outside highlight
function HandleOutside(ref, changeSetShowHighlight) {
  let body = document.querySelector('body');
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        changeSetShowHighlight(false);
        body.style['overflow'] = 'scroll';
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default function ShowHIghLight({ changeSetShowHighlight, dt, title, imageHighlight }) {
  const [imagesHighlight, setImagesHighlight] = useState(imageHighlight);
  const wrapperRef = useRef();
  //handle hide highlight
  HandleOutside(wrapperRef, changeSetShowHighlight);
  //handle show highlight
  useEffect(() => {
    const images = document.querySelectorAll('img.img-hl-click');
    const prev = document.getElementById('img-hl-prev');
    const next = document.getElementById('img-hl-next');
    const handleClickImgHlClick = (e) => {
      setImagesHighlight(e.currentTarget.src);
    };
    const handleNextImgHl = (e) => {
      for (let i = 0; i < images.length - 1; i++) {
        if (images[i].classList.contains('img-hl-active')) {
          images[i].classList.remove('img-hl-active');
          setImagesHighlight(images[i + 1].src);
          break;
        } else {
          setImagesHighlight(images[0].src);
        }
      }
    };
    const handlePrevImgHl = (e) => {
      for (let i = 0; i < images.length; i++) {
        if (images[i].classList.contains('img-hl-active') && i > 0) {
          images[i].classList.remove('img-hl-active');
          setImagesHighlight(images[i - 1].src);
          break;
        } else {
          setImagesHighlight(images[images.length - 1].src);
        }
      }
    };
    if (prev) {
      prev.addEventListener('click', handlePrevImgHl);
    }
    if (next) {
      next.addEventListener('click', handleNextImgHl);
    }
    if (images) {
      images.forEach((el) => el.addEventListener('click', handleClickImgHlClick));
    }
    return () => {
      if (images) {
        images.forEach((el) => el.removeEventListener('click', handleClickImgHlClick));
      }
      if (prev) {
        prev.removeEventListener('click', handlePrevImgHl);
      }
      if (next) {
        next.removeEventListener('click', handleNextImgHl);
      }
    };
  }, []);
  return (
    <section className={cx('show-highlight-wrapper', ' ')}>
      <div id="clickoutside" className={cx('show-hl-content')} ref={wrapperRef}>
        <div className={cx('images-highlight')}>
          <button id="img-hl-prev" className={cx('img-hl-prev')}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <Images src={imagesHighlight} alt={imagesHighlight} />
          <button id="img-hl-next" className={cx('', 'img-hl-next')}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className={cx('img-hl-total', 'flex-column')}>
          <h4>{title}</h4>
          <div className={cx('', 'd-flex flex-wrap')}>
            {dt.map((d, index) => (
              <div key={index} className={cx('img-wrapper')}>
                {imagesHighlight == d.title ? (
                  <Images className={cx('img-hl-click', 'img-hl-active')} src={d.title} alt={d.title} />
                ) : (
                  <Images className={cx('img-hl-click')} src={d.title} alt={d.title} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
