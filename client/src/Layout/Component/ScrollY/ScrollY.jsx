import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './ScrollY.module.scss';

const cx = classNames.bind(styles);

export default function ScrollY({ className, children }) {
  return (
    <Fragment>
      <div className={cx('wrapper', className)}>{children}</div>
    </Fragment>
  );
}
