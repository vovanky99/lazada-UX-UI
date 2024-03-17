import classNames from 'classnames/bind';
import styles from './Search.Module.scss';

import SideBar from './SideBar';
import SearchContent from './SearchContent';
import useAuthContext from '~/contexts/Auth/AuthContent';

const cx = classNames.bind(styles);

export default function Search() {
  const { searchVl } = useAuthContext();

  return (
    <div className={cx('search-wrapper', 'd-flex')}>
      <div className={cx('main-content', 'd-flex flex-row')}>
        <section className={cx('sidebar')}>
          <SideBar />
        </section>
        <section className={cx('result-content')}>
          <SearchContent data={searchVl} />
        </section>
      </div>
    </div>
  );
}
