import { v4 } from 'uuid';
import classNames from 'classnames/bind';
import { DeleteData } from '~/api/General/HandleData';
import config from '~/config';
import Translate from '~/layout/Component/Translate';
import styles from '../Attributes.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export default function Element({
  data,
  messageDelete = () => {},
  handleReloadData = () => {},
  handleToggleEdit = () => {},
}) {
  const id = v4();
  const messageValid = {
    delete_success: Translate({ children: 'message.delete_success' }),
    delete_error: Translate({ children: 'message.delete_error' }),
  };
  const handleDeleteCat = (e) => {
    DeleteData('admin', 'attribute', e.target.dataset.id).then((result) => {
      if (result.success) {
        messageDelete(messageValid.delete_success);
        handleReloadData(1);
      }
    });
  };
  return (
    <tr>
      <td>{data?.name}</td>
      <td>{data?.cat_name}</td>
      <td>
        <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
          <Button
            gradient_primary
            onClick={handleToggleEdit}
            to={`${config.adminRoutes.Attributes}?${data?.name}&uuid=${id}&sp_atk=${data.id}`}
          >
            Edit
          </Button>
          <Button data-id={data.id} gradient_danger type="button" onClick={handleDeleteCat}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
