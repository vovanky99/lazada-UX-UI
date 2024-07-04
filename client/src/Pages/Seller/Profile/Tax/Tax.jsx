import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './Tax.module.scss';

const cx = classNames.bind(styles);

export default function Tax() {
  return (
    <Fragment>
      <section className={cx('wrapper')}>Identity</section>
    </Fragment>
  );
}
