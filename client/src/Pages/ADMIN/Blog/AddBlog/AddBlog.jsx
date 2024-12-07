import WrapperMain from '~/layout/Component/WrapperMain';
import classNames from 'classnames/bind';
import styles from '~/pages/ADMIN/Blog/Blog.module.scss';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import TodoList from '~/components/TodoList';
import { CreateData, TodoListData } from '~/api/General/HandleData';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import TinyMCE from '~/components/TinyMCE';
import UploadTinyMCE from '~/services/UploadTinyMCE';

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
    status: 1,
    img: '',
    category_id: '',
  });
  const handleSetImages = (value) => {
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

  const handleEditorChange = (e) => {
    setAddBlog({
      ...addBlog,
      content: e.target.getContent(),
    });
  };

  const validated = () => {
    if (addBlog.content.length < 300) {
      contentRef.current.editor.container.classList.add('input_danger');
    } else {
      contentRef.current.editor.container.classList.remove('input_danger');
    }
    if (addBlog.descriptions.length < 100) {
      descriptionsRef.current.classList.add('input_danger');
    } else {
      descriptionsRef.current.classList.remove('input_danger');
    }
    if (addBlog.title.length < 20) {
      titleRef.current.classList.add('input_danger');
    } else {
      titleRef.current.classList.remove('input_danger');
    }
  };

  /*handle submit create blog */
  const handleCreateBlog = (e) => {
    e.preventDefault();
    validated();
    if (addBlog.content.length > 300 && addBlog.descriptions.length > 100 && addBlog.title.length > 20 && addBlog.img) {
      setCreateMessageError('');
      CreateData('admin', 'blogs', addBlog)
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
          <div className={cx('add_blog_left', 'col-9')}>
            <TinyMCE
              ref={contentRef}
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
                // menu: {
                //   favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' },
                // },
                menubar: 'favs file edit view insert format tools table help',
                // tinycomments_mode: 'embedded',
                // tinycomments_author: 'Life Circle',
                // mergetags_list: [
                //   { value: 'First.Name', title: 'First Name' },
                //   { value: 'Email', title: 'Email' },
                // ],
                // ai_request: (request, respondWith) =>
                //   respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
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
              name="img"
              handleSetValue={handleSetImages}
              useButton={false}
            />
            <FormSearch
              ref={titleRef}
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
              defaultValue={addBlog.status}
            />
            <TodoList
              containerClass={cx('form-group')}
              title="category"
              name="category_id"
              data={catData}
              handleGetTodoList={GetCategoryID}
              handleSearchValue={setSearchValue}
              handleOnchange={handleOnchange}
            />
            <FormText
              containerClass={cx('form-group')}
              ref={descriptionsRef}
              title="descriptions"
              rows={7}
              name="descriptions"
              handleOnchange={handleOnchange}
            />
          </div>
          <div className={cx('add_blog-message', 'text-center col-12')}>
            <MessageDanger message={createMessageError} classNames={cx('message')} />
            <MessageSuccess message={createMessageSuccess} classNames={cx('message')} />
          </div>
          <div className={cx('add_blog-btn', 'text-center col-12')}>
            <Button type="submit" gradient_primary>
              Create
            </Button>
          </div>
        </form>
      </WrapperMain>
    </>
  );
}
