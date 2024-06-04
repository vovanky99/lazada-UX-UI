import classNames from 'classnames/bind';

import styles from '../User.module.scss';
import Images from '~/components/Images';
import Button from '~/components/Button';
import { DeleteData } from '~/api/General/HandleData';
import TollsEdit from '~/layout/Component/TollsEdit';
const cx = classNames.bind(styles);

export default function ListUser({ data }, handleDelete = () => {}) {
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
                <TollsEdit type="user" namePath="user" data={d} handleDelete={handleDelete} />
              </td>
            </tr>
          ))
        : ''}
    </>
  );
}
