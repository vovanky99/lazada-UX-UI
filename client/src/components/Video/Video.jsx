import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Video.module.scss';

const cx = classNames.bind(styles);

const Video = forwardRef(function Video(
  {
    className,
    src,
    type = 'video/mp4',
    controls = true,
    autoPlay = true,
    handleOnPlay = () => {},
    onTimeUpdate = () => {},
  },
  ref,
) {
  const handleOnPlayVideo = (e) => {
    handleOnPlay(true);
  };
  return (
    <video
      ref={ref}
      className={cx('wrapper', className)}
      controls={controls}
      onPlay={handleOnPlayVideo}
      onTimeUpdate={onTimeUpdate}
      // src={src}
      autoPlay={autoPlay}
    >
      <source src={src} type={type} />
    </video>
  );
});

export default Video;
