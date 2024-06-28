import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Radio.module.scss';

const cx = classNames.bind(styles);

const Radio = forwardRef(function Radio({ title, primary, className, disabled, onClick, ...passProps }, ref) {
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
  const classes = cx('wrapper', {
    primary,
    disabled,
    [className]: className,
  });

  const handleOnclick = (e) => {
    if (e.currentTarget.classList.contains('radio_active')) {
      e.currentTarget.classList.remove('radio_active');
    } else {
      e.currentTarget.classList.add('radio_active');
    }
  };
  return (
    <div id="radio" className={classes} {...props} ref={ref} onClick={handleOnclick}>
      <div className={cx('node')}></div>
      <div className={cx('title')}>{title}</div>
    </div>
  );
});

export default Radio;
