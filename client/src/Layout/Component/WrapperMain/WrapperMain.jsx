import classNames from 'classnames/bind';

import styles from './Wrapper.module.scss';
import Translate from '../Translate';

const cx = classNames.bind(styles);

export default function WrapperMain({ children, title, BtnAddRender }) {
  return (
    <>
      <div className={cx('main_wrapper')}>
        <h3 className={cx('wrapper_title')}>
          <b>
            <Translate>{title}</Translate>
          </b>
        </h3>
        {BtnAddRender ? <div className={cx('wrapper_btn-add', 'd-flex flex-row flex-wrap')}>{BtnAddRender}</div> : ''}
        <div className={cx('wrapper_content')}>{children}</div>
      </div>
    </>
  );
}
