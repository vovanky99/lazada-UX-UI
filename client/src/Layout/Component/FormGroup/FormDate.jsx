import classNames from 'classnames/bind';
import styles from './FormGroup.module.scss';
import { forwardRef, useEffect, useState } from 'react';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

export const FormDate = forwardRef(function Form(
  { title, name, containerClass, inputClass, handleSetValue = () => {}, handleOnchange = () => {}, data },
  ref,
) {
  const [value, setValue] = useState(() => {
    if (data) {
      return format(new Date(data), 'yyyy-MM-dd');
    } else {
      return '';
    }
  });

  useEffect(() => {
    handleSetValue(value);
  });
  return (
    <div className={cx('form-date', containerClass || 'form-group flex-grow-1')}>
      <label className={cx('form-label text-capitalize')}>{title}</label>
      <input
        name={name}
        className={cx(inputClass ? `${inputClass}` : ' form-control py-2')}
        ref={ref}
        type="date"
        value={value}
        onChange={(e) => {
          handleOnchange(e);
          setValue(e.target.value);
        }}
      />
    </div>
  );
});
