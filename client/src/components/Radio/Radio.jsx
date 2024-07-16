import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Radio.module.scss';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

const Radio = forwardRef(function Radio(
  { title, primary, DF = false, className, disabled, type, onClick, ...passProps },
  ref,
) {
  const props = {
    onClick,
    ...passProps,
  };
  if (disabled) {
    Object.keys(props).forEach((prop) => {
      if (prop.startsWith('on') && typeof props[prop] === 'function') {
        delete props['prop'];
      }
    });
  }
  const classes = cx(
    'wrapper',
    {
      primary,
      disabled,
      [className]: className,
    },
    DF ? `radio_${primary ? 'primary' : ''}_active` : '',
  );

  const handleOnclick = (e) => {
    const { type, color } = e.currentTarget.dataset;
    if (color === 'primary') {
      if (e.currentTarget.classList.contains('radio_primary_active')) {
        e.currentTarget.classList.remove('radio_primary_active');
      } else {
        e.currentTarget.classList.add('radio_primary_active');
      }
    }
  };
  return (
    <div
      ref={ref}
      id="radio"
      data-type={type}
      data-color={primary ? 'primary' : ''}
      className={classes}
      {...props}
      onClick={handleOnclick}
    >
      <div className={cx('node')}></div>
      <div className={cx('title')}>
        <Translate>{title}</Translate>
      </div>
    </div>
  );
});

export default Radio;
