import classNames from 'classnames/bind';
import React from 'react';
import { useState } from 'react';

import styles from '../../Location.module.scss';
import Button from '~/components/Button';
import Location from '~/layout/Component/Location';

const cx = classNames.bind(styles);

export default function EditElement({
  data,
  messageError,
  messageSuccess,
  handleDelete = () => {},
  handleEdit = () => {},
  title,
}) {
  const [name, setName] = useState(data?.name);
  const [ID, setID] = useState(data?.id || '');
  return (
    <>
      <div className={cx('flex-grow-1 d-flex flex-column')}>
        <div className={cx('form-group d-flex flex-column')}>
          <Location
            title={title}
            classTitle={`edit-${title}`}
            SearchValue={name}
            ValueID={ID}
            handleSetID={setID}
            handleSetName={setName}
          />
        </div>
        {messageError ? <div className="text-warning fs-5">{messageError}</div> : ''}
        {messageSuccess ? <div className="text-success fs-5">{messageSuccess}</div> : ''}
        <div className="d-flex flex-row justify-content-center">
          <Button
            data-name={name}
            data-id={ID}
            transparent
            type="button"
            className={cx('text-primary')}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button onClick={handleDelete} data-id={ID} transparent type="button" className={cx('text-danger')}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
