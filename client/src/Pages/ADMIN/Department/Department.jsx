import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';

import styles from '~/pages/ADMIN/Department/Department.module.scss';
import ListDepartment from '~/pages/ADMIN/Department/ListDepartment';
import WrapperMain from '~/layout/Component/WrapperMain';

const cx = classNames.bind(styles);

export default function Department() {
  const [dataTable, setDataTable] = useState(null);
  return (
    <>
      <WrapperMain title="All Department">
        <div className={cx('filter_data')}>
          <h4 className="text-capitalize">
            <b>filter Data</b>
          </h4>
          <div className={cx('filter_content', 'd-flex flex-row flex-wrap')}></div>
        </div>
        <div className={cx('data_table')}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>parent</th>
                <th>status</th>
                <th>tolls</th>
              </tr>
            </thead>
            <tbody>
              {dataTable?.map((d, index) => (
                <ListDepartment />
              ))}
            </tbody>
          </table>
        </div>
      </WrapperMain>
    </>
  );
}
