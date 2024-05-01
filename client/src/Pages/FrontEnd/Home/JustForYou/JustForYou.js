import classNames from 'classnames/bind';
import React, { Suspense } from 'react';

import styles from './JustForYou.module.scss';
import JFYContent from './JFYContent';

const cx = classNames.bind(styles);
// const LazyJFYContent = React.lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import('./JFYContent')), 4000);
//   });
// });

function JustForYou() {
  return (
    <div className={cx('wrapper')}>
      <span className={cx('jfy-title', 'text-capitalize')}>Just For You</span>
      {/* <Suspense fallback={<div className={cx('loading-container')}></div>}>
        <LazyJFYContent />
      </Suspense> */}
      <JFYContent />
    </div>
  );
}
export default JustForYou;
