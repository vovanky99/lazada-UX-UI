import classNames from 'classnames/bind';

import styles from './Input.module.scss';
import useDebounce from '~/hooks/Debounce/Debounce';
import Translate from '~/layout/Component/Translate';
import Regex from '~/hooks/Regex';
import MessageText from '~/layout/Component/Message/MessageText';

const { Fragment, useState, useEffect } = require('react');
const { forwardRef } = require('react');
const cx = classNames.bind(styles);

const Input = forwardRef(function Input(
  {
    title = '',
    data = '',
    id = '',
    onClick,
    className,
    useTitle = true,
    validFontSize = '1.6rem',
    children,
    validate = '',
    isRow = true,
    type = 'text',
    delay = 500,
    disabled = false,
    placeholder = '',
    onChange = () => {},
    handleSetValue = () => {},
    ...passProps
  },
  ref,
) {
  const [value, setValue] = useState(data);
  const debounce = useDebounce(value, delay);
  const props = {
    onClick,
    ...passProps,
  };
  const clasess = cx('wrapper', { [className]: className });
  if (disabled) {
    Object.keys(props).forEach((prop) => {
      if (prop.startsWith('on') && typeof props[prop] === 'function') {
        delete props[prop];
      }
    });
  }
  const handleOnchange = (e) => {
    const { value } = e.target;
    if (type === 'number') {
      setValue(value.replace(Regex.number(), ''));
    }
    onChange(e);
    setValue(e.target.value);
  };
  useEffect(() => {
    handleSetValue(debounce);
  }, [debounce]);

  return (
    <div id={id} className={clasess}>
      {useTitle && (
        <label>
          <Translate>{title}</Translate>
        </label>
      )}
      <div className={cx('content', 'd-flex ' + isRow ? 'flex-row' : 'flex-column')}>
        <input
          ref={ref}
          title={title}
          name={title}
          {...props}
          value={value}
          onChange={handleOnchange}
          disabled={disabled}
          placeholder={Translate({ children: placeholder })}
          autoComplete="off"
        />
        {children}
        <MessageText message={validate} className={cx('valid')} style={{ fontSize: validFontSize }} />
      </div>
    </div>
  );
});
export default Input;
