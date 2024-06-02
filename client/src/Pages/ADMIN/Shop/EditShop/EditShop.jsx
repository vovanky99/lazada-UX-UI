import classNames from 'classnames/bind';
import styles from '../Shop.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import { FormSearch } from '~/layout/Component/FormSearch';
import { useState } from 'react';
import Location from '~/layout/Component/Location';

const cx = classNames.bind(styles);

export default function AddShop() {
  const [countryID, setCountryID] = useState('');
  const [cityID, setCityID] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [OwnerData, setOwnerData] = useState(null);
  const [shop, setShop] = useState({
    img_cover: '',
    logo: '',
    name: '',
    descriptions: '',
    shop_owner_id: '',
    ward_id: '',
    address: '',
  });

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setShop({
      ...shop,
      [name]: value,
    });
  };

  const handleSetImageCover = (value) => {
    setShop({
      ...shop,
      img_cover: value,
    });
  };
  const handleSetLogo = (value) => {
    setShop({
      ...shop,
      logo: value,
    });
  };
  const handleSetWardID = (e) => {
    const { name, id } = e.target.dataset;
    setShop({
      ...shop,
      name: id,
    });
  };
  const handleSetOwner = (value) => {
    setShop({
      ...shop,
      shop_owner_id: value,
    });
  };
  return (
    <>
      <WrapperMain title="Add Shop">
        <div className={cx('edit_shop')}>
          <div className={cx('logo_shop')}>
            <FormImage
              title="images cover"
              className={cx('images_cover')}
              useButton={false}
              handleSetValue={handleSetImageCover}
            />
            <FormImage title="logo" className={cx('logo')} useButton={false} handleSetValue={handleSetLogo} />
          </div>
          <FormSearch title="name" name="name" useTippy={false} handleOnchange={handleOnchange} />
          <FormSearch title="descriptions" name="descriptions" useTippy={false} handleOnchange={handleOnchange} />
          <FormSearch title="owner" name="owner" data={OwnerData} handleSetID={handleSetOwner} />
          <div className={cx('shop_location')}>
            <Location title="country" handleSetID={setCountryID} />
            <Location title="city" foreignID={countryID} handleSetID={setCityID} />
            <Location title="district" foreignID={cityID} handleSetID={setDistrictID} />
            <Location title="ward" name="ward_id" foreignID={districtID} handleOnclick={handleSetWardID} />
          </div>
        </div>
      </WrapperMain>
    </>
  );
}
