import classNames from 'classnames/bind';
import styles from './AttributesDetails.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import Translate from '~/layout/Component/Translate';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddAttrDetails from './AddAttrDetails';
import { FormSearch } from '~/layout/Component/FormSearch';
import { useImmer } from 'use-immer';
import Attributes from '~/layout/Component/Attributes';
import Category from '~/layout/Component/Category';
import Element from './Element';
import { GetData } from '~/api/General/HandleData';
import PaginationMain from '~/layout/Component/Pagination/PaginationMain';
import Dialog from '~/layout/Component/Dialog';
import EditAttrDetail from './EditAttrDetail';

const cx = classNames.bind(styles);

export default function AttributesDetails() {
  const { language } = useSelector((state) => state.Auth);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [reload, setReload] = useState(1);
  const [messageDeleteAlert, setMessageDeleteAlert] = useState();
  const [resolvePromise, setResolvePromise] = useState(null);

  const messageNotification = {
    DeleteAlert: Translate({ children: 'dialog.delete_alert' }),
  };
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  let pageSize = 30;
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  const dataTable = data?.slice(firstPageIndex, lastPageIndex);

  const [catId, setCatId] = useState('');
  const [filterData, setFilterData] = useImmer({
    name: '',
    attr_id: '',
  });

  const handleToggleAdd = () => {
    if (toggleAdd) {
      setToggleAdd(false);
    } else {
      setToggleAdd(true);
    }
  };
  const handleToggleEdit = () => {
    if (toggleEdit) {
      setToggleEdit(false);
    } else {
      setToggleEdit(true);
    }
  };

  const handleReloadData = (value) => {
    setReload(reload + value);
  };

  const handleSetName = (value) => {
    setFilterData((draft) => {
      draft.name = value;
    });
  };

  const handleSetCat = (e) => {
    setCatId(parseInt(e.target.dataset.id));
  };

  const handleClearCat = (e) => {
    setCatId('');
  };

  const handleSetAttr = (e) => {
    const { id } = e.target.dataset;
    setFilterData((draft) => {
      draft.attr_id = parseInt(id);
    });
  };

  const handleClearAttr = () => {
    setFilterData((draft) => {
      draft.attr_id = '';
    });
  };

  const handleDeletealeart = async () => {
    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
      setDialog(true);
      setMessageDeleteAlert(messageNotification.DeleteAlert);
    });
  };

  const handleConfirmDelete = (e) => {
    const { type } = e.target.dataset;
    if (type === 'no') {
      if (resolvePromise) resolvePromise(false);
    } else {
      if (resolvePromise) resolvePromise(true);
    }
    setDialog(false);
    setMessageDeleteAlert('');
  };

  useEffect(() => {
    GetData('admin', 'attr-details', filterData, language)
      .then((result) => {
        if (result.attrs) {
          setData(result.attrs);
        }
      })
      .catch((e) => console.log(e));
  }, [filterData.attr_id, filterData.name, reload]);
  return (
    <>
      <WrapperMain
        title="attributes"
        BtnAddRender={
          <Button className={cx('text-capitalize')} type="button" small gradient_primary onClick={handleToggleAdd}>
            <Translate>add_attributes_details</Translate>
          </Button>
        }
      >
        <div className={cx('filter_data', 'd-flex flex-column')}>
          <h4 className={cx('title', 'text-capitalize')}>
            <Translate>filter_data</Translate>
          </h4>
          <div className={cx('filter_content', 'd-flex flex-row')}>
            <div className={cx('name')}>
              <FormSearch title="name" name="name" useColumn useTippy={false} searchValue={handleSetName} />
            </div>
            <div className={cx('cat_id')}>
              <Category
                title="category"
                name="cat_id"
                useColumn
                handleOnclick={handleSetCat}
                handleResetValue={handleClearCat}
              />
            </div>
            <div className={cx('attribute_id')}>
              <Attributes
                title="attributes"
                name="attr_id"
                cat_id={catId}
                useColumn
                handleOnclick={handleSetAttr}
                handleResetValue={handleClearAttr}
              />
            </div>
          </div>
        </div>
        <div className={cx('data_content')}>
          <table>
            <thead>
              <tr>
                <th>
                  <Translate>name</Translate>
                </th>
                <th>
                  <Translate>attributes</Translate>
                </th>
                <th>
                  <Translate>tools</Translate>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataTable &&
                dataTable.map((dt, index) => (
                  <Element
                    data={dt}
                    key={index}
                    handleToggleEdit={handleToggleEdit}
                    handleReloadData={handleReloadData}
                    deleteAlert={handleDeletealeart}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <div className={cx('pagiantion', 'd-flex flex-column justify-content-center align-items-center')}>
          <PaginationMain
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={data?.length || 0}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
        <Dialog
          open={dialog}
          message={messageDeleteAlert}
          onCancel={handleConfirmDelete}
          onConfirm={handleConfirmDelete}
        />
        <EditAttrDetail
          closeModal={toggleEdit}
          handleToggleEdit={handleToggleEdit}
          language={language}
          handleReloadData={handleReloadData}
        />
        <AddAttrDetails
          handleReloadData={handleReloadData}
          handleToggleAdd={handleToggleAdd}
          closeModal={toggleAdd}
          language={language}
        />
      </WrapperMain>
    </>
  );
}
