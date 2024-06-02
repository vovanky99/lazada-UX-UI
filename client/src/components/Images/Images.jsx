import { forwardRef, useState } from 'react';
import styles from './Image.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Images = forwardRef(function Images(
  {
    Id,
    src,
    alt,
    className,
    //  fallBack: customFallback = images.noImages,
    ...props
  },
  ref,
) {
  const [fallBack, setFallback] = useState('');
  // const handleError = () => {
  //   setFallback(customFallback);
  // };
  return (
    <img
      id={Id}
      className={cx('wrapper', className)}
      ref={ref}
      src={src || fallBack}
      alt={alt}
      {...props}
      // onError={handleError}
    />
  );
});

export default Images;
