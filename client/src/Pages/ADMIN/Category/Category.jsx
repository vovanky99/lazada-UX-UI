import classNames from 'classnames/bind';
import styles from '~/pages/ADMIN/Category/Category.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import { useEffect, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import ElementCat from './ElementCat';
import { GetData } from '~/api/General/HandleData';
import Category from '~/layout/Component/Category';
import AddCat from '~/pages/ADMIN/Category/AddCat/';
import { useImmer } from 'use-immer';
import Button from '~/components/Button';
import Translate from '~/layout/Component/Translate';
import { useSelector } from 'react-redux';
import EditCat from './ElementCat/EditCat';

const cx = classNames.bind(styles);

export default function AllCategory() {
  const { language } = useSelector((state) => state.Auth);
  const [showEdit, setShowEdit] = useState(false);
  const [dataTable, setDataTable] = useState(null);
  const [reloadData, setReloadData] = useState(1);
  const [addCat, setAddCat] = useState(false);

  // state for filter
  const [filterCat, setFilterCat] = useImmer({
    name: '',
    status: '',
    parent_id: '',
  });
  const [deleteSuccess, setDeleteSuccess] = useState(1);
  const handleClickAddCat = () => {
    setAddCat(true);
  };
  const handleShowEditCat = () => {
    setShowEdit(true);
  };

  const handleHideEditCat = (e) => {
    setShowEdit(false);
  };

  const handleClose = () => {
    setAddCat(false);
  };
  const handleReloadData = (value) => {
    setReloadData(reloadData + value);
  };
  const AddDeleteSuccess = (value) => {
    setDeleteSuccess(deleteSuccess + value);
  };

  const setNameFilter = (value) => {
    setFilterCat((draft) => {
      draft.name = value;
    });
  };

  const handleSetParentCat = (e) => {
    const { id, name } = e.target.dataset;
    setFilterCat((draft) => {
      draft[name] = id;
    });
  };

  const handleSetStatus = (value) => {
    setFilterCat((draft) => {
      draft.status = value;
    });
  };

  /* get all for Data table */
  useEffect(() => {
    GetData('admin', 'category', filterCat, language)
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => console.log(e));
  }, [filterCat, deleteSuccess, reloadData]);
  return (
    <>
      <WrapperMain
        title="all_category"
        BtnAddRender={
          <>
            <Button className={cx('btn_add_cat', 'text-capitalize')} small onClick={handleClickAddCat} gradient_primary>
              <Translate>add_category</Translate>
            </Button>
          </>
        }
      >
        <div className={cx('filter_data')}>
          <h4 className="text-capitalize">
            <b>
              <Translate>filter_data</Translate>
            </b>
          </h4>
          <div className={cx('filter_content', 'd-flex flex-row flex-wrap')}>
            <FormSearch title="name" useTippy={false} useColumn searchValue={setNameFilter} />
            <FormSelect title="status" useStatus={true} handleSetValue={handleSetStatus} />
            <Category
              title="cat_parent"
              classTitle="parent-id"
              name="parent_id"
              language={language}
              useColumn={true}
              handleOnclick={handleSetParentCat}
            />
          </div>
        </div>
        <div className={cx('data_table')}>
          <table>
            <thead>
              <tr>
                <th>
                  <Translate>name</Translate>
                </th>
                <th>
                  <Translate>cat_parent</Translate>
                </th>
                <th>
                  <Translate>industry_code</Translate>
                </th>
                <th>
                  <Translate>status</Translate>
                </th>
                <th>
                  <Translate>tolls</Translate>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataTable?.map((d, index) => (
                <ElementCat handleDelete={AddDeleteSuccess} EditCat={handleShowEditCat} key={index} data={d} />
              ))}
            </tbody>
          </table>
        </div>
        <EditCat
          id="edit_cat_modal"
          closeModal={showEdit}
          handleReloadData={handleReloadData}
          handleCloseEditCat={handleHideEditCat}
        />
        <AddCat closeModal={addCat} handleReload={handleReloadData} handleClose={handleClose} language={language} />
      </WrapperMain>
    </>
  );
}
