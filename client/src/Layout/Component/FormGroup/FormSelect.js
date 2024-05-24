import classNames from 'classnames/bind';
import styles from './FormGroup.module.scss';
import { forwardRef, useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const gender = [
  { name: 'Female', id: '0' },
  { name: 'Male', id: '1' },
];

const status = [
  { name: 'Hide', id: '0' },
  { name: 'Show', id: '1' },
];

export const FormSelect = forwardRef(function Form(
  { containerClass, selectClass, isStatus = false, defaultValue, title, handleSetValue = () => {}, data },
  selectRef,
) {
  const [value, setValue] = useState('');
  useEffect(() => {
    handleSetValue(value);
  });
  return (
    <div className={cx('form-select', containerClass || ' form-group flex-grow-1')}>
      <label className={cx('form-label text-capitalize')}>{title}</label>
      <select
        ref={selectRef}
        value={defaultValue}
        className={cx(selectClass || 'form-control py-2')}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        {defaultValue ? '' : <option value="">Null</option>}
        {data
          ? data.map((d, index) => (
              <option value={d.id} key={index}>
                {d.name}
              </option>
            ))
          : isStatus
          ? status.map((d, index) => (
              <option value={d.id} key={index}>
                {d.name}
              </option>
            ))
          : gender.map((d, index) => (
              <option value={d.id} key={index}>
                {d.name}
              </option>
            ))}
      </select>
    </div>
  );
});
