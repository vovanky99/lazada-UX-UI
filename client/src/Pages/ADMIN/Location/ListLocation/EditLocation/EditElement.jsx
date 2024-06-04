import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useState } from 'react';

import styles from '../../Location.module.scss';
import Button from '~/components/Button';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import Location from '~/layout/Component/Location';
import { DeleteData, EditData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

function EditElement({
  data,
  foreignID,
  handleSetID = () => {},
  useTippy = true,
  title,
  handleOnchangeDelete = () => {},
}) {
  const [name, setName] = useState(data?.name);
  const [ID, setID] = useState(data?.id || '');
  const [messageError, setMessageError] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');

  useEffect(() => {
    handleSetID(ID);
  }, [ID]);
  const handleEdit = async (e) => {
    if (e.target.dataset.id && e.target.dataset.name) {
      EditData('admin', title, e.target.dataset.id, {
        name: e.target.dataset.name,
        foreign_id: e.target.dataset.foreign,
      })
        .then((e) => {
          handleOnchangeDelete(1);
          setMessageSuccess(`edit ${title} Success`);
          if (messageError) {
            setMessageError('');
          }
        })
        .catch((e) => console.log(e));
    } else {
      setMessageSuccess('');
      setMessageError(`${title} is value empty!`);
    }
  };

  const handleDelete = async (e) => {
    if (e.target.dataset.id) {
      DeleteData('admin', title, e.target.dataset.id)
        .then((e) => {
          handleOnchangeDelete(1);
          setMessageSuccess(`delete ${title} Success`);
          if (messageError) {
            setMessageError('');
          }
        })
        .catch((e) => console.log(e));
    } else {
      if (messageSuccess) {
        setMessageSuccess('');
      }
      setMessageError(`${title} is value empty!`);
    }
  };

  return (
    <>
      <div className={cx('flex-grow-1 d-flex flex-column')}>
        <div className={cx('form-group d-flex flex-column')}>
          <Location
            disabled={data ? false : true}
            foreignID={foreignID}
            title={title}
            classTitle={`edit-${title}`}
            SearchValue={name}
            ValueID={ID}
            useTippy={useTippy}
            handleSetID={setID}
            handleSetName={setName}
            data
          />
        </div>
        <MessageSuccess message={messageSuccess} />
        <MessageSuccess message={messageError} />
        <div className="d-flex flex-row justify-content-center">
          <Button
            data-name={name}
            data-id={ID}
            data-foreign={foreignID}
            transparent
            type="button"
            className={cx('text-primary')}
            onClick={handleEdit}
            disabled={data ? false : true}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            data-id={ID}
            transparent
            type="button"
            disabled={data ? false : true}
            className={cx('text-danger')}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}

export default EditElement;
