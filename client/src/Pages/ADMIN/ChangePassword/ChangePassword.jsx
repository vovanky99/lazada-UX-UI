import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { ChangePass } from '~/api/General/HandleData';
import Button from '~/components/Button';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import styles from '~/pages/ADMIN/ChangePassword/ChangePass.module.scss';

const cx = classNames.bind(styles);

export default function ChangePassword() {
  const oldRef = useRef();
  const newRef = useRef();
  const reRef = useRef();
  const [messageError, setMessageError] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');
  const [changePass, setChangePass] = useState({
    old_password: '',
    new_password: '',
    re_password: '',
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setChangePass({
      ...changePass,
      [name]: value,
    });
  };
  const validate = () => {
    if (changePass.new_password !== changePass.re_password) {
      setMessageError(`re password don't correct!`);
      reRef.current.classList.add('border_danger');
    } else {
      setMessageError(``);
      reRef.current.classList.remove('border_danger');
    }
    if (changePass.old_password === '') {
      oldRef.current.classList.add('border_danger');
    } else {
      oldRef.current.classList.remove('border_danger');
    }
    if (changePass.new_password === '') {
      newRef.current.classList.add('border_danger');
    } else {
      newRef.current.classList.remove('border_danger');
    }
  };
  const handlChangePass = (e) => {
    e.preventDefault();
    validate();
    if (changePass.new_password && changePass.old_password && changePass.new_password === changePass.re_password) {
      console.log(1);
      ChangePass('admin', changePass)
        .then((result) => {
          if (result.success) {
            setMessageSuccess(result.success);
          } else {
            setMessageError(`old password don't correct!`);
          }
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <>
      <div className={cx('change_password', 'd-flex flex-column')}>
        <h3 className="text-center text-capitalize">
          <b>Change Password</b>
        </h3>
        <form
          className={cx('change_password_container', 'd-flex flex-column align-items-center')}
          onSubmit={handlChangePass}
          noValidate
        >
          <FormSearch
            ref={oldRef}
            title="old Password"
            name="old_password"
            useTippy={false}
            inputType="password"
            handleOnchange={handleOnchange}
          />
          <FormSearch
            ref={newRef}
            title="new Password"
            name="new_password"
            inputType="password"
            useTippy={false}
            handleOnchange={handleOnchange}
          />
          <FormSearch
            ref={reRef}
            title="re Password"
            name="re_password"
            inputType="password"
            useTippy={false}
            handleOnchange={handleOnchange}
          />
          <div className={cx('btn_change', 'text-center')}>
            <MessageDanger message={messageError} />
            <MessageSuccess message={messageSuccess} />
            <Button gradient_primary small>
              Change
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
