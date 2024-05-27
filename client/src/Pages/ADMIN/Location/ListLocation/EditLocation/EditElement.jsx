import classNames from 'classnames/bind';
import React from 'react';
import { useState } from 'react';

import styles from '../../Location.module.scss';
import Button from '~/components/Button';

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
  return (
    <>
      <div className={cx('flex-grow-1 d-flex flex-column')}>
        <div className={cx('form-group d-flex flex-column')}>
          <label className="form-label text-capitalize">
            <b>{title}</b>
          </label>
          <input
            value={name}
            className="form-control"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {messageError ? <div className="text-warning fs-5">{messageError}</div> : ''}
        {messageSuccess ? <div className="text-success fs-5">{messageSuccess}</div> : ''}
        <div className="d-flex flex-row justify-content-center">
          <Button
            data-name={name}
            data-id={data?.id || ''}
            transparent
            type="button"
            className={cx('text-primary')}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            data-id={data?.id || ''}
            transparent
            type="button"
            className={cx('text-danger')}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
