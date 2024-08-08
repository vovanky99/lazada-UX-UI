import classNames from 'classnames/bind';
import styles from '../AttributesDetails.module.scss';
import { DeleteData } from '~/api/General/HandleData';
import Translate from '~/layout/Component/Translate';
import Button from '~/components/Button';
import { v4 } from 'uuid';
import config from '~/config';

const cx = classNames.bind(styles);

export default function Element({
  data,
  handleReloadData = () => {},
  deleteAlert = async () => {},
  handleToggleEdit = () => {},
}) {
  const id = v4();
  const handleDeleteCat = async (e) => {
    const alert = await deleteAlert();
    if (alert) {
      DeleteData('admin', 'attr-details', e.target.dataset.id)
        .then((result) => {
          if (result.success) {
            handleReloadData(1);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <tr>
      <td>{data?.name}</td>
      <td>{data?.attribute_name}</td>
      <td>
        <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
          <Button
            gradient_primary
            onClick={handleToggleEdit}
            to={`${config.adminRoutes.Attributes_details}?${data?.name}&uuid=${id}&sp_atk=${data?.id}`}
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
