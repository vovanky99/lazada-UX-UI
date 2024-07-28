import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from '~/pages/ADMIN/Location/Location.module.scss';
import Button from '~/components/Button';
import ListLocation from '~/pages/ADMIN/Location/ListLocation';
import WrapperMain from '~/layout/Component/WrapperMain';
import Translate from '~/layout/Component/Translate';
import Country from './AddLocation/Country';
import City from './AddLocation/City';
import District from './AddLocation/District';
import Ward from './AddLocation/Ward';

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
    setDistrict(false);
    setCountry(false);
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
              <Button
                className={cx('text-capitalize')}
                onClick={handleBTNCountryClick}
                small
                gradient_primary
                type="button"
              >
                <Translate>add_country</Translate>
              </Button>
            </div>
            <div className={cx('add-city')}>
              <Button
                className={cx('text-capitalize')}
                onClick={handleBTNCityClick}
                small
                gradient_primary
                type="button"
              >
                <Translate>add_city</Translate>
              </Button>
            </div>
            <div className={cx('add-district')}>
              <Button
                className={cx('text-capitalize')}
                onClick={handleBTNDistrictClick}
                small
                gradient_primary
                type="button"
              >
                <Translate>add_district</Translate>
              </Button>
            </div>
            <div className={cx('add-ward')}>
              <Button
                className={cx('text-capitalize')}
                onClick={handleBTNWardClick}
                small
                gradient_primary
                type="button"
              >
                <Translate>add_ward</Translate>
              </Button>
            </div>
          </>
        }
      >
        <ListLocation reloadData={reloadData} />
        <Country
          id="country"
          title="country"
          resetValue={country}
          handleCloseLocation={handleCloseLocation}
          closeModal={country}
          handleReloadData={handleReloadData}
        />
        <City
          id="city"
          title="city"
          resetValue={city}
          handleCloseLocation={handleCloseLocation}
          closeModal={city}
          handleReloadData={handleReloadData}
        />
        <District
          id="district"
          title="district"
          resetValue={district}
          handleCloseLocation={handleCloseLocation}
          closeModal={district}
          handleReloadData={handleReloadData}
        />
        <Ward
          id="ward"
          title="ward"
          resetValue={ward}
          handleCloseLocation={handleCloseLocation}
          closeModal={ward}
          handleReloadData={handleReloadData}
        />
      </WrapperMain>
    </>
  );
}
