import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Manufacturer.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import config from '~/config';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import Images from '~/components/Images';
import { DeleteData, GetData } from '~/api/General/HandleData';
import TollsEdit from '~/layout/Component/TollsEdit';

const cx = classNames.bind(styles);

export default function Manufacturer() {
  const [dataTable, setDataTable] = useState(null);
  const [reloadData, setReloadData] = useState(1);
  const [filterManu, setFilterManu] = useState({
    name: '',
    status: '',
  });

  const handleSetReload = (value) => {
    setReloadData(reloadData + value);
  };

  const handleSetname = (value) => {
    setFilterManu({
      ...filterManu,
      name: value,
    });
  };

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setFilterManu({
      ...filterManu,
      [name]: value,
    });
  };

  useEffect(() => {
    GetData('admin', 'manu', filterManu)
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => console.log(e));
  }, [filterManu]);
  return (
    <>
      <WrapperMain
        title="Manufacturer"
        BtnAddRender={
          <Button className={cx('btn_add_manu')} type="button" to={config.adminRoutes.AddManufacturer} gradient_primary>
            Add Manufacturer
          </Button>
        }
      >
        <div className={cx('filter_data')}>
          <h4>
            <b>Filter Manufacterer</b>
          </h4>
          <div className={cx('filter_content', 'd-flex flex-wrap flex-row')}>
            <FormSearch title="name" name="name" useTippy={false} searchValue={handleSetname} />
            <FormSelect title="status" name="status" useStatus={true} handleOnchange={handleOnchange} />
          </div>
        </div>
        <div className={cx('manu')}>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>logo</th>
                <th>status</th>
                <th>descriptions</th>
                <th>tools</th>
              </tr>
            </thead>
            <tbody>
              {dataTable ? (
                dataTable.map((dt, index) => (
                  <tr key={index}>
                    <td>{dt.name}</td>
                    <td>
                      <div className={cx('avatar')}>
                        <Images src={dt.logo} alt={dt.logo} />
                      </div>
                    </td>
                    <td>{dt.status === 1 ? 'Show' : 'Hide'}</td>
                    <td>{dt.descriptions}</td>
                    <td>
                      <TollsEdit data={dt} type="manu" namePath="manufacturer" handleDelete={handleSetReload} />
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </WrapperMain>
    </>
  );
}
