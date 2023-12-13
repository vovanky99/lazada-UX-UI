import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Images = forwardRef(({ src, alt, classes, fallBack: customFallback = images.noImage, ...props }, ref) => {
  const [fallBack, setFallback] = useState('');
  const handleError = () => {
    setFallback(customFallback);
  };
  return (
    <img
      className={cx('wrapper', classes)}
      ref={ref}
      src={src || fallBack}
      alt={alt}
      {...props}
      onError={handleError}
    />
  );
});

Images.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  classes: PropTypes.string,
  fallBack: PropTypes.string,
};

export default Images;
