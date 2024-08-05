import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from '~/pages/ADMIN/Blog/Blog.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import config from '~/config';
import TodoList from '~/components/TodoList';
import { GetData, TodoListData } from '~/api/General/HandleData';
import Images from '~/components/Images';
import TollsEdit from '~/layout/Component/TollsEdit';

const cx = classNames.bind(styles);

export default function Blog() {
  const [dataTable, setDataTable] = useState(null);
  const [catData, setCatData] = useState(null);
  const [catName, setCatName] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(1);
  const [filterBlogs, setFilterBlogs] = useState({
    status: '',
    title: '',
    category_id: [],
  });

  const AddDeleteSuccess = (value) => {
    setDeleteSuccess(deleteSuccess + value);
  };
  const handleGetTodoList = (value) => {
    setFilterBlogs({
      ...filterBlogs,
      category_id: value,
    });
  };

  const handleSearchValue = (value) => {
    setFilterBlogs({
      ...filterBlogs,
      title: value,
    });
  };

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    if (name === 'category_id') {
      setFilterBlogs({
        ...filterBlogs,
        [name]: e.target.dateset.id,
      });
    } else {
      setFilterBlogs({
        ...filterBlogs,
        [name]: value,
      });
    }
  };

  /* get all for Data tbale */
  useEffect(() => {
    GetData('admin', 'blogs', filterBlogs)
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => console.log(e));
  }, [filterBlogs.title, filterBlogs.status, filterBlogs.category_id, deleteSuccess]);
  useEffect(() => {
    TodoListData({ prefixServer: 'admin', type: 'cat', name: catName, id: filterBlogs.category_id })
      .then((result) => setCatData(result))
      .catch((e) => console.log(e));
  }, [filterBlogs.category_id, catName]);
  return (
    <>
      <WrapperMain
        title="All Blogs"
        BtnAddRender={
          <>
            <Button className={cx('btn_add_blogs')} to={config.adminRoutes.AddBlogs} gradient_primary>
              Add Blogs
            </Button>
          </>
        }
      >
        <div className={cx('filter_data')}>
          <h4 className="text-capitalize">
            <b>filter Data</b>
          </h4>
          <div className={cx('filter_content', 'd-flex flex-row flex-wrap')}>
            <FormSearch title="title" name="title" useTippy={false} searchValue={handleSearchValue} />
            <FormSelect title="status" name="status" useStatus={true} handleOnchange={handleOnchange} />
            <TodoList
              title="category"
              classTitle="category_id"
              name="category_id"
              data={catData}
              offsetY={5}
              handleGetTodoList={handleGetTodoList}
              offsetX={0}
              handleSearchValue={setCatName}
            />
          </div>
        </div>
        <div className={cx('data_table')}>
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>image</th>
                <th>status</th>
                <th>category</th>
                <th>descriptions</th>
                <th>tools</th>
              </tr>
            </thead>
            <tbody>
              {dataTable?.map((d, index) => (
                <tr className={cx(`tbody-element`)} key={index}>
                  <td>{d.title}</td>
                  <td>
                    <div className={cx('avatar')}>
                      <Images src={d.img} alt={d.img} />
                    </div>
                  </td>
                  <td>{d.status == 1 ? 'Show' : 'Hide'}</td>
                  <td>
                    {d.categories.map((c) => (
                      <p key={c.id}>{c.name}</p>
                    ))}
                  </td>
                  <td>{d.descriptions}</td>
                  {/* <td dangerouslySetInnerHTML={{ __html: P_content }}></td> */}
                  <td>
                    <TollsEdit data={d} type="blogs" namePath="blogs" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WrapperMain>
    </>
  );
}
