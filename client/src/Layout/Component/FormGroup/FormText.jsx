import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormGroup.module.scss';

const cx = classNames.bind(styles);

export const FormText = forwardRef(function Form(
  { title, isLabel = true, containerClass, rows, cols, textClassname, handleSetValue = () => {}, data },
  ref,
) {
  const [value, setValue] = useState(data || '');

  useEffect(() => {
    handleSetValue(value);
  });
  return (
    <div className={cx('form-text', containerClass || 'form-group flex-grow-1')}>
      {isLabel ? <label className={cx('form-label text-capitalize')}>{title}</label> : ''}
      <textarea
        ref={ref}
        className={cx(textClassname ? textClassname + ' form-control' : ' form-control')}
        cols={cols}
        rows={rows}
        value={value}
        placeholder={`Enter keyword for ${title}`}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
});
