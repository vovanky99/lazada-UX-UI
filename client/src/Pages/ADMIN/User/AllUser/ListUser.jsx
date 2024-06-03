import classNames from 'classnames/bind';

import styles from '../User.module.scss';
import Images from '~/components/Images';
import Button from '~/components/Button';
import { DeleteData } from '~/api/General/HandleData';
const cx = classNames.bind(styles);

export default function ListUser({ data }, handleDeleteSuccess = () => {}) {
  const handleDeleteUser = (e) => {
    DeleteData('admin', 'user', e.target.dataset.id)
      .then((result) => {
        if (result.success) {
          handleDeleteSuccess(1);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      {data
        ? data.map((d, index) => (
            <tr key={index}>
              <td>{d.name}</td>
              <td>
                <div className={cx('avatar')}>
                  <Images src={d.avatar} alt={d.avatar} />
                </div>
              </td>
              <td>{d.status == 1 ? 'Show' : 'hide'}</td>
              <td>{d.gender == 1 ? 'Male' : 'Female'}</td>
              <td>{d.email}</td>
              <td>{`${d.city_name || ''} - ${d.country_name || ''}`}</td>
              <td>{d.phone_number}</td>
              <td>{d.birthday}</td>
              <td>
                <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
                  <Button gradient_primary type="button" to={`/admin/edit-user/${d.id}`}>
                    Edit
                  </Button>
                  <Button data-id={d.id} gradient_danger type="button" onClick={handleDeleteUser}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))
        : ''}
    </>
  );
}
