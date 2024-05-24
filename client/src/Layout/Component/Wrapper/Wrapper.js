import classNames from 'classnames/bind';

import styles from './Wrapper.module.scss';

const cx = classNames.bind(styles);

export default function Wrapper({ children, title, BtnAddRender }) {
  return (
    <>
      <div className={cx('main_wrapper')}>
        <h3 className={cx('wrapper_title')}>
          <b>{title}</b>
        </h3>
        <div className={cx('wrapper_btn-add', 'd-flex flex-row flex-wrap')}>{BtnAddRender}</div>
        <div className={cx('wrapper_content')}>{children}</div>
      </div>
    </>
  );
}
