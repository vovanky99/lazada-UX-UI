import classNames from 'classnames/bind';
import styles from '../../Admin.module.scss';
import Images from '~/components/Images';
import Button from '~/components/Button';
import { DeleteData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function ListAdmin({ data }) {
  const handleDeleteAdmin = (e) => {
    DeleteData('admin', 'admin', e.target.datatset.id)
      .then()
      .catch((e) => console.log(e));
  };
  return (
    <>
      <table>
        <thead>
          <tr className="text-capitalize">
            <th>name</th>
            <th>avatar</th>
            <th>department</th>
            <th>gender</th>
            <th>position</th>
            <th>status</th>
            <th>birthday</th>
            <th>Born At</th>
            <th>Live At</th>
            <th>Tolls</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((d, index) => (
                <tr className="text-capitalize text-center" key={index}>
                  <td>{d.name}</td>
                  <td>
                    <div className={cx('avatar')}>
                      <Images src={d.avatar} />
                    </div>
                  </td>
                  <td>{d.department_name}</td>
                  <td>{d.gender == 1 ? 'Male' : 'Female'}</td>
                  <td>{d.role_name}</td>
                  <td>{d.status == 1 ? 'Work' : 'Leave Of Work'}</td>
                  <td>{d.birthday}</td>
                  <td>{`${d.city_born_name} - ${d.country_born_name}`}</td>
                  <td>{`${d.city_live_name} - ${d.country_live_name}`}</td>
                  <td>
                    <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
                      <Button gradient_primary type="button" to={`/admin/edit-admin/${d.id}`}>
                        Edit
                      </Button>
                      <Button data-id={d.id} gradient_danger type="button" onClick={handleDeleteAdmin}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </>
  );
}
