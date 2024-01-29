import classNames from 'classnames/bind';
import { Button, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './SlickSlide.module.scss';

const cx = classNames.bind(styles);

export default function SlickSlide({
  data,
  changeSrcHL,
  srcHL,
  srcHighlightParent,
  wrapper,
  Highlight,
  numberShow = 5,
}) {
  const [highlight, setHighlight] = useState('');
  const [showHighlight, setShowHighlight] = useState(false);
  const [slideStart, setSlideStart] = useState(0);
  const [slideEnd, setSlideEnd] = useState(numberShow);
  const dt = [
    'https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lnkv8suqm1dmd6',
    'https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lnkv8suqm1dmd6',
    'https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lnkv8suqm1dmd6',
    'https://down-vn.img.susercontent.com/file/sg-11134201-23020-24w7601rednv12',
    'https://down-vn.img.susercontent.com/file/sg-11134201-23020-24w7601rednv12',
    'https://down-vn.img.susercontent.com/file/sg-11134201-23020-24w7601rednv12',
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
  const handleBack = () => {
    if (slideStart > 0) {
      setSlideStart(slideStart - 1);
      setSlideEnd(slideEnd - 1);
    }
  };
  const handleOnMouse = (e) => {
    setSrcHighlight(e.currentTarget.src);
    changeSrcHL('');
  };
  return (
    <div className={cx('wrapper', 'd-flex flex-column ' + wrapper)}>
      {showHighlight && <div className={cx('show-highlight', ' ')}></div>}
      <div className={cx('highlight', ' ' + Highlight)} onClick={HandleHighlightShow}>
        <picture>
          <Image src={srcHighlightChild != '' ? srcHighlightParent : defaultSrcHighlight} style={{ width: '100%' }} />
        </picture>
      </div>
      <div className={cx('slide-show', 'd-flex flex-row')}>
        <button className={cx('left')} onClick={handleBack}>
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
                  className={cx('active')}
                />
              ) : (
                <Image onMouseOver={handleOnMouse} src={d} style={{ width: '100%', cursor: 'pointer' }} />
              )}
            </picture>
          </div>
        ))}
        <button className={cx('next', '')} onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
