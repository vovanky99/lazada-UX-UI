import classNames from 'classnames/bind';
import { useState } from 'react';
import { DeleteData, EditData } from '~/api/General/HandleData';
import Button from '~/components/Button';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import styles from '~/pages/ADMIN/Logo/logo.module.scss';

const cx = classNames.bind(styles);

export default function LogoElement({ Data, handleDelete }) {
  const [messageSuccess, setMessageSuccess] = useState('');
  const [messageError, setMessageError] = useState('');
  const [Logo, setLogo] = useState({
    name: '',
    status: '',
    image: '',
  });

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setLogo({
      ...Logo,
      [name]: value,
    });
  };
  const handleSetValue = (value) => {
    setLogo({
      ...Logo,
      image: value,
    });
  };
  const handleUpdateLogo = (e) => {
    e.preventDefault();
    if (Logo.name !== '' && Logo.image !== '' && Logo.status !== '') {
      EditData('admin', 'logo', Data.id, Logo)
        .then((result) => {
          if (result.success) {
            setMessageSuccess(result.success);
          } else {
            setMessageError('update have issue!');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const handleDeleteLogo = (e) => {
    DeleteData('admin', 'logo', e.target.dataset.id).then((result) => {
      if (result.success) {
        setMessageSuccess(result.success);
        handleDelete(1);
      }
    });
  };
  return (
    <>
      <form className={cx('logo_element', 'd-flex flex-column')} noValidate>
        <FormImage
          title="change Logo"
          className={cx('image', 'd-flex flex-column align-items-center')}
          useButton={false}
          data={Data.image}
          handleSetValue={handleSetValue}
        />
        <FormSearch title="name" name="name" Value={Data.name} useTippy={false} handleOnchange={handleOnchange} />
        <FormSelect title="status" name="status" defaultValue={Data.status} useStatus handleOnchange={handleOnchange} />
        <MessageSuccess message={messageSuccess} />
        <MessageDanger message={messageError} />
        <Button type="button" data-id={Data.id} gradient_primary onClick={handleUpdateLogo}>
          Edit
        </Button>
        <Button type="button" data-id={Data.id} gradient_danger onClick={handleDeleteLogo}>
          Delete
        </Button>
      </form>
    </>
  );
}
