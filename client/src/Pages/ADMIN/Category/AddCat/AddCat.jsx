import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useRef, useState } from 'react';

import { CreateData } from '~/api/General/HandleData';
import Category from '~/layout/Component/Category';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import styles from '~/pages/ADMIN/Category/Category.module.scss';
import { FormSearch } from '~/layout/Component/FormSearch';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export default function AddCat({ handleReloadData }) {
  const nameRef = useRef();
  const [addCat, setAddCat] = useState({
    name: '',
    parent_id: '',
  });
  const [addCategory, setAddCategory] = useState(false);
  const [createSuccess, setCreateSuccess] = useState('');
  const [createError, setCreateError] = useState('');

  const handleClickOutSide = (e) => {
    setAddCategory(false);
  };
  const handleClickAddCat = (e) => {
    setAddCategory(true);
  };

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setAddCat({
      ...addCat,
      [name]: value,
    });
  };

  const handleSetParentID = (value) => {
    setAddCat({
      ...addCat,
      parent_id: value,
    });
  };

  const validate = () => {
    if (addCat.name === '') {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }
  };
  const handleCreateCategory = (e) => {
    e.preventDefault();
    validate();
    if (addCat.name) {
      setCreateSuccess('');
      CreateData('admin', 'category', addCat)
        .then((result) => {
          if (result.success) {
            setCreateSuccess(result.success);
            handleReloadData(1);
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

  return (
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
              <Category
                title="cat parent"
                classTitle="cat_parent"
                name="parent_id"
                handleOnclick={handleSetParentID}
                useNull={true}
              />
              <FormSearch ref={nameRef} title="name" name="name" useTippy={false} handleOnchange={handleOnchange} />
              <MessageSuccess message={createSuccess} />
              <MessageDanger message={createError} />
              <div className="text-center flex-grow-1">
                <Button className="text-capitalize" type="submit" small gradient_primary>
                  Create
                </Button>
              </div>
            </form>
          </div>
        )}
        offset={[105, 3]}
        onClickOutside={handleClickOutSide}
      >
        <Button className={cx('btn_add_cat')} small onClick={handleClickAddCat} gradient_primary>
          Add Category
        </Button>
      </Tippy>
    </>
  );
}
