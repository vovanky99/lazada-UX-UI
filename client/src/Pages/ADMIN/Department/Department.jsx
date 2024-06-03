import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from '~/pages/ADMIN/Department/Department.module.scss';
import ListDepartment from '~/pages/ADMIN/Department/ListDepartment';
import WrapperMain from '~/layout/Component/WrapperMain';
import { FormSearch } from '~/layout/Component/FormSearch';
import { GetData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function Department() {
  const [dataTable, setDataTable] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    GetData('admin', 'department', name)
      .then((result) => setDataTable(result))
      .catch((e) => console.log(e));
  }, [name]);

  return (
    <>
      <WrapperMain title="All Department">
        <div className={cx('filter_data')}>
          <h4 className="text-capitalize">
            <b>filter Data</b>
          </h4>
          <div className={cx('filter_content', 'd-flex flex-row flex-wrap')}>
            <FormSearch title="name" name="name" useTippy={false} searchValue={setName} />
          </div>
        </div>
        <div className={cx('data_table')}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>status</th>
                <th>tolls</th>
              </tr>
            </thead>
            <tbody>
              {dataTable?.map((d, index) => (
                <ListDepartment P_name={d.name} P_status={d.status} P_id={d.id} />
              ))}
            </tbody>
          </table>
        </div>
      </WrapperMain>
    </>
  );
}
