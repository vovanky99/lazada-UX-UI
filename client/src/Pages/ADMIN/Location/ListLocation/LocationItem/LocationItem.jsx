import classNames from 'classnames/bind';
import React from 'react';

import styles from '~/pages/ADMIN/Location/Location.module.scss';
import Button from '~/components/Button';
import { DeleteSingleLocation } from '~/api/Location/DeleteLocation';
import Translate from '~/layout/Component/Translate';
import config from '~/config';
import { v4 as uuidV4 } from 'uuid';

const cx = classNames.bind(styles);

export default function LocationItem({
  country,
  city,
  district,
  ward,
  handleOnchangeDelete = () => {},
  handleToggleEdit = () => {},
}) {
  /* handle delete location*/
  const handleDeleteLocation = async (e) => {
    DeleteSingleLocation(e.target.dataset.value, e.target.dataset.id)
      .then(() => {
        handleOnchangeDelete(1);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <tr className={cx(`tbody-element`)}>
        <td>{country?.name}</td>
        <td>{city?.name || ''}</td>
        <td>{district?.name || ''}</td>
        <td>{ward?.name || ''}</td>
        <td>
          <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
            <Button
              gradient_primary
              onClick={handleToggleEdit}
              className="text-capitalize"
              to={`${config.adminRoutes.Location}?location_id=${
                ward?.id || district?.id || city?.id || country?.id
              }&location_type=${
                ward?.id ? 'ward' : district?.id ? 'district' : city?.id ? 'city' : 'country'
              }&uuid=${uuidV4()}`}
            >
              <Translate>edit</Translate>
            </Button>
            <Button
              data-value={ward ? `ward` : district ? 'district' : city ? 'city' : 'country'}
              data-id={ward?.id || district?.id || city?.id || country?.id}
              gradient_danger
              type="button"
              onClick={handleDeleteLocation}
              className="text-capitalize"
            >
              <Translate>delete</Translate>
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}
