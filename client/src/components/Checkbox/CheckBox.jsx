import classNames from 'classnames/bind';
import style from './checkbox.module.scss';
import { forwardRef } from 'react';

const cx = classNames.bind(style);

const CheckBox = forwardRef(function CheckBox(
  { requir = true, valueInput, Label = '', ClassName, IconCheck = '', checkboxclass = '' },
  ref,
) {
  return (
    <div className={cx('container', ClassName || 'd-flex flex-row align-items-center ')}>
      <div className={cx('checkbox_container')}>
        <input ref={ref} className={cx(checkboxclass)} type="checkbox" required={requir} value={valueInput} />
        <span className={cx('input-helper', ' ' + IconCheck)}></span>
      </div>
      <label>{Label}</label>
    </div>
  );
});
export default CheckBox;
