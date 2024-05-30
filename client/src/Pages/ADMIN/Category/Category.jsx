import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import GetCategory from '~/api/Category/GetCategory';
import CreateCategory from '~/api/Category/CreateCategory';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import ListCat from './ListCat';

const cx = classNames.bind(styles);

export default function AllCategory() {
  const nameRef = useRef();
  const [title, setTitle] = useState('');

  const [dataTable, setDataTable] = useState(null);

  // state for add cat
  const [addCategory, setAddCategory] = useState(false);
  const [catParentID, setCatParentID] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');
  const [createError, setCreateError] = useState('');
  const [catData, setCatData] = useState(null);
  const [reloadData, setReloadData] = useState(1);

  // state for filter
  const [nameFilter, setNameFilter] = useState('');
  const [searchParent, setSearchParent] = useState('');
  const [parentData, setParentData] = useState(null);
  const [parentID, setParentID] = useState('');
  const [status, setStatus] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(1);

  const AddDeleteSuccess = (value) => {
    setDeleteSuccess(deleteSuccess + value);
  };
  const handleClickOutSide = (e) => {
    setAddCategory(false);
  };
  const handleClickAddCat = (e) => {
    setAddCategory(true);
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (title === '') {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }
    if (title) {
      const data = new FormData();
      data.append('name', title);
      data.append('parent_id', catParentID);
      setCreateSuccess('');
      CreateCategory(data)
        .then((result) => {
          if (result.success) {
            setCreateSuccess(result.success);
            setReloadData(reloadData + 1);
          } else {
            setCreateSuccess('');
          }
        })
        .catch((e) => console.log(e));
      setCreateError('');
    } else {
      setCreateError('please enter title!');
    }
  };

  /* get cat for add Cat */
  useEffect(() => {
    GetCategory({ value: searchTitle })
      .then((result) => {
        setCatData(result);
      })
      .catch((e) => console.log(e));
  }, [searchTitle, reloadData]);

  /* get cat for filter data */
  useEffect(() => {
    GetCategory({ value: searchParent })
      .then((result) => {
        setParentData(result);
      })
      .catch((e) => console.log(e));
  }, [searchParent]);

  /* get all for Data tbale */
  useEffect(() => {
    GetCategory({ value: nameFilter, status: status, parent_id: parentID })
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => console.log(e));
  }, [parentID, status, nameFilter, deleteSuccess, reloadData]);
  return (
    <>
      <WrapperMain
        title="All Category"
        BtnAddRender={
          <>
            <Tippy
              interactive
              visible={addCategory}
              placement="bottom"
              render={(attrs) => (
                <div className={cx('add_category')} {...attrs} tabIndex="-1">
                  <h5 className="text-center text-capitalize">
                    <b>Category</b>
                  </h5>
                  <form
                    onSubmit={handleCreateCategory}
                    className={cx('form_add_cat', 'd-flex flex-row flex-wrap')}
                    noValidate
                  >
                    <FormSearch
                      title="cat parent"
                      classTitle="cat_parent"
                      useNull={true}
                      data={catData}
                      handleSetID={setCatParentID}
                      searchValue={setSearchTitle}
                    />
                    <FormSearch ref={nameRef} title="title" useTippy={false} searchValue={setTitle} />
                    {createError ? (
                      <div className={cx('message', 'text-danger text-capitalize text-center')}>{createError}</div>
                    ) : (
                      ''
                    )}
                    {createSuccess ? (
                      <div className={cx('message', 'text-success text-capitalize text-center')}>{createSuccess}</div>
                    ) : (
                      ''
                    )}
                    <div className="text-center flex-grow-1">
                      <Button className="text-capitalize" type="submit" gradient_primary>
                        Create
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              offset={[105, 3]}
              onClickOutside={handleClickOutSide}
            >
              <Button className={cx('btn_add_cat')} onClick={handleClickAddCat} gradient_primary>
                Add Category
              </Button>
            </Tippy>
          </>
        }
      >
        <div className={cx('filter_data')}>
          <h4 className="text-capitalize">
            <b>filter Data</b>
          </h4>
          <div className={cx('filter_content', 'd-flex flex-row flex-wrap')}>
            <FormSearch title="name" useTippy={false} searchValue={setNameFilter} />
            <FormSelect title="status" useStatus={true} handleSetValue={setStatus} />
            <FormSearch
              title="parent"
              titleClass="parent-id"
              data={parentData}
              useNull={true}
              handleSetID={setParentID}
              searchValue={setSearchParent}
            />
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
                <ListCat
                  handleDelete={AddDeleteSuccess}
                  index={index}
                  P_id={d.id}
                  P_cat_name={d.cat_name}
                  P_parent_id={d.parent_id}
                  P_status={d.status}
                  P_name={d.name}
                />
              ))}
            </tbody>
          </table>
        </div>
      </WrapperMain>
    </>
  );
}
