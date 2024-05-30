import classNames from 'classnames/bind';
import styles from '../Voucher.module.scss';
import Button from '~/components/Button';
import DeleteVoucher from '~/api/Voucher/DeleteVoucher';

const cx = classNames.bind(styles);

export default function ListVoucher({
  handleDelete = () => {},
  index,
  P_id,
  P_name,
  P_percents,
  P_status,
  P_cat_id,
  P_code,
  P_start_day,
  P_end_day,
  P_descriptions,
  P_cat_name,
  P_quantity,
}) {
  //delete cat
  const handleDeleteVoucher = (e) => {
    DeleteVoucher(e.target.dataset.id)
      .then((result) => {
        handleDelete(1);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <tr key={index} className={cx(`tbody-element`)}>
        <td>{P_name}</td>
        <td>{P_descriptions}</td>
        <td>{P_code}</td>
        <td>{P_status === 1 ? 'Show' : 'Hide'}</td>
        <td>{P_percents}</td>
        <td>{P_quantity === null ? 'Unlimmeted' : P_quantity}</td>
        <td>{P_cat_id === null ? 'All product' : P_cat_name}</td>
        <td>{P_start_day}</td>
        <td>{P_end_day}</td>
        <td>
          <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
            <Button gradient_primary type="button" to={`/admin/edit-voucher/${P_id}`}>
              Edit
            </Button>
            <Button data-id={P_id} gradient_danger type="button" onClick={handleDeleteVoucher}>
              Delete
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}
