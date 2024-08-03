import classNames from 'classnames/bind';
import styles from './FormGroup.module.scss';
import { forwardRef, useEffect, useState } from 'react';
import Translate from '../Translate';

const cx = classNames.bind(styles);

const gender = [
  { name: 'female', id: '0' },
  { name: 'male', id: '1' },
];

const status = [
  { name: 'hide', id: '0' },
  { name: 'show', id: '1' },
];

export const FormSelect = forwardRef(function Form(
  {
    containerClass,
    selectClass,
    useStatus = false,
    defaultValue,
    title,
    name,
    handleSetValue = () => {},
    data,
    handleOnchange = () => {},
  },
  ref,
) {
  const [value, setValue] = useState(defaultValue || '');
  useEffect(() => {
    handleSetValue(value);
  }, [value]);
  return (
    <div className={cx('form-select', containerClass || ' form-group flex-grow-1')}>
      <label className={cx('form-label text-capitalize')}>
        <Translate>{title}</Translate>
      </label>
      <select
        name={name}
        ref={ref}
        value={value}
        className={cx(selectClass || 'form-control py-2 text-capitalize')}
        onChange={(e) => {
          setValue(e.target.value);
          handleOnchange(e);
        }}
      >
        {defaultValue || defaultValue === 0 ? '' : <option value="" className="text-capitalize"></option>}
        {data
          ? data.map((d, index) => (
              <option value={d?.id} key={index}>
                <Translate>{d.name}</Translate>
              </option>
            ))
          : useStatus
          ? status.map((d, index) => (
              <option value={d?.id} key={index}>
                {Translate({ children: d.name })}
              </option>
            ))
          : gender.map((d, index) => (
              <option value={d?.id} key={index}>
                {Translate({ children: d.name })}
              </option>
            ))}
      </select>
    </div>
  );
});
