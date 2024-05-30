import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import ListBlog from './ListBlog';
import config from '~/config';
import TodoList from '~/components/TodoList';
import { TodoListData } from '~/api/General/HandleData';
import GetBlog from '~/api/Blog/GetBlog';

const cx = classNames.bind(styles);

export default function Blog() {
  const nameRef = useRef();
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
      ['category_id']: value,
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
    GetBlog(filterBlogs)
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
            <FormSearch title="title" name="title" useTippy={false} handleOnchange={handleOnchange} />
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
                <th>Name</th>
                <th>parent</th>
                <th>status</th>
                <th>tolls</th>
              </tr>
            </thead>
            <tbody>
              {dataTable?.map((d, index) => (
                <ListBlog
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
