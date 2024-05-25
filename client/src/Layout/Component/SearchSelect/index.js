import classNames from 'classnames/bind';

import styles from './SearchSelect.module.scss';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import Debounce from '~/Hooks/Debounce';

const cx = classNames.bind(styles);

export const SearchSelect = forwardRef(function Select({
  useTippy = true,
  IDValue,
  inputType = 'text',
  inputClassname,
  ContainerClassname,
  searchValue,
  data,
  title,
  classTitle,
  isLabel = true,
  NullValue = false,
  handleSetID = () => {},
  searchSelectValue = () => {},
  inputRef,
}) {
  const selectRef = useRef();
  const optionRef = useRef();
  const [select, setSelect] = useState(false);
  const [ID, setID] = useState(IDValue || '');
  const [search, setSearch] = useState(searchValue || '');

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
    searchSelectValue(searchDebounce);
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
      <div ref={selectRef} className={cx('select-container', ContainerClassname || 'form-group flex-grow-1')}>
        {isLabel ? <label className="form-label text-capitalize">{title}</label> : ''}
        {useTippy ? (
          <Tippy
            interactive
            visible={select}
            offset={[0, 0]}
            placement="bottom"
            render={(attrs) => (
              <ul ref={optionRef} className={cx('option')} {...attrs}>
                {data?.length > 0 && NullValue ? (
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
              ref={inputRef}
              type={inputType}
              className={cx('search', inputClassname ? `${inputClassname}` : ' form-control py-2')}
              onClick={handleClickSelect}
              placeholder={`Enter Select ${title}`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              data-id={ID}
            />
          </Tippy>
        ) : (
          <input
            ref={inputRef}
            type={inputType}
            className={cx('search', inputClassname ? `${inputClassname}` : ' form-control py-2')}
            placeholder={`Enter Select ${title}`}
            value={search}
            autoComplete={inputType === 'password' ? `current-password` : ''}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        )}
      </div>
    </>
  );
});
