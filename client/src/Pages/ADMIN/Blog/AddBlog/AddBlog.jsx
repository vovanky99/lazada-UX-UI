import WrapperMain from '~/layout/Component/WrapperMain';
import classNames from 'classnames/bind';
import styles from '~/pages/ADMIN/Blog/Blog.module.scss';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import config from '~/config';
import TodoList from '~/components/TodoList';
import { TodoListData } from '~/api/General/HandleData';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import CreateBlog from '~/api/Blog/CreateBlog';

const cx = classNames.bind(styles);

export default function AddBlog() {
  const titleRef = useRef();
  const descriptionsRef = useRef();
  const contentRef = useRef();
  const [catData, setCatData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [createMessageSuccess, setCreateMessageSuccess] = useState('');
  const [createMessageError, setCreateMessageError] = useState('');
  const [addBlog, setAddBlog] = useState({
    title: '',
    descriptions: '',
    content: '',
    status: '',
    img: '',
    category_id: '',
  });
  const handleSetImage = (value) => {
    setAddBlog({
      ...addBlog,
      img: value,
    });
  };
  const GetCategoryID = (value) => {
    setAddBlog({
      ...addBlog,
      category_id: value,
    });
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === 'category_id') {
    } else {
      setAddBlog({ ...addBlog, [name]: value });
    }
  };

  /*handle submit create blog */
  const handleCreateBlog = (e) => {
    e.preventDefault();
    if (addBlog.content.length < 300) {
      contentRef.current.classList.add('border_danger');
    } else {
      contentRef.current.classList.remove('border_danger');
    }
    if (addBlog.descriptions.length < 100) {
      descriptionsRef.current.classList.add('border_danger');
    } else {
      descriptionsRef.current.classList.remove('border_danger');
    }
    if (addBlog.title.length < 50) {
      titleRef.current.classList.add('border_danger');
    } else {
      titleRef.current.classList.remove('border_danger');
    }
    console.log(
      addBlog.content.length > 300 && addBlog.descriptions.length > 100 && addBlog.title.length > 50 && addBlog.img,
    );
    if (addBlog.content.length > 300 && addBlog.descriptions.length > 100 && addBlog.title.length > 50 && addBlog.img) {
      setCreateMessageError('');
      CreateBlog(addBlog)
        .then((result) => {
          if (result.success) {
            setCreateMessageSuccess(result.success);
          } else {
            setCreateMessageError('create blog have issue!');
          }
        })
        .catch((e) => console.log(e));
    } else {
      setCreateMessageError(`please enter full if haven't image please check it`);
    }
  };

  /*get data for cat */
  useEffect(() => {
    TodoListData({ prefixServer: 'admin', type: 'cat', name: searchValue, id: addBlog.category_id })
      .then((result) => {
        setCatData(result);
      })
      .catch((e) => console.log(e));
  }, [addBlog.category_id, searchValue]);

  return (
    <>
      <WrapperMain title="add Blog">
        <form className={cx('add_blog', 'd-flex flex-wrap flex-row')} onSubmit={handleCreateBlog}>
          <FormImage title="image" name="img" handleSetValue={handleSetImage} />
          <FormSearch ref={titleRef} title="title" name="title" useTippy={false} handleOnchange={handleOnchange} />
          <FormSelect title="status" useStatus={true} defaultValue="1" />
          <TodoList
            title="category"
            name="category_id"
            data={catData}
            handleGetTodoList={GetCategoryID}
            handleSearchValue={setSearchValue}
            handleOnchange={handleOnchange}
          />
          <FormText
            ref={descriptionsRef}
            title="descriptions"
            rows={3}
            name="descriptions"
            handleOnchange={handleOnchange}
          />
          <FormText ref={contentRef} title="content" name="content" rows={3} handleOnchange={handleOnchange} />
          <MessageDanger message={createMessageError} />
          <MessageSuccess message={createMessageSuccess} />
          <div className={cx('add_blog-btn', 'text-center')}>
            <Button type="submit" gradient_primary>
              Create
            </Button>
          </div>
        </form>
      </WrapperMain>
    </>
  );
}
