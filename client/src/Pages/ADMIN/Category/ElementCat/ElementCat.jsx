import classNames from 'classnames/bind';
import styles from '../Category.module.scss';
import Button from '~/components/Button';
import Tippy from '@tippyjs/react/headless';
import { FormSearch } from '~/layout/Component/FormSearch';
import { useEffect, useState } from 'react';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { DeleteData, EditData, GetData } from '~/api/General/HandleData';
import Category from '~/layout/Component/Category';
import TollsEdit from '~/layout/Component/TollsEdit';

const cx = classNames.bind(styles);

export default function ListCat({ handleDelete = () => {}, data }) {
  const [editCat, setEditCat] = useState({
    name: data.name || '',
    parent_id: data.parent_id || '',
    status: data.status || '',
  });
  const [showEdit, setShowEdit] = useState(false);

  const handleToggleEdit = (e) => {
    setShowEdit(true);
  };

  const handleClickOutside = () => {
    setShowEdit(false);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setEditCat({
      ...editCat,
      [name]: value,
    });
  };

  const HandleSetParent = (e) => {
    const { name, id } = e.target.dataset;
    setEditCat({
      ...editCat,
      [name]: id,
    });
  };

  const handleSetStatus = (value) => {
    setEditCat({
      ...editCat,
      status: value,
    });
  };

  const handleEditCat = (e) => {
    e.preventDefault();
    EditData('admin', 'category', data.id, editCat)
      .then((result) => {})
      .catch((e) => console.log(e));
  };

  /* handle render width tippy */
  useEffect(() => {
    const t = document.querySelector('.tbody-element');
    const children = document.querySelectorAll('.edit-element');
    if (children) {
      children.forEach((e) => {
        const handleResize = () => {
          e.style.width = `${t.offsetWidth}px`;
        };
        handleResize();
        if (t && children) {
          window.addEventListener('resize', handleResize);
        }
        return () => {
          if (t && children) {
            window.removeEventListener('resize', handleResize);
          }
        };
      });
    }
  });

  //delete cat
  const handleDeleteCat = (e) => {
    DeleteData('admin', 'category', e.target.dataset.id)
      .then((result) => {
        handleDelete(1);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Tippy
        interactive
        placement="bottom"
        offset={[0, 0]}
        visible={showEdit}
        render={(attrs) => (
          <div className={cx('list_cat_tippy', 'edit-element d-flex flex-column')} tabIndex="-1" {...attrs}>
            <h5 className="text-center text-capitalize">
              <b>Edit Category</b>
            </h5>
            <form className={cx('list_cat_tippy_content', 'd-flex flex-column')} noValidate onSubmit={handleEditCat}>
              <div className="d-flex flex-row flex-wrap">
                <Category
                  title="parent"
                  name="parent_id"
                  ValueID={editCat.parent_id}
                  SearchValue={data.cat_name}
                  handleOnclick={HandleSetParent}
                />
                <FormSelect
                  title="status"
                  useStatus={true}
                  defaultValue={data.status}
                  handleSetValue={handleSetStatus}
                />
                <FormSearch
                  title="name"
                  name="name"
                  Value={data.name}
                  useTippy={false}
                  handleOnchange={handleOnchange}
                />
              </div>
              <div className="d-flex flex-row justify-content-center">
                <Button gradient_primary type="submit">
                  Edit
                </Button>
              </div>
            </form>
          </div>
        )}
        onClickOutside={handleClickOutside}
      >
        <tr className={cx(`tbody-element`)}>
          <td>{data.name}</td>
          <td>{data.cat_name}</td>
          <td>{data.status === 1 ? 'Show' : 'Hide'}</td>
          <td>
            <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
              <Button gradient_primary type="button" onClick={handleToggleEdit}>
                Edit
              </Button>
              <Button data-id={data.id} gradient_danger type="button" onClick={handleDeleteCat}>
                Delete
              </Button>
            </div>
          </td>
        </tr>
      </Tippy>
    </>
  );
}
