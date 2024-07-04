import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './IdentityInfo.module.scss';

const cx = classNames.bind(styles);

export default function IdentityInfo() {
  return (
    <Fragment>
      <section className={cx('wrapper')}>Identity</section>
    </Fragment>
  );
}
