import HeadlessTippy from '@tippyjs/react/headless';
import { forwardRef, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './TodoList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '~/hooks/Debounce/Debounce';
const cx = classNames.bind(styles);

const TodoList = forwardRef(function TodoList(
  {
    name,
    title,
    data,
    valueTodoData = null,
    valueTodo = null,
    classTitle,
    offsetX = 0,
    offsetY = 0,
    containerClass,
    handleGetTodoList = () => {},
    handleSearchValue = () => {},
    inputClass,
  },
  ref,
) {
  const tippyRef = useRef();
  const wrapperRef = useRef();
  const [tippy, setTippy] = useState(false);
  const [value, setValue] = useState('');
  const [todoData, setTodoData] = useState(valueTodoData || []);
  // state save id for pass data
  const [todo, setTodo] = useState(valueTodo || []);

  const debounce = useDebounce(value, 500);

  const handleClickOutsideTippy = () => {
    setTippy(false);
  };
  const handleClickInput = () => {
    setTippy(true);
  };
  useEffect(() => {
    const el = document.querySelectorAll(`.remove-todo`);
    const handleClick = (e) => {
      let temporaryValue;
      for (let i = 0; i < todoData.length; i++) {
        if (parseInt(todoData[i].id) === parseInt(e.currentTarget.dataset.id)) {
          temporaryValue = i;
          break;
        }
      }
      if (parseInt(todoData[temporaryValue]?.id) === parseInt(e.currentTarget.dataset.id)) {
        setTodo((val) => val.filter((x) => parseInt(x) !== parseInt(e.currentTarget.dataset.id)));
        setTodoData((val) => val.filter((x) => parseInt(x.id) !== parseInt(e.currentTarget.dataset.id)));
      }
    };
    if (el) {
      el.forEach((d) => d.addEventListener('click', handleClick));
    }
    return () => {
      if (el) {
        el.forEach((d) => d.removeEventListener('click', handleClick));
      }
    };
  });

  useEffect(() => {
    handleGetTodoList(todo);
  }, [todo]);
  useEffect(() => {
    handleSearchValue(debounce);
  });
  /* handle resize tippy search */
  useEffect(() => {
    const sl = wrapperRef.current;
    const op = tippyRef.current;
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
  });

  /* handle set id and name for todo list */
  useEffect(() => {
    const el = document.querySelectorAll(`.select-option-${classTitle || title}`);
    const handleClick = (e) => {
      let temporaryValue;
      for (let i = 0; i < todoData.length; i++) {
        if (todoData[i].id === e.target.dataset.id) {
          temporaryValue = i;
          break;
        }
      }
      if (todoData[temporaryValue]?.id.indexOf(e.target.dataset.id) >= 0) {
        setTodoData((val) => val.filter((x) => x !== e.target.dataset.id));
        setTodo((val) => val.filter((x) => x.id !== e.target.dataset.id));
      } else {
        setTodoData((old_value) => [...old_value, { id: e.target.dataset.id, name: e.target.dataset.value }]);
        setTodo((old_value) => [...old_value, e.target.dataset.id]);
      }
      setTippy(false);
    };
    if (el) {
      el.forEach((d) => d.addEventListener('click', handleClick));
    }
    return () => {
      if (el) {
        el.forEach((d) => d.removeEventListener('click', handleClick));
      }
    };
  });

  return (
    <div className={cx('wrapper', containerClass || 'form-group flex-grow-1')}>
      <label className="form-label text-capitalize">{title}</label>
      <div ref={wrapperRef} className={cx('todo-list', 'form-control d-flex flex-row flex-wrap align-items-center')}>
        <div className={cx('list_container')}>
          <ul className={cx('list_contain', 'd-flex flex-row flex-wrap')}>
            {todoData?.map((d, index) => (
              <li key={index} data-id={d.id} data-name={d.name} className={cx('list_element')}>
                {d.name}
                <FontAwesomeIcon className={cx('remove-todo')} data-id={d.id} icon={faXmark} />
              </li>
            ))}
          </ul>
        </div>
        <HeadlessTippy
          interactive
          visible={tippy}
          offset={[offsetX, offsetY]}
          placement="bottom"
          render={(attrs) => (
            <ul ref={tippyRef} className={cx('option')} {...attrs} tabIndex="-1">
              {data
                ? data.map((d) => (
                    <li
                      className={cx('option-element', `select-option-${classTitle || title}`)}
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
            name={name}
            className={cx('search', inputClass ? `${inputClass}` : ' form-control')}
            onClick={handleClickInput}
            placeholder={`Enter Select ${title}`}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </HeadlessTippy>
      </div>
    </div>
  );
});

export default TodoList;
