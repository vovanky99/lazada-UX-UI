import { useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '~/pages/ADMIN/Manufacturer/Manufacturer.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import CreateManu from '~/api/Manufacturer/CreateManu';

const cx = classNames.bind(styles);

export default function AddManu() {
  const nameRef = useRef();
  const descriptionsRef = useRef();

  const [createSuccess, setCreateSuccess] = useState('');
  const [createError, setCreateError] = useState('');
  const [addManu, setAddManu] = useState({
    name: '',
    logo: '',
    descriptions: '',
  });
  const handleSetLogo = (value) => {
    setAddManu({
      ...addManu,
      logo: value,
    });
  };

  const handleSetName = (value) => {
    setAddManu({
      ...addManu,
      name: value,
    });
  };

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setAddManu({
      ...addManu,
      [name]: value,
    });
  };

  const handleCreateManu = (e) => {
    e.preventDefault();
    if (addManu.name === '') {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }
    if (addManu.descriptions.length <= 50) {
      descriptionsRef.current.classList.add('border_danger');
    } else {
      descriptionsRef.current.classList.remove('border_danger');
    }
    if (addManu.name && addManu.descriptions.length > 50 && addManu.logo) {
      setCreateError('');
      CreateManu(addManu)
        .then((result) => {
          if (result.success) {
            setCreateSuccess(result.success);
          } else {
            setCreateError('created failed!');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setCreateError('please enter full!');
    }
  };

  return (
    <WrapperMain title="add manu">
      <form onSubmit={handleCreateManu} className={cx('add_manu', 'd-flex flex-row flex-wrap')} noValidate>
        <FormImage title="logo" useButton={false} handleSetValue={handleSetLogo} />
        <FormSearch ref={nameRef} title="name" name="name" useTippy={false} searchValue={handleSetName} />
        <FormText
          ref={descriptionsRef}
          title="descriptions"
          name="descriptions"
          rows="3"
          handleOnchange={handleOnchange}
        />
        <div className={cx('btn_create', 'text-center flex-grow-1')}>
          <MessageDanger message={createError} classNames={cx('message')} />
          <MessageSuccess message={createSuccess} classNames={cx('message')} />
          <Button type="submit" gradient_primary>
            Create
          </Button>
        </div>
      </form>
    </WrapperMain>
  );
}
