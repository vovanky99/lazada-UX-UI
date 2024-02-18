import classNames from 'classnames/bind';
import { Button, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './SlickSlide.module.scss';
import ShowHighLight from './ShowHighLight';

const cx = classNames.bind(styles);

export default function SlickSlide({
  data,
  changeSrcHL,
  srcHL,
  srcHighlightParent,
  wrapper,
  Highlight,
  numberShow = 5,
  title,
}) {
  const [highlight, setHighlight] = useState('');
  const [showHighlight, setShowHighlight] = useState(false);
  const [slideStart, setSlideStart] = useState(0);
  const [slideEnd, setSlideEnd] = useState(numberShow);
  const [imageHighlight, setImageHighlight] = useState('');
  const dt = [
    'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lodc12gxnd9vb5_tn',
    'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lodc12gxorub7f_tn',
    'https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lnkv8suqm1dmd6',
    'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lodc12gxkk4z05_tn',
    'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lodc12gxlypf53_tn',
    'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lodc12gxq6er7b_tn',
    'https://down-vn.img.susercontent.com/file/sg-11134201-23020-24w7601rednv12',
  ];
  const [srcHighlight, setSrcHighlight] = useState(dt[0]);
  let setDefaultHL = srcHL;
  let defaultSrcHighlight = '';
  if (setDefaultHL != '') {
    defaultSrcHighlight = setDefaultHL;
  } else {
    defaultSrcHighlight = srcHighlight;
  }
  const HandleHighlightShow = () => {
    setShowHighlight(true);
  };
  const srcHighlightChild = srcHighlightParent;
  const datas = dt.slice(slideStart, slideEnd);
  const lenght = dt.length;
  const handleNext = () => {
    if (slideEnd < lenght) {
      setSlideStart(slideStart + 1);
      setSlideEnd(slideEnd + 1);
    }
  };
  const handlePrev = () => {
    if (slideStart > 0) {
      setSlideStart(slideStart - 1);
      setSlideEnd(slideEnd - 1);
    }
  };
  const handleOnMouse = (e) => {
    setSrcHighlight(e.currentTarget.src);
    changeSrcHL('');
  };
  // onclick show details hl
  useEffect(() => {
    let imgs = document.querySelectorAll('.img-click');
    let imgsHighlight = document.querySelector('.src-highlight');
    let body = document.querySelector('body');
    const handleOnclickShow = (e) => {
      setImageHighlight(e.currentTarget.src);
      setShowHighlight(true);
      body.style['overflow'] = 'hidden';
    };
    if (imgsHighlight) {
      imgsHighlight.addEventListener('click', handleOnclickShow);
    }
    if (imgs) {
      imgs.forEach((el) => el.addEventListener('click', handleOnclickShow));
    }
    return () => {
      if (imgsHighlight) {
        imgsHighlight.removeEventListener('click', handleOnclickShow);
      }
      if (imgs) {
        imgs.forEach((el) => el.removeEventListener('click', handleOnclickShow));
      }
    };
  }, []);
  const changeSetShowHighlight = (vl) => {
    setShowHighlight(vl);
  };
  return (
    <section className={cx('wrapper', 'd-flex flex-column ' + wrapper)}>
      {showHighlight && (
        <ShowHighLight
          changeSetShowHighlight={changeSetShowHighlight}
          dt={dt}
          title={title}
          imageHighlight={imageHighlight}
        />
      )}
      <div className={cx('highlight', ' ' + Highlight)} onClick={HandleHighlightShow}>
        <picture>
          <Image
            className={cx('src-highlight')}
            src={srcHighlightChild != '' ? srcHighlightParent : defaultSrcHighlight}
            style={{ width: '100%' }}
          />
        </picture>
      </div>
      <div className={cx('slide-show', 'd-flex flex-row')}>
        <button className={cx('left')} onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {datas.map((d, key) => (
          <div className={cx('container-img')} key={key}>
            <picture>
              {srcHighlight == d ? (
                <Image
                  onMouseOver={handleOnMouse}
                  src={d}
                  style={{ width: '100%', cursor: 'pointer' }}
                  className={cx('img-click', 'images_active')}
                />
              ) : (
                <Image
                  onMouseOver={handleOnMouse}
                  src={d}
                  className={cx('img-click')}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              )}
            </picture>
          </div>
        ))}
        <button className={cx('next', '')} onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
}
