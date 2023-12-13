import classNames from 'classnames/bind';
import React, { Suspense } from 'react';

import styles from './JustForYou.module.scss';

const cx = classNames.bind(styles);
const LazyJFYContent = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./JFYContent')), 4000);
  });
});

function JustForYou() {
  return (
    <div className={cx('wrapper')}>
      <span className={cx('jfy-title')}>Just For You</span>
      <Suspense fallback={<div className={cx('loading-container')}></div>}>
        <LazyJFYContent />
      </Suspense>
    </div>
  );
}
export default JustForYou;
