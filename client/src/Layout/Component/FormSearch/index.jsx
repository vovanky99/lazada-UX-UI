import classNames from 'classnames/bind';

import styles from './FormSearch.module.scss';
import { Fragment, forwardRef, useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import Debounce from '~/hooks/Debounce';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export const FormSearch = forwardRef(function FormSearch(
  {
    useTippy = true,
    name,
    valueID,
    useColumn = false,
    inputType = 'text',
    inputClass,
    useForgetPassword = false,
    MaxLength,
    forgetLink,
    containerClass,
    Value,
    min,
    max,
    data,
    title,
    classTitle,
    useLabel = true,
    useNull = false,
    areaCode,
    handleSetID = () => {},
    searchValue = () => {},
    handleOnchange = () => {},
    handleOnclick = () => {},
    disabled = false,
    children,
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

  /* handle hide tippy */
  const handleClickOutsideSelect = () => {
    setSelect(false);
  };

  /* handle show tippy */
  const handleClickSelect = () => {
    setSelect(true);
  };

  /* handle blur when use phone number */
  const handleBlur = (e) => {
    let regex = new RegExp(`\\+${areaCode}\\d+`, 'g');
    if (areaCode) {
      if (!e.target.value.match(regex) && e.target.value.length === 9 && !e.target.value.match(/[a-zA-Z$]/g)) {
        setSearch(`+${areaCode}` + e.target.value);
      } else if (e.target.value.match(/^0/g) && e.target.value.length === 10 && !e.target.value.match(/[a-zA-Z$]/g)) {
        setSearch(`+${areaCode}` + e.target.value.slice(1, 10));
      }
    }
  };

  /* set search value ID */
  useEffect(() => {
    handleSetID(ID);
  }, [ID]);

  /* set search value */
  useEffect(() => {
    searchValue(searchDebounce);
  }, [searchDebounce]);

  /* handle item value  */
  useEffect(() => {
    const c = document.querySelectorAll(`.option-item-${classTitle || title}`);
    const s = document.querySelector('.search');

    const handleClick = (e) => {
      setSearch(e.target.dataset.value);
      setSelect(false);
      handleOnclick(e);
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

  /* handle resize tippy search value */
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
  }, []);

  return (
    <>
      <div
        ref={selectRef}
        className={cx(
          'select-container',
          containerClass || 'form-group d-flex flex-grow-1',
          useColumn ? 'flex-column' : 'flex-row',
        )}
      >
        {useLabel ? (
          <label className="form-label text-capitalize">
            {title}
            {useForgetPassword ? (
              <Button to={forgetLink} className={cx('p-0')} transparent>
                <strong>Forgot Password?</strong>
              </Button>
            ) : (
              ''
            )}
          </label>
        ) : (
          ''
        )}
        {useTippy ? (
          <Tippy
            interactive
            visible={select}
            offset={[0, 0]}
            placement="bottom"
            render={(attrs) => (
              <ul ref={optionRef} className={cx('option_container')} {...attrs} tabIndex="-1">
                {data?.length > 0 && useNull ? (
                  <li
                    className={cx('option-single', `option-item-${classTitle || title}`)}
                    data-name={name}
                    data-value=""
                    data-id=""
                  >
                    Null
                  </li>
                ) : (
                  ''
                )}
                {data
                  ? data.map((d) => (
                      <li
                        className={cx('option-single', `option-item-${classTitle || title}`)}
                        data-value={d.name}
                        data-name={name}
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
              placeholder={`Please Enter ${title}`}
              value={search}
              onChange={(e) => {
                const { value, maxLength } = e.target;
                handleOnchange(e);
                setSearch(value);
                if (MaxLength) {
                  setSearch(value.slice(0, maxLength - 1));
                }
              }}
              maxLength={MaxLength}
              data-id={ID}
              disabled={disabled}
            />
          </Tippy>
        ) : (
          <Fragment>
            <input
              ref={ref}
              type={inputType}
              name={name}
              min={min}
              max={max}
              disabled={disabled}
              className={cx('search', inputClass ? `${inputClass}` : ' form-control py-2')}
              placeholder={`Please Enter ${title}`}
              value={search}
              autoComplete={inputType === 'password' ? `on` : ''}
              onBlur={handleBlur}
              onKeyUp={(e) => {
                if (min && e.target.value < min) {
                  setSearch(min);
                }
                if (max && parseInt(e.target.value) > max) {
                  setSearch(max);
                }
              }}
              onChange={(e) => {
                const { value, maxLength } = e.target;
                handleOnchange(e);
                setSearch(value);
                if (MaxLength) {
                  setSearch(value.slice(0, maxLength - 1));
                }
              }}
              maxLength={MaxLength}
            />
            {children ? <Fragment>{children}</Fragment> : <></>}
          </Fragment>
        )}
      </div>
    </>
  );
});
