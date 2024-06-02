import classNames from 'classnames/bind';
import React, { memo, useEffect, useMemo } from 'react';
import { useState } from 'react';

import styles from '../../Location.module.scss';
import Button from '~/components/Button';
// import Location from '~/layout/Component/Location';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import { FormSearch } from '~/layout/Component/FormSearch';
import Location from '~/layout/Component/Location';

const cx = classNames.bind(styles);

function EditElement({
  data,
  messageError,
  messageSuccess,
  foreignID,
  handleSetID = () => {},
  handleDelete = () => {},
  handleEdit = () => {},
  title,
}) {
  const [name, setName] = useState(data?.name);
  const [ID, setID] = useState(data?.id || '');

  useEffect(() => {
    handleSetID(ID);
  });
  return (
    <>
      <div className={cx('flex-grow-1 d-flex flex-column')}>
        <div className={cx('form-group d-flex flex-column')}>
          <Location
            foreignID={foreignID}
            title={title}
            classTitle={`edit-${title}`}
            SearchValue={name}
            ValueID={ID}
            handleSetID={setID}
            handleSetName={setName}
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

export default EditElement;
