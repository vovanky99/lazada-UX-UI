import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import styles from '~/pages/ADMIN/Department/Department.module.scss';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export default function ListDepartment({
  handleDelete = () => {},
  index,
  P_id,
  P_name,
  P_status,
  P_parent_id,
  P_cat_name,
}) {
  const [status, setStatus] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  const handleClickOutside = () => {
    setShowEdit(false);
  };
  const handleToggleEdit = () => {
    setShowEdit(true);
  };
  const handleDeleteCat = (e) => {};
  const handleEditCat = (e) => {};
  return (
    <>
      <Tippy
        interactive
        placement="bottom"
        offset={[0, 0]}
        visible={showEdit}
        render={(attrs) => (
          <div className={cx('list_department_tippy', 'edit-element d-flex flex-column')} tabIndex="-1" {...attrs}>
            <h5 className="text-center text-capitalize">
              <b>List Department</b>
            </h5>
            <form
              className={cx('list_department_tippy_content', 'd-flex flex-column')}
              noValidate
              onSubmit={handleEditCat}
            >
              <div className="d-flex flex-row flex-wrap">
                <FormSearch title="name" name="name" />
                <FormSelect
                  title="status"
                  name="status"
                  useStatus={true}
                  defaultValue={status}
                  handleSetValue={setStatus}
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
