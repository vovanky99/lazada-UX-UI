import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Radio.module.scss';
import Translate from '~/layout/Component/Translate';

const cx = classNames.bind(styles);

const Radio = forwardRef(function Radio(
  { title, color = 'primary', DF = false, className, disabled, type, onClick, ...passProps },
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
      color,
      disabled,
      [className]: className,
    },
    DF ? `radio_${color}_active` : '',
  );
  return (
    <div ref={ref} id="radio" data-type={type} data-color={color} className={classes} {...props}>
      <div className={cx('node')}></div>
      <div className={cx('title')}>
        <Translate>{title}</Translate>
      </div>
    </div>
  );
});

export default Radio;
