import classNames from 'classnames/bind';
import styles from './Progress.module.scss';
import { forwardRef, useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Progress = forwardRef(function Progress({ className, seconds = 5, data = 0, onClick, ...passProps }, ref) {
  const [value, setValue] = useState(0);
  const props = {
    onClick,
    ...passProps,
  };
  const classes = cx(
    'process',
    {
      [className]: className,
    },
    'd-flex flex-row',
  );

  useEffect(() => {
    const duration = seconds * 100; //  seconds in milliseconds 1000
    const intervalTime = 100; // Update interval in milliseconds
    const totalIntervals = duration / intervalTime;
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += data / totalIntervals;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setValue(currentProgress);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [data]);
  return (
    <div className={classes} {...props}>
      <div className={cx('bar')}>
        <progress id="process_bar" value={value} min={0} max={100}>
          {value}%
        </progress>
      </div>
      {/* <div id="process_text" className={cx('progress')}></div> */}
    </div>
  );
});
export default Progress;
