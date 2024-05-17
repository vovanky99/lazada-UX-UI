import classNames from 'classnames/bind';

import styles from '../Location.module.scss';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import Debounce from '~/Hooks/Debounce';

const cx = classNames.bind(styles);

export const SelectLocation = forwardRef(function Select(
  { data, title, NullValue = false, handleSetID = () => {}, searchSelectValue = () => {} },
  ref,
) {
  const searchRef = useRef();
  const selectRef = useRef();
  const optionRef = useRef();
  const [select, setSelect] = useState(false);
  const [ID, setID] = useState('');
  const [search, setSearch] = useState('');

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
    const c = document.querySelectorAll(`.select-option-${title}`);
    const s = searchRef.current;

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
      <div ref={selectRef} className={cx('select-container', 'form-group flex-grow-1')}>
        <label className="form-label text-capitalize">{title}</label>
        <Tippy
          interactive
          visible={select}
          offset={[0, 0]}
          placement="bottom"
          render={(attrs) => (
            <ul ref={optionRef} className={cx('option')} {...attrs}>
              {data.length > 0 && NullValue ? (
                <li className={cx('option-single', `select-option-${title}`)} data-value="" data-id="">
                  Null
                </li>
              ) : (
                ''
              )}
              {data
                ? data.map((d) => (
                    <li
                      className={cx('option-single', `select-option-${title}`)}
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
            ref={searchRef}
            type="text"
            className={cx('search', 'form-control py-2')}
            onClick={handleClickSelect}
            placeholder={`Enter Select ${title}`}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            data-id=""
          />
        </Tippy>
      </div>
    </>
  );
});
