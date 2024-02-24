import classNames from 'classnames/bind';
import styles from './Search.Module.scss';

import SideBar from './SideBar';
import SearchContent from './SearchContent';

const cx = classNames.bind(styles);

export default function Search() {
  return (
    <div className={cx('search-wrapper', 'd-flex')}>
      <div className={cx('main-content', 'd-flex flex-row')}>
        <section className={cx('sidebar')}>
          <SideBar />
        </section>
        <section className={cx('result-content')}>
          <SearchContent />
        </section>
      </div>
    </div>
  );
}
