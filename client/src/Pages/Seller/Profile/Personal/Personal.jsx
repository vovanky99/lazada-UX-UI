import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './Personal.module.scss';

const cx = classNames.bind(styles);

export default function Personal() {
  return (
    <Fragment>
      <section className={cx('wrapper')}>Identity</section>
    </Fragment>
  );
}
