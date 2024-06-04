import classNames from 'classnames/bind';
import { useState } from 'react';

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
    if (country) {
      setCountry(false);
    } else {
      setCountry(true);
    }
    setDistrict(false);
    setCity(false);
    setWard(false);
  };

  /* toggle add city  */
  const handleBTNCityClick = () => {
    if (city) {
      setCity(false);
    } else {
      setCity(true);
    }
    setDistrict(false);
    setCountry(false);
    setWard(false);
  };

  /* toggle add district  */
  const handleBTNDistrictClick = () => {
    if (district) {
      setDistrict(false);
    } else {
      setDistrict(true);
    }
    setCity(false);
    setCountry(false);
    setWard(false);
  };

  /* toggle add ward  */
  const handleBTNWardClick = () => {
    if (ward) {
      setWard(false);
    } else {
      setWard(true);
    }
    setCity(false);
    setCountry(false);
    setDistrict(false);
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
              {country ? <AddLocation title="country" useCountry handleReloadData={handleReloadData} /> : <></>}
            </div>
            <div className={cx('add-city')}>
              <Button onClick={handleBTNCityClick} small gradient_primary type="button">
                Add City
              </Button>
              {city ? <AddLocation title="city" useCity handleReloadData={handleReloadData} /> : <></>}
            </div>
            <div className={cx('add-district')}>
              <Button onClick={handleBTNDistrictClick} small gradient_primary type="button">
                Add District
              </Button>
              {district ? <AddLocation title="district" useDistrict handleReloadData={handleReloadData} /> : <></>}
            </div>
            <div className={cx('add-ward')}>
              <Button onClick={handleBTNWardClick} small gradient_primary type="button">
                Add Ward
              </Button>
              {ward ? <AddLocation title="ward" useWard handleReloadData={handleReloadData} /> : <></>}
            </div>
          </>
        }
      >
        <ListLocation reloadData={reloadData} />
      </WrapperMain>
    </>
  );
}
