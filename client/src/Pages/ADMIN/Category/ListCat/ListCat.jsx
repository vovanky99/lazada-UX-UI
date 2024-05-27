import classNames from 'classnames/bind';
import styles from '../Category.module.scss';
import Button from '~/components/Button';
import Tippy from '@tippyjs/react/headless';
import { SearchSelect } from '~/layout/Component/SearchSelect';
import { useEffect, useState } from 'react';
import GetCategory from '~/api/Category/GetCategory';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { EditData } from '~/api/General/HandleData';
import DeleteCategory from '~/api/Category/DeleteCategory';

const cx = classNames.bind(styles);

export default function ListCat({ handleDelete = () => {}, index, P_id, P_name, P_status, P_parent_id, P_cat_name }) {
  const [parentData, setParentData] = useState(null);
  const [name, setName] = useState(P_name || '');
  const [parentID, setParentID] = useState(P_parent_id || '');
  const [status, setStatus] = useState(P_status || '');
  const [searchParent, setSearchParent] = useState(P_cat_name || '');
  const [showEdit, setShowEdit] = useState(false);
  console.log(searchParent);
  // show edit cat
  const handleToggleEdit = (e) => {
    setShowEdit(true);
  };

  const handleEditCat = (e) => {
    e.preventDefault();
    EditData('admin', 'category', P_id, { name: name, parent_id: parentID, status: status })
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

  /* get cat for edit Cat */
  useEffect(() => {
    GetCategory(searchParent).then((result) => {
      setParentData(result);
    });
  }, [searchParent]);

  //delete cat
  const handleDeleteCat = (e) => {
    DeleteCategory(e.target.dataset.id)
      .then((result) => {
        handleDelete(1);
      })
      .catch((e) => console.log(e));
  };

  // hide edit cat
  const handleClickOutside = () => {
    setShowEdit(false);
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
                <SearchSelect
                  title="parent"
                  valueID={parentID}
                  searchValue={searchParent}
                  data={parentData}
                  searchSelectValue={setSearchParent}
                  handleSetID={setParentID}
                />
                <FormSelect title="status" isStatus={true} defaultValue={status} handleSetValue={setStatus} />
                <SearchSelect title="name" searchValue={name} useTippy={false} searchSelectValue={setName} />
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
        <tr key={index} className={cx(`tbody-element`)}>
          <td>{P_name}</td>
          <td>{P_cat_name}</td>
          <td>{P_status == 1 ? 'Show' : 'Hide'}</td>
          <td>
            <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
              <Button gradient_primary type="button" onClick={handleToggleEdit}>
                Edit
              </Button>
              <Button data-id={P_id} gradient_danger type="button" onClick={handleDeleteCat}>
                Delete
              </Button>
            </div>
          </td>
        </tr>
      </Tippy>
    </>
  );
}
