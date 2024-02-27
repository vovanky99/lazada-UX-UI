import classNames from 'classnames/bind';
import style from './Account.module.scss';

const cx = classNames.bind(style);

function Account({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('main', 'd-flex flex-row')}>
        <div className={cx('main-left')}></div>
        <div className={cx('main-right')}>{children}</div>
      </div>
    </div>
  );
}

export default Account;
