import classNames from 'classnames/bind';
import React from 'react';

import styles from './JustForYou.module.scss';
import JFYContent from './JFYContent';

const cx = classNames.bind(styles);

function JustForYou() {
  return (
    <div className={cx('wrapper')}>
      <span className={cx('jfy-title', 'text-capitalize')}>Just For You</span>
      <JFYContent />
    </div>
  );
}
export default JustForYou;
