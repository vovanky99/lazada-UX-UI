import classNames from 'classnames/bind';
import styles from './Attributes.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import Translate from '~/layout/Component/Translate';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import AddAttributes from './AddAttributes';
import { FormSearch } from '~/layout/Component/FormSearch';
import Category from '~/layout/Component/Category';
import Element from './Element';
import { GetData } from '~/api/General/HandleData';
import { useSelector } from 'react-redux';
import PaginationMain from '~/layout/Component/Pagination/PaginationMain';
import EditAttributes from './EditAttributes';

const cx = classNames.bind(styles);

export default function Attributes() {
  const { language } = useSelector((state) => state.Auth);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [reloadData, setReloadData] = useState(1);
  const [data, setData] = useState(null);
  const [messageDelete, setMessageDelete] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  let pageSize = 15;
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  const dataTable = data ? data?.slice(firstPageIndex, lastPageIndex) : null;

  const [filter, setFilter] = useImmer({
    name: '',
    category_id: '',
  });

  const handleTonggleAdd = (e) => {
    if (toggleAdd) {
      setToggleAdd(false);
    } else {
      setToggleAdd(true);
    }
  };

  const handleTonggleEdit = () => {
    if (toggleEdit) {
      setToggleEdit(false);
    } else {
      setToggleEdit(true);
    }
  };

  const handleReloadData = (value) => {
    setReloadData(reloadData + value);
  };

  const handlSetName = (value) => {
    setFilter((draft) => {
      draft.name = value;
    });
  };

  const handleOnclick = (e) => {
    setFilter((draft) => {
      draft.category_id = parseInt(e.target.dataset.id);
    });
  };

  const handleResetValue = (e) => {
    setFilter((draft) => {
      draft.category_id = '';
    });
  };

  const handleDelete = (value) => {
    setMessageDelete(value);
  };

  useEffect(() => {
    GetData('admin', 'attribute', filter, language)
      .then((reslut) => {
        if (reslut?.attrs) {
          setData(reslut?.attrs);
        }
      })
      .catch((e) => console.log(e));
  }, [filter.category_id, filter.name]);
  return (
    <WrapperMain
      title="attributes"
      BtnAddRender={
        <Button onClick={handleTonggleAdd} className={cx('text-capitalize')} gradient_primary small>
          <Translate>add_attributes</Translate>
        </Button>
      }
    >
      <div className={cx('filter', 'd-flex flex-row')}>
        <div className={cx('name')}>
          <FormSearch title="name" name="name" useColumn useTippy={false} searchValue={handlSetName} />
        </div>
        <div className={cx('category')}>
          <Category
            useColumn
            title="category"
            name="category_id"
            handleOnclick={handleOnclick}
            handleResetValue={handleResetValue}
          />
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
                <Translate>category</Translate>
              </th>
              <th>
                <Translate>tools</Translate>
              </th>
            </tr>
          </thead>
          <tbody>
            {dataTable &&
              dataTable.map((d, index) => (
                <Element
                  data={d}
                  key={index}
                  messageDelete={handleDelete}
                  handleReloadData={handleReloadData}
                  handleToggleEdit={handleTonggleEdit}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className={cx('pagiantion')}>
        {dataTable && (
          <PaginationMain
            totalCount={data?.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        )}
      </div>
      <EditAttributes
        closeModal={toggleEdit}
        language={language}
        handleReloadData={handleReloadData}
        handleClose={handleTonggleEdit}
      />
      <AddAttributes closeModal={toggleAdd} handleReloadData={handleReloadData} handleClose={handleTonggleAdd} />
    </WrapperMain>
  );
}
