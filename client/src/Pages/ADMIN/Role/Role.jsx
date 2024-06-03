import classNames from 'classnames/bind';
import styles from '~/pages/ADMIN/Role/Role.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Tippy from '@tippyjs/react';
import Button from '~/components/Button';
import AddRole from './AddRole';
import { FormSearch } from '~/layout/Component/FormSearch';
import { useEffect, useState } from 'react';
import { GetData } from '~/api/General/HandleData';
import ListRole from './ListRole';

const cx = classNames.bind(styles);

export default function Role() {
  const [name, setName] = useState('');
  const [dataTable, setDataTable] = useState(null);

  useEffect(() => {
    GetData('admin', 'role', { name: name })
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => console.log(e));
  }, [name]);

  return (
    <>
      <WrapperMain title="Role" BtnAddRender={<AddRole />}>
        <div className={cx('filter_data')}>
          <h4>
            <b>Filter Role</b>
          </h4>
          <div className={cx('filter_content')}>
            <FormSearch title="name" name="name" searchValue={setName} useTippy={false} />
          </div>
        </div>
        <div className={cx('list_role')}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>descriptions</th>
                <th>tolls</th>
              </tr>
            </thead>
            <tbody>{dataTable ? dataTable.map((dt, index) => <ListRole data={dt} key={index} />) : <></>}</tbody>
          </table>
        </div>
      </WrapperMain>
    </>
  );
}
