import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { DeleteData, EditData } from '~/api/General/HandleData';
import Button from '~/components/Button';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import styles from '~/pages/ADMIN/Role/Role.module.scss';

const cx = classNames.bind(styles);

export default function ListRole({ handleDelete = () => {}, data }) {
  const nameRef = useRef();
  const descriptionsRef = useRef();
  const [edit, setEdit] = useState(false);
  const [editSuccess, setEditSuccess] = useState('');
  const [editError, setEditError] = useState('');
  const [role, setRole] = useState({
    name: data.name || '',
    descriptions: data.descriptions || '',
  });

  const handleClickEditRole = (e) => {
    setEdit(true);
  };
  const handleEditClickOutSide = (e) => {
    setEdit(false);
  };
  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setRole({
      ...role,
      [name]: value,
    });
  };
  const handleDeleteRole = (e) => {
    DeleteData('admin', 'role', e.target.dataset.id)
      .then((result) => {})
      .catch((e) => console.log(e));
  };

  const validated = () => {
    if (role.name === '') {
      nameRef.current.classList.add('input_danger');
    } else {
      nameRef.current.classList.remove('input_danger');
    }
    if (role.descriptions.length <= 30) {
      descriptionsRef.current.classList.add('input_danger');
    } else {
      descriptionsRef.current.classList.remove('input_danger');
    }
  };

  const handUpdateRole = (e) => {
    e.preventDefault();
    validated();
    if (role.name && role.descriptions.length > 30) {
      setEditError('');
      setEditSuccess('');
      EditData('admin', 'role', data.id, role)
        .then((result) => {
          if (result.success) {
            setEditSuccess(result.success);
          } else {
            setEditError('update have issue!');
          }
        })
        .catch((e) => console.log(e));
    } else {
      setEditError('please check name or descriptions more 30 character !');
    }
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
        visible={edit}
        placement="bottom"
        offset={[0, 0]}
        render={(attrs) => (
          <div className={cx('wrapper_Edit_role', 'edit-element d-flex flex-column')} tabIndex={-1} {...attrs}>
            <h5 className="text-center">
              <b>Role</b>
            </h5>
            <form className={cx('d-flex flex-column')} onSubmit={handUpdateRole} noValidate>
              <FormSearch
                ref={nameRef}
                title="name"
                name="name"
                Value={data.name}
                handleOnchange={handleOnchange}
                useTippy={false}
              />

              <FormText
                ref={descriptionsRef}
                title="descriptions"
                name="descriptions"
                rows="3"
                data={data.descriptions}
                handleOnchange={handleOnchange}
                useTippy={false}
              />
              <div className="text-center">
                <MessageDanger message={editError} classNames={cx('message')} />
                <MessageSuccess message={editSuccess} classNames={cx('message')} />
                <Button gradient_primary type="submit">
                  Update
                </Button>
              </div>
            </form>
          </div>
        )}
        onClickOutside={handleEditClickOutSide}
      >
        <tr key={data.id} className={cx('tbody-element')}>
          <td>{data.name}</td>
          <td>{data.descriptions}</td>
          <td>
            <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
              <Button gradient_primary type="button" onClick={handleClickEditRole}>
                Edit
              </Button>
              <Button data-id={data.id} gradient_danger type="button" onClick={handleDeleteRole}>
                Delete
              </Button>
            </div>
          </td>
        </tr>
      </Tippy>
    </>
  );
}
