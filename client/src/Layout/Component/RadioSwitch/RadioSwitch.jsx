import classNames from 'classnames/bind';

import styles from './RadioSwitch.module.scss';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

export default function RadioSwitch({ isClose = true, className, disabled = false }) {
  const radioSwitchRef = useRef();
  const classes = cx('radio_switch', {
    disabled,
    [className]: className,
  });

  useEffect(() => {
    const radioSwitch = radioSwitchRef.current;
    const handleSwitchRadio = (e) => {
      e.target.classList.toggle('radio-switch-active');
    };
    if (radioSwitch && !disabled) {
      radioSwitch.addEventListener('click', handleSwitchRadio);
    }
    return () => {
      if (radioSwitch && !disabled) {
        radioSwitch.removeEventListener('click', handleSwitchRadio);
      }
    };
  }, [disabled]);
  return (
    <div className={cx('wrapper')}>
      <div ref={radioSwitchRef} className={classes}></div>
    </div>
  );
}
