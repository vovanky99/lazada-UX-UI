import classNames from 'classnames/bind';
import styles from '~/pages/ADMIN/Shop/Shop.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import config from '~/config';
import { FormSearch } from '~/layout/Component/FormSearch';
import { useEffect, useState } from 'react';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import Location from '~/layout/Component/Location';
import Images from '~/components/Images';
import { GetData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function AllShop() {
  const [dataTable, setDataTable] = useState(null);
  const [filterShop, setFilterShop] = useState({
    name: '',
    status: '',
    country_id: '',
    city_id: '',
    district_id: '',
    ward_id: '',
  });
  const handleSearchName = (value) => {
    setFilterShop({
      ...filterShop,
      name: value,
    });
  };
  const handleGetlocationID = (e) => {
    const { name, id } = e.target.dataset;
    setFilterShop({
      ...filterShop,
      [name]: id,
    });
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFilterShop({
      ...filterShop,
      [name]: value,
    });
  };

  const handleDeleteShop = (e) => {};

  useEffect(() => {
    GetData('admin', 'shop', filterShop)
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => console.log(e));
  }, [filterShop]);
  return (
    <>
      <WrapperMain title="Shop" BtnAddRender={<></>}>
        <div className={cx('all_shop')}>
          <div className={cx('filter_data')}>
            <h4 className="text-capitalize">
              <b>filter Shop</b>
            </h4>
            <div className={cx('filter_content', 'd-flex flex-row flex-wrap')}>
              <FormSearch title="name" name="name" useTippy={false} searchValue={handleSearchName} />
              <FormSelect title="status" name="status" useStatus={true} handleOnchange={handleOnchange} />
              <div className={cx('shop_location', 'd-flex flex-row')}>
                <Location title="country" name="country_id" handleOnclick={handleGetlocationID} />
                <Location
                  title="city"
                  name="city_id"
                  foreignID={filterShop.country_id}
                  handleOnclick={handleGetlocationID}
                />
                <Location
                  title="district"
                  name="district_id"
                  foreignID={filterShop.city_id}
                  handleOnclick={handleGetlocationID}
                />
                <Location
                  title="ward"
                  name="ward_id"
                  foreignID={filterShop.district_id}
                  handleOnclick={handleGetlocationID}
                />
              </div>
            </div>
          </div>
          <div className={cx('list_shop')}>
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>logo</th>
                  <th>status</th>
                  <th>owner</th>
                  <th>country-city</th>
                  <th>descriptions</th>
                  <th>tolls</th>
                </tr>
              </thead>
              <tbody>
                {dataTable ? (
                  dataTable.map((dt, index) => (
                    <tr key={index}>
                      <td>{dt.name}</td>
                      <td>
                        <div>
                          <div className={cx('avatar')}>
                            <Images src={dt.avatar} alt={dt.avatar} />
                          </div>
                        </div>
                      </td>
                      <td>{dt.status}</td>
                      <td>{dt.owner}</td>
                      <td>{dt.country - dt.city}</td>
                      <td>{dt.descriptions}</td>
                      <td>
                        <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
                          <Button gradient_primary type="button" to={`${config.adminRoutes.EditShop}`}>
                            Edit
                          </Button>
                          <Button data-id={dt.id} gradient_danger type="button" onClick={handleDeleteShop}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </WrapperMain>
    </>
  );
}
