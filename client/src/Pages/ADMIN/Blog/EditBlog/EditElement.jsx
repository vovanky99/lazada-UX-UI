import WrapperMain from '~/layout/Component/WrapperMain';
import classNames from 'classnames/bind';
import styles from '~/pages/ADMIN/Blog/Blog.module.scss';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import TodoList from '~/components/TodoList';
import { EditData, TodoListData } from '~/api/General/HandleData';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import TinyMCE from '~/components/TinyMCE';
import UploadTinyMCE, { ImagesUpload } from '~/services/UploadTinyMCE';

const cx = classNames.bind(styles);

export default function EditElement({ data }) {
  const titleRef = useRef();
  const descriptionsRef = useRef();
  const contentRef = useRef();
  const [catData, setCatData] = useState(null);
  const [handleCat, setHandleCat] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [editMessageSuccess, setEditMessageSuccess] = useState('');
  const [editMessageError, setEditMessageError] = useState('');
  const [editBlog, setEditBlog] = useState({
    title: data.title || '',
    descriptions: data.descriptions || '',
    content: data.content || '',
    status: data.status || '',
    img: data.img || '',
    category_id: [],
  });
  const handleSetImages = (value) => {
    setEditBlog({
      ...editBlog,
      img: value,
    });
  };
  const GetCategoryID = (value) => {
    setEditBlog({
      ...editBlog,
      category_id: value,
    });
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === 'category_id') {
    } else {
      setEditBlog({ ...editBlog, [name]: value });
    }
  };

  // handle categories data when parent pass data
  useEffect(() => {
    const setCategoryID = () => {
      if (data.categories && handleCat) {
        data.categories.map((re, index) => editBlog.category_id.push(re.id));
        setHandleCat(false);
      }
    };
    setCategoryID();
  }, [data]);

  const validate = () => {
    if (editBlog.content.length < 300) {
      contentRef.current.editor.container.classList.add('input_danger');
    } else {
      contentRef.current.editor.container.classList.remove('input_danger');
    }
    if (editBlog.descriptions.length < 100) {
      descriptionsRef.current.classList.add('input_danger');
    } else {
      descriptionsRef.current.classList.remove('input_danger');
    }
    if (editBlog.title.length < 20) {
      titleRef.current.classList.add('input_danger');
    } else {
      titleRef.current.classList.remove('input_danger');
    }
  };
  /*handle submit edit blog */
  const handleEditBlog = (e) => {
    e.preventDefault();
    validate();
    if (
      editBlog.content.length > 300 &&
      editBlog.descriptions.length > 100 &&
      editBlog.title.length > 20 &&
      editBlog.img
    ) {
      setEditMessageError('');
      EditData('admin', 'blogs', data.id, editBlog)
        .then((result) => {
          if (result.success) {
            setEditMessageSuccess(result.success);
          } else {
            setEditMessageError('create blog have issue!');
          }
        })
        .catch((e) => console.log(e));
    } else {
      setEditMessageError(`please enter full if haven't image please check it`);
    }
  };

  /*get data for cat */
  useEffect(() => {
    TodoListData({ prefixServer: 'admin', type: 'cat', name: searchValue, id: editBlog.category_id })
      .then((result) => {
        setCatData(result);
      })
      .catch((e) => console.log(e));
  }, [editBlog.category_id, searchValue]);

  const handleEditorChange = (e) => {
    setEditBlog({
      ...editBlog,
      content: e.target.getContent(),
    });
  };

  return (
    <>
      <WrapperMain title="add Blog">
        <form className={cx('add_blog', 'd-flex flex-wrap flex-row')} onSubmit={handleEditBlog}>
          <div className={cx('add_blog_left', 'col-9')}>
            <TinyMCE
              ref={contentRef}
              initialValue={editBlog.content}
              init={{
                height: 550,
                plugins: [
                  'advlist',
                  'autolink',
                  'link',
                  'image',
                  'lists',
                  'charmap',
                  'preview',
                  'anchor',
                  'pagebreak',
                  'searchreplace',
                  'wordcount',
                  'visualblocks',
                  'visualchars',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'emoticons',
                  'help',
                ],
                toolbar_sticky: true,
                toolbar:
                  'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                  'forecolor backcolor emoticons | help',

                menubar: 'favs file edit view insert format tools table help',
                automatic_uploads: true,
                images_reuse_filename: true,
                file_picker_callback: UploadTinyMCE,
                // file_picker_types: 'file image media',
              }}
              onChange={handleEditorChange}
            />
          </div>
          <div className={cx('add_blog_right', 'd-flex flex-column col')}>
            <FormImage
              className={cx('img')}
              title="image"
              data={editBlog.img}
              name="img"
              handleSetValue={handleSetImages}
              useButton={false}
            />
            <FormSearch
              ref={titleRef}
              Value={editBlog.title}
              containerClass={cx('form-group')}
              title="title"
              name="title"
              useTippy={false}
              handleOnchange={handleOnchange}
            />
            <FormSelect
              containerClass={cx('form-group')}
              title="status"
              useStatus={true}
              defaultValue={editBlog.status}
            />
            <TodoList
              containerClass={cx('form-group')}
              title="category"
              name="category_id"
              data={catData}
              valueTodo={editBlog.category_id}
              valueTodoData={data.categories}
              handleGetTodoList={GetCategoryID}
              handleSearchValue={setSearchValue}
              handleOnchange={handleOnchange}
            />
            <FormText
              containerClass={cx('form-group')}
              ref={descriptionsRef}
              data={editBlog.descriptions}
              title="descriptions"
              rows={7}
              name="descriptions"
              handleOnchange={handleOnchange}
            />
          </div>
          <div className={cx('add_blog-message', 'text-center col-12')}>
            <MessageDanger message={editMessageError} classNames={cx('message')} />
            <MessageSuccess message={editMessageSuccess} classNames={cx('message')} />
          </div>

          <div className={cx('add_blog-btn', 'text-center col-12')}>
            <Button type="submit" gradient_primary>
              Save
            </Button>
          </div>
        </form>
      </WrapperMain>
    </>
  );
}
