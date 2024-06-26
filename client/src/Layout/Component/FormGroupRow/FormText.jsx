import { forwardRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './FormGroupRaw.module.scss';

const cx = classNames.bind(styles);

const FormText = forwardRef(function FormText(
  {
    containerClass,
    inputClass,
    labelClass,
    type = 'text',
    data,
    title,
    disabled,
    name,
    handleOnchange = () => {},
    ...passProps
  },
  ref,
) {
  const [value, setValue] = useState(data || '');

  const props = {
    ...passProps,
  };
  if (disabled) {
    Object.keys(props).forEach((prop) => {
      if (prop.startsWith('on') && typeof props[prop] === 'function') {
        delete props['prop'];
      }
    });
  }
  const inputClassName = cx('input', {
    disabled,
    [inputClass]: inputClass,
  });
  return (
    <div className={cx(containerClass, 'd-flex flex-row align-items-center')}>
      <label className={cx(labelClass, 'form-label col-2 text-end text-capitalize')}>{title}</label>
      <input
        ref={ref}
        name={name}
        type={type}
        value={value}
        onChange={(e) => {
          handleOnchange(e);
          setValue(e.target.value);
        }}
        className={cx(inputClassName, 'form-control col')}
        placeholder="Please Enter Name... "
        disabled={disabled}
      />
    </div>
  );
});

export default FormText;
