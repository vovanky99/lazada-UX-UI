import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { CreateData } from '~/api/General/HandleData';
import Button from '~/components/Button';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';

import styles from '~/pages/ADMIN/Role/Role.module.scss';

const cx = classNames.bind(styles);

export default function AddRole({ data }) {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [addRole, setAddRole] = useState(false);
  const [createSuccess, setCreateSuccess] = useState('');
  const [createError, setCreateError] = useState('');
  const [role, setRole] = useState({
    name: '',
    descriptions: '',
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setRole({
      ...role,
      [name]: value,
    });
  };
  const handleClickAddRole = (e) => {
    setAddRole(true);
  };
  const handleClickOutsideAddRole = (e) => {
    setAddRole(false);
  };
  const validated = () => {
    if (role.name === '') {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }
    if (role.descriptions.length <= 30) {
      descriptionRef.current.classList.add('border_danger');
    } else {
      descriptionRef.current.classList.remove('border_danger');
    }
  };
  const handleCreateRole = (e) => {
    e.preventDefault();
    validated();
    if (role.name && role.descriptions.length > 30) {
      setCreateError('');
      CreateData('admin', 'role', role).then((result) => {
        if (result.success) {
          setCreateSuccess(result.success);
        } else {
          setCreateError(result.error);
        }
      });
    } else {
      setCreateError('plese enter fully!');
    }
  };
  return (
    <>
      <Tippy
        interactive
        visible={addRole}
        offset={[0, 0]}
        placement="bottom"
        render={(attrs) => (
          <div className={cx('add_role')} tabIndex={-1} {...attrs}>
            <h4>
              <b>Role</b>
            </h4>
            <form className={cx('d-flex flex-column')} onSubmit={handleCreateRole} noValidate>
              <div className={cx('add_role_content', 'd-flex flex-column')}>
                <FormSearch ref={nameRef} title="name" name="name" useTippy={false} handleOnchange={handleOnchange} />
                <FormText
                  ref={descriptionRef}
                  title="descriptions"
                  name="descriptions"
                  rows={3}
                  handleOnchange={handleOnchange}
                />
              </div>
              <div className={cx('btn-add', 'text-center')}>
                <MessageSuccess message={createSuccess} classNames={cx('message')} />
                <MessageSuccess message={createError} classNames={cx('message')} />
                <Button gradient_primary>Create</Button>
              </div>
            </form>
          </div>
        )}
        onClickOutside={handleClickOutsideAddRole}
      >
        <Button className={cx('btn_add_role')} onClick={handleClickAddRole} gradient_primary>
          Add Role
        </Button>
      </Tippy>
    </>
  );
}
