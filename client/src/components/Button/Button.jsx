import classNames from 'classnames/bind';
import styles from './Button.module.scss';

import { Link } from 'react-router-dom';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

const Button = forwardRef(function Button(
  {
    to,
    href,
    children,
    onClick,
    className,
    full_width = false,
    transparent = false,
    rounded = false,
    primary = false,
    gradient_primary = false,
    gradient_danger = false,
    outline = false,
    disabled = false,
    text = false,
    none_size = false,
    small = false,
    large = false,
    ...passProps
  },
  ref,
) {
  let Comp = 'button';
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

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  const classes = cx('wrapper', {
    primary,
    transparent,
    gradient_primary,
    gradient_danger,
    large,
    small,
    none_size,
    outline,
    text,
    disabled,
    rounded,
    full_width,
    [className]: className,
  });
  return (
    <Comp className={classes} {...props} ref={ref}>
      {children}
    </Comp>
  );
});
export default Button;
