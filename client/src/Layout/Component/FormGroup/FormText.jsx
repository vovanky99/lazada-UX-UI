import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormGroup.module.scss';
import Translate from '../Translate';
import useDebounce from '~/hooks/Debounce/Debounce';

const cx = classNames.bind(styles);

export const FormText = forwardRef(function Form(
  {
    title,
    name,
    useLabel = true,
    usePlaceholder = true,
    containerClass,
    rows,
    placeholder,
    handleOnchange = () => {},
    cols,
    textClassname,
    handleSetValue = () => {},
    data,
  },
  ref,
) {
  const [value, setValue] = useState(data || '');
  const Debouce = useDebounce(value, 500);

  useEffect(() => {
    handleSetValue(Debouce);
  }, [Debouce]);
  return (
    <div className={cx('form-text', containerClass || 'form-group flex-grow-1')}>
      {useLabel ? <label className={cx('form-label text-capitalize')}>{Translate({ children: title })}</label> : ''}
      <textarea
        ref={ref}
        className={cx(textClassname ? textClassname + ' form-control' : ' form-control')}
        cols={cols}
        name={name}
        rows={rows}
        value={value}
        placeholder={
          usePlaceholder
            ? placeholder
              ? Translate({ children: placeholder })
              : Translate({ children: 'component.form_text' }) + Translate({ children: title })
            : ''
        }
        onChange={(e) => {
          setValue(e.target.value);
          handleOnchange(e);
        }}
      />
    </div>
  );
});
