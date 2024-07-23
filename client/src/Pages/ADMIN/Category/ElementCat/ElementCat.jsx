import classNames from 'classnames/bind';
import styles from '../Category.module.scss';
import Button from '~/components/Button';
import Tippy from '@tippyjs/react/headless';
import { Fragment, useEffect, useState } from 'react';
import { DeleteData, EditData } from '~/api/General/HandleData';
import Translate from '~/layout/Component/Translate';
import config from '~/config';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);

export default function ListCat({ handleDelete = () => {}, data, EditCat = () => {} }) {
  const id = uuidv4();

  const handleToggleEdit = (e) => {
    EditCat();
  };

  //delete cat
  const handleDeleteCat = (e) => {
    DeleteData('admin', 'category', e.target.dataset.id)
      .then((result) => {
        handleDelete(1);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Fragment>
      <tr className={cx(`tbody-element`)}>
        <td>{data.cat_name}</td>
        <td>{data.parent_name}</td>
        <td>{data.industry_code}</td>
        <td>{data.status === 1 ? <Translate>show</Translate> : <Translate>hide</Translate>}</td>
        <td>
          <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
            <Button
              gradient_primary
              onClick={handleToggleEdit}
              to={`${config.adminRoutes.Category}?${data.cat_name}.${id}&sp_atk=${data.id}`}
            >
              Edit
            </Button>
            <Button data-id={data.id} gradient_danger type="button" onClick={handleDeleteCat}>
              Delete
            </Button>
          </div>
        </td>
      </tr>
    </Fragment>
  );
}
