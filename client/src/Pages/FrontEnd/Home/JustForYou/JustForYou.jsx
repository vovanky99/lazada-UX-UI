import classNames from 'classnames/bind';
import React from 'react';

import styles from './JustForYou.module.scss';
import JFYContent from './JFYContent';

const cx = classNames.bind(styles);

function JustForYou() {
  return (
    <div className={cx('wrapper')}>
      <h4 className={cx('jfy-title', 'text-capitalize')}>Just For You</h4>
      <JFYContent />
    </div>
  );
}
export default JustForYou;
