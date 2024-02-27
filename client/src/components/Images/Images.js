import { forwardRef, useState } from 'react';
// import images from '~/assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Images = forwardRef(
  (
    {
      src,
      alt,
      className,
      //  fallBack: customFallback = images.noImage,
      ...props
    },
    ref,
  ) => {
    const [fallBack, setFallback] = useState('');
    // const handleError = () => {
    //   setFallback(customFallback);
    // };
    return (
      <img
        className={cx('wrapper', className)}
        ref={ref}
        src={src || fallBack}
        alt={alt}
        {...props}
        // onError={handleError}
      />
    );
  },
);
export default Images;
