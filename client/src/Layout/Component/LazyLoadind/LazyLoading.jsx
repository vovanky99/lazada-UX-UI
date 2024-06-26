import classNames from 'classnames/bind';

import styles from './LazyLoading.module.scss';

const cx = classNames.bind(styles);

export default function LazyLoading({}) {
  return (
    <div className={cx('wrapper', 'd-flex flex-row align-items-center justify-content-center')}>
      <div className={cx('loading')}></div>
    </div>
  );
}
