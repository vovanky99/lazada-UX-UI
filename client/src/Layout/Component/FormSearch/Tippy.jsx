import HeadlessTippy from '@tippyjs/react/headless';
import { forwardRef, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './FormSearch.module.scss';
const cx = classNames.bind(styles);

const Tippy = forwardRef(function Tippy(
  { name, useNull, classTitle, inputClass, inputType, title, data, handleSetID = () => {}, handleOnchange = () => {} },
  ref,
) {
  const optionRef = useRef();
  const [tippy, setTippy] = useState(false);
  const [value, setValue] = useState('');
  const [ID, setID] = useState('');

  /* handle pass ID */
  useEffect(() => {
    handleSetID(ID);
  });

  const handleClickOutsideTippy = () => {
    setTippy(false);
  };
  const handleClickInput = () => {
    setTippy(true);
  };

  /* handle set id when element tippy click  */
  useEffect(() => {
    const c = document.querySelectorAll(`.select-option-${classTitle || title}`);
    const s = document.querySelector('.search');

    const handleClick = (e) => {
      setValue(e.target.dataset.value);
      setTippy(false);
      setID(e.target.dataset.id);
      if (s) {
        s.dataset.id = e.target.dataset.id;
      }
    };
    if (c) {
      c.forEach((e) => e.addEventListener('click', handleClick));
    }
    return () => {
      if (c) {
        c.forEach((e) => e.removeEventListener('click', handleClick));
      }
    };
  }, []);

  /* element select option click */
  useEffect(() => {
    const el = document.querySelectorAll(`.select-option-${classTitle || title}`);
    const handleClick = (e) => {
      setID(e.target.dataset.id);
      setValue(e.target.dataset.value);
      setTippy(false);
    };
    if (el) {
      el.forEach((d) => {
        d.addEventListener('click', handleClick);
      });
    }
    return () => {
      if (el) {
        el.forEach((d) => {
          d.removeEventListener('click', handleClick);
        });
      }
    };
  });
  return (
    <>
      <HeadlessTippy
        interactive
        visible={tippy}
        offset={[0, 0]}
        placement="bottom"
        render={(attrs) => (
          <ul ref={optionRef} className={cx('option')} {...attrs} tabIndex="-1">
            {data?.length > 0 && useNull ? (
              <li className={cx('option-single', `select-option-${classTitle || title}`)} data-value="" data-id="">
                Null
              </li>
            ) : (
              ''
            )}
            {data
              ? data.map((d) => (
                  <li
                    className={cx('option-single', `select-option-${classTitle || title}`)}
                    data-value={d.name}
                    data-id={d.id}
                    key={d.id}
                  >
                    {d.name}
                  </li>
                ))
              : ''}
          </ul>
        )}
        onClickOutside={handleClickOutsideTippy}
      >
        <input
          ref={ref}
          type={inputType}
          name={name}
          className={cx('search', inputClass ? `${inputClass}` : ' form-control py-2')}
          onClick={handleClickInput}
          placeholder={`Enter Select ${title}`}
          value={value}
          onChange={(e) => {
            handleOnchange(e);
            setValue(e.target.value);
          }}
          data-id={ID}
        />
      </HeadlessTippy>
    </>
  );
});

export default Tippy;
