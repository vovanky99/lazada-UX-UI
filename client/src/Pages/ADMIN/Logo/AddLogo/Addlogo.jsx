import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import WrapperMain from '~/layout/Component/WrapperMain';
import styles from '~/pages/ADMIN/Logo/logo.module.scss';
import Button from '~/components/Button';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import { FormSearch } from '~/layout/Component/FormSearch';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import { CreateData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function AddLogo() {
  const nameRef = useRef();
  const [messageSuccess, setMessageSuccess] = useState('');
  const [messageError, setMessageError] = useState('');
  const [Logo, setLogo] = useState({
    name: '',
    image: '',
    type: '',
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
  const validated = () => {
    if (Logo.name === '') {
      nameRef.current.classList.add('input_danger');
    } else {
      nameRef.current.classList.remove('input_danger');
    }
  };
  const handleCreateLogo = (e) => {
    e.preventDefault();
    validated();
    if (Logo.image && Logo.name) {
      setMessageError('');
      CreateData('admin', 'logo', Logo)
        .then((result) => {
          if (result.success) {
            setMessageSuccess(result.success);
          }
        })
        .catch((e) => {
          setMessageError('create logo have issue!');
        });
    } else {
      setMessageError('please enter full!');
    }
  };
  return (
    <>
      <WrapperMain title="add Logo">
        <div className={cx('add_logo', 'd-flex flex-wrap flex-row')}>
          <form onSubmit={handleCreateLogo} className={cx('d-flex flex-row flex-wrap flex-grow-1')} noValidate>
            <FormImage
              className={cx(
                'image',
                'form-group flex-grow-1 d-flex justify-content-center align-items-center mb-5 flex-column',
              )}
              title="change Logo"
              useButton={false}
              handleSetValue={handleSetValue}
            />
            <FormSearch ref={nameRef} title="name" name="name" useTippy={false} handleOnchange={handleOnchange} />
            <FormSearch ref={nameRef} title="type" name="type" useTippy={false} handleOnchange={handleOnchange} />
            <MessageSuccess message={messageSuccess} />
            <MessageDanger message={messageError} />
            <div className={cx('btn_add_logo', 'text-center')}>
              <Button type="submit" small gradient_primary>
                Create
              </Button>
            </div>
          </form>
        </div>
      </WrapperMain>
    </>
  );
}
