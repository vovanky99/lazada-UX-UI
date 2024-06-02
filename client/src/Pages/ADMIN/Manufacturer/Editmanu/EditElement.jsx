import { useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '~/pages/ADMIN/Manufacturer/Manufacturer.module.scss';
import Button from '~/components/Button';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import { EditData, ShowData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function EditElement({ data }) {
  const nameRef = useRef();
  const descriptionsRef = useRef();

  const [editSuccess, setEditSuccess] = useState('');
  const [editError, setEditError] = useState('');
  const [editManu, setEditManu] = useState({
    name: data?.name || '',
    status: data?.status || '',
    logo: data?.logo || '',
    descriptions: data?.descriptions || '',
  });
  const handleSetLogo = (value) => {
    setEditManu({
      ...editManu,
      logo: value,
    });
  };

  const handleSetName = (value) => {
    setEditManu({
      ...editManu,
      name: value,
    });
  };

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setEditManu({
      ...editManu,
      [name]: value,
    });
  };

  const handleUpdateManu = (e) => {
    e.preventDefault();
    if (editManu.name === '') {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }
    if (editManu.descriptions.length <= 50) {
      descriptionsRef.current.classList.add('border_danger');
    } else {
      descriptionsRef.current.classList.remove('border_danger');
    }
    if (editManu.name && editManu.descriptions.length > 50 && editManu.logo) {
      setEditError('');
      EditData('admin', 'manu', data.id, editManu)
        .then((result) => {
          if (result.success) {
            setEditSuccess(result.success);
          } else {
            setEditError('created failed!');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setEditError('please enter full!');
    }
  };
  return (
    <form onSubmit={handleUpdateManu} className={cx('edit_manu', 'd-flex flex-row flex-wrap')} noValidate>
      <FormImage title="logo" data={editManu.logo} useButton={false} handleSetValue={handleSetLogo} />
      <FormSearch
        ref={nameRef}
        title="name"
        Value={editManu.name}
        name="name"
        useTippy={false}
        searchValue={handleSetName}
      />
      <FormSelect
        title="status"
        name="status"
        defaultValue={editManu.status}
        useStatus
        handleOnchange={handleOnchange}
      />
      <FormText
        ref={descriptionsRef}
        title="descriptions"
        name="descriptions"
        rows={3}
        data={editManu.descriptions}
        handleOnchange={handleOnchange}
      />
      <div className={cx('btn_create', 'text-center flex-grow-1')}>
        <MessageDanger message={editError} classNames={cx('message')} />
        <MessageSuccess message={editSuccess} classNames={cx('message')} />
        <Button type="submit" gradient_primary>
          Update
        </Button>
      </div>
    </form>
  );
}
