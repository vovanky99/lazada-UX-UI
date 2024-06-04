import classNames from 'classnames/bind';
import styles from '~/pages/ADMIN/Admin/Admin.module.scss';
import Images from '~/components/Images';
import TollsEdit from '~/layout/Component/TollsEdit';

const cx = classNames.bind(styles);

export default function ListAdmin({ data }) {
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
          {data ? (
            data.map((d, index) => (
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
                  <TollsEdit data={d} type="admin" namePath="admin" />
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </>
  );
}
