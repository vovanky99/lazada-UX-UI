import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import styles from '~/pages/ADMIN/Department/Department.module.scss';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import Button from '~/components/Button';
import { EditData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function ListDepartment({ handleDelete = () => {}, index, P_id, P_name, P_status }) {
  const [showEdit, setShowEdit] = useState(false);
  const [department, setDeparment] = useState({
    status: P_status || '',
    name: P_name || '',
  });

  const handleClickOutside = () => {
    setShowEdit(false);
  };
  const handleToggleEdit = () => {
    setShowEdit(true);
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setDeparment({
      [name]: value,
    });
  };
  console.log(department);
  const handleDeleteCat = (e) => {};

  const handleEditCat = (e) => {
    EditData('admin', 'department', e.target.dataset.id);
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
                <FormSearch
                  title="name"
                  name="name"
                  useTippy={false}
                  Value={department.name}
                  handleOnchange={handleOnchange}
                />
                <FormSelect
                  title="status"
                  name="status"
                  useStatus={true}
                  defaultValue={department.status}
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
        <tr key={index} className={cx(`tbody-element`)}>
          <td>{P_name}</td>
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
