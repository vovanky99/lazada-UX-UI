import classNames from 'classnames/bind';

import styles from './FormSearch.module.scss';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import Debounce from '~/hooks/Debounce';

const cx = classNames.bind(styles);

export const FormSearch = forwardRef(function FormSearch(
  {
    useTippy = true,
    name,
    valueID,
    useTodoList = false,
    todoListGetID = false,
    inputType = 'text',
    inputClass,
    containerClass,
    Value,
    min,
    max,
    data,
    title,
    classTitle,
    useLabel = true,
    useNull = false,
    handleSetID = () => {},
    searchValue = () => {},
    handleOnchange = () => {},
  },
  ref,
) {
  const selectRef = useRef();
  const optionRef = useRef();
  const [select, setSelect] = useState(false);
  const [ID, setID] = useState(valueID || '');
  const [search, setSearch] = useState(Value || '');

  /* set search value use debounce */
  const searchDebounce = Debounce(search, 500);

  /* handle hide tippy select */
  const handleClickOutsideSelect = () => {
    setSelect(false);
  };

  /* handle click select */
  const handleClickSelect = () => {
    setSelect(true);
  };

  /* set search select Country ID */
  useEffect(() => {
    handleSetID(ID);
  });

  /* set search select value */
  useEffect(() => {
    searchValue(searchDebounce);
  });

  /* handle select country  */
  useEffect(() => {
    const c = document.querySelectorAll(`.select-option-${classTitle || title}`);
    const s = document.querySelector('.search');

    const handleClick = (e) => {
      setSearch(e.target.dataset.value);
      setSelect(false);

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
  });

  /* handle resize tippy search Country */
  useEffect(() => {
    const sl = selectRef.current;
    const op = optionRef.current;
    const handleResize = (e) => {
      op.style.width = `${sl.offsetWidth}px`;
    };
    if (sl && op) {
      window.addEventListener('resize', handleResize);
    }
    if (op) {
      handleResize();
    }
    return () => {
      if (sl && op) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [select]);

  return (
    <>
      <div ref={selectRef} className={cx('select-container', containerClass || 'form-group flex-grow-1')}>
        {useLabel ? <label className="form-label text-capitalize">{title}</label> : ''}
        {useTippy ? (
          <Tippy
            interactive
            visible={select}
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
            onClickOutside={handleClickOutsideSelect}
          >
            <input
              ref={ref}
              type={inputType}
              name={name}
              className={cx('search', inputClass ? `${inputClass}` : ' form-control py-2')}
              onClick={handleClickSelect}
              placeholder={`Enter Select ${title}`}
              value={search}
              onChange={(e) => {
                handleOnchange(e);
                setSearch(e.target.value);
              }}
              data-id={ID}
            />
          </Tippy>
        ) : (
          <input
            ref={ref}
            type={inputType}
            name={name}
            min={min}
            max={max}
            className={cx('search', inputClass ? `${inputClass}` : ' form-control py-2')}
            placeholder={`Enter Select ${title}`}
            value={search}
            autoComplete={inputType === 'password' ? `current-password` : ''}
            onKeyUp={(e) => {
              if (min && e.target.value < min) {
                setSearch(min);
              }
              if (max && parseInt(e.target.value) > max) {
                setSearch(max);
              }
            }}
            onChange={(e) => {
              handleOnchange(e);
              setSearch(e.target.value);
            }}
          />
        )}
      </div>
    </>
  );
});
