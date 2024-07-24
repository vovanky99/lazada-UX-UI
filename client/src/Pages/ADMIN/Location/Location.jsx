import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';

import styles from '~/pages/ADMIN/Location/Location.module.scss';
import Button from '~/components/Button';
import AddLocation from '~/pages/ADMIN/Location/AddLocation';
import ListLocation from '~/pages/ADMIN/Location/ListLocation';
import WrapperMain from '~/layout/Component/WrapperMain';

const cx = classNames.bind(styles);

export default function Location() {
  const [country, setCountry] = useState(false);
  const [city, setCity] = useState(false);
  const [district, setDistrict] = useState(false);
  const [ward, setWard] = useState(false);

  const [reloadData, setReloadData] = useState(1);

  /* toggle add country  */
  const handleBTNCountryClick = () => {
    setCountry(true);
  };

  const handleCloseLocation = (e) => {
    setCountry(false);
    setDistrict(false);
    setCity(false);
    setWard(false);
  };

  /* toggle add city  */
  const handleBTNCityClick = () => {
    setCity(true);
  };

  /* toggle add district  */
  const handleBTNDistrictClick = () => {
    setDistrict(true);
  };

  /* toggle add ward  */
  const handleBTNWardClick = () => {
    setWard(true);
  };

  const handleReloadData = (value) => {
    setReloadData(reloadData + value);
  };

  return (
    <>
      <WrapperMain
        title="location"
        BtnAddRender={
          <>
            <div className={cx('add-country')}>
              <Button onClick={handleBTNCountryClick} small gradient_primary type="button">
                Add Country
              </Button>
            </div>
            <div className={cx('add-city')}>
              <Button onClick={handleBTNCityClick} small gradient_primary type="button">
                Add City
              </Button>
            </div>
            <div className={cx('add-district')}>
              <Button onClick={handleBTNDistrictClick} small gradient_primary type="button">
                Add District
              </Button>
            </div>
            <div className={cx('add-ward')}>
              <Button onClick={handleBTNWardClick} small gradient_primary type="button">
                Add Ward
              </Button>
            </div>
          </>
        }
      >
        <ListLocation reloadData={reloadData} />
        <AddLocation
          id={country ? 'country' : city ? 'city' : district ? 'district' : 'ward'}
          title={country ? 'country' : city ? 'city' : district ? 'district' : 'ward'}
          useCountry={country}
          useCity={city}
          useDistrict={district}
          handleCloseLocation={handleCloseLocation}
          useWard={ward}
          closeModal={country || city || district || ward}
          handleReloadData={handleReloadData}
        />
      </WrapperMain>
    </>
  );
}
