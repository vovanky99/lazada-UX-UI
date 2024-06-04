import classNames from 'classnames/bind';
import styles from '~/pages/ADMIN/Category/Category.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import { useEffect, useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import ElementCat from './ElementCat';
import { CreateData, GetData } from '~/api/General/HandleData';
import Category from '~/layout/Component/Category';
import AddCat from '~/pages/ADMIN/Category/AddCat/';

const cx = classNames.bind(styles);

export default function AllCategory() {
  const [dataTable, setDataTable] = useState(null);
  const [reloadData, setReloadData] = useState(1);

  // state for filter
  const [filterCat, setFilterCat] = useState({
    name: '',
    status: '',
    parent_id: '',
  });
  const [deleteSuccess, setDeleteSuccess] = useState(1);

  const handleReloadData = (value) => {
    setReloadData(reloadData + value);
  };
  const AddDeleteSuccess = (value) => {
    setDeleteSuccess(deleteSuccess + value);
  };

  const setNameFilter = (value) => {
    setFilterCat({
      ...filterCat,
      name: value,
    });
  };

  const handleSetParentCat = (e) => {
    const { id, name } = e.target.dataset;
    setFilterCat({
      ...filterCat,
      [name]: id,
    });
  };

  const handleSetStatus = (value) => {
    setFilterCat({
      ...filterCat,
      status: value,
    });
  };

  /* get all for Data table */
  useEffect(() => {
    GetData('admin', 'category', filterCat)
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => console.log(e));
  }, [filterCat, deleteSuccess, reloadData]);
  return (
    <>
      <WrapperMain
        title="All Category"
        BtnAddRender={
          <>
            <AddCat handleReload={handleReloadData} />
          </>
        }
      >
        <div className={cx('filter_data')}>
          <h4 className="text-capitalize">
            <b>filter Data</b>
          </h4>
          <div className={cx('filter_content', 'd-flex flex-row flex-wrap')}>
            <FormSearch title="name" useTippy={false} searchValue={setNameFilter} />
            <FormSelect title="status" useStatus={true} handleSetValue={handleSetStatus} />
            <Category title="parent" titleClass="parent-id" name="parent_id" handleOnclick={handleSetParentCat} />
          </div>
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
                <ElementCat handleDelete={AddDeleteSuccess} key={index} data={d} />
              ))}
            </tbody>
          </table>
        </div>
      </WrapperMain>
    </>
  );
}
