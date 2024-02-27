import classNames from 'classnames/bind';
import style from './Account.module.scss';
import SideBar from './SideBar';

const cx = classNames.bind(style);

function Account({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('main', 'd-flex flex-row')}>
        <section className={cx('main-left')}>
          <SideBar />
        </section>
        <section className={cx('main-right')}>{children}</section>
      </div>
    </div>
  );
}

export default Account;
