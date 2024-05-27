import classNames from 'classnames/bind';

import styles from '../User.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function EditUser() {
  const params = useParams();
  return (
    <>
      <WrapperMain title="Edit User">
        <div className={cx('filter_data')}></div>
      </WrapperMain>
    </>
  );
}
