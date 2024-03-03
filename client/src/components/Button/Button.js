import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
  children,
  to,
  onClick,
  href,
  className,
  rounded = false,
  primary = false,
  outline = false,
  disabled = false,
  text = false,
  small = false,
  large = false,
  ...passProps
}) {
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
    Comp = a;
  }
  const classes = cx('wrapper', {
    primary,
    large,
    small,
    outline,
    text,
    disabled,
    rounded,
    [className]: className,
  });
  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}

export default Button;
