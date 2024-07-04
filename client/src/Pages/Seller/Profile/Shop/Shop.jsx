import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './Shop.module.scss';

const cx = classNames.bind(styles);

export default function Shop() {
  return (
    <Fragment>
      <section className={cx('wrapper')}>Identity</section>
    </Fragment>
  );
}
