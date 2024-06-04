import classNames from 'classnames/bind';
import styles from '~/layout/Component/TollsEdit/TollEdit.module.scss';

import { DeleteData } from '~/api/General/HandleData';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export default function TollEdit({ data, type, namePath, handleDelete = () => {} }) {
  const handleDeleteAdmin = (e) => {
    DeleteData('admin', type, e.target.dataset.id)
      .then((result) => {
        handleDelete(1);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
        <Button gradient_primary type="button" to={`/admin/edit-${namePath}/${data.id}`}>
          Edit
        </Button>
        <Button data-id={data.id} gradient_danger type="button" onClick={handleDeleteAdmin}>
          Delete
        </Button>
      </div>
      ;
    </>
  );
}
