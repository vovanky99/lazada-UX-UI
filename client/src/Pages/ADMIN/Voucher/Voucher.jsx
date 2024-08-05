import classNames from 'classnames/bind';
import styles from './Voucher.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';

import { useEffect, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import ListVoucher from './ListVoucher';
import Category from '~/layout/Component/Category';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import config from '~/config';
import Button from '~/components/Button';
import { GetData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function Voucher() {
  const [deleteSuccess, setDeleteSuccess] = useState(1);
  const [dataTable, setDataTable] = useState(null);
  const [filterVoucher, setFilterVoucher] = useState({
    name: '',
    category_id: '',
    status: '',
    code: '',
    start_day: '',
    end_day: '',
  });

  /*set value for filter */
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === 'category_id') {
      setFilterVoucher({
        ...filterVoucher,
        [name]: e.target.dataset.id,
      });
    } else {
      setFilterVoucher({
        ...filterVoucher,
        [name]: value,
      });
    }
  };

  const AddDeleteSuccess = (value) => {
    setDeleteSuccess(deleteSuccess + value);
  };

  /* get all for Data tbale */
  useEffect(() => {
    GetData('admin', 'voucher', {
      name: filterVoucher.name,
      status: filterVoucher.status,
      category_id: filterVoucher.category_id,
      code: filterVoucher.code,
      start_day: filterVoucher.start_day,
      end_day: filterVoucher.end_day,
    })
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => console.log(e));
  }, [filterVoucher]);
  return (
    <>
      <WrapperMain
        title="All Voucher"
        BtnAddRender={
          <>
            <Button className={cx('btn_add_voucher')} to={`${config.adminRoutes.AddVoucher}`} gradient_primary>
              Add Voucher
            </Button>
          </>
        }
      >
        <div className={cx('filter_data')}>
          <h4 className="text-capitalize">
            <b>filter Data</b>
          </h4>
          <div className={cx('filter_content', 'd-flex flex-row flex-wrap')}>
            <FormSearch title="name" name="name" useColumn handleOnchange={handleOnchange} useTippy={false} />
            <FormSearch title="code" name="code" useColumn handleOnchange={handleOnchange} useTippy={false} />
            <FormSelect title="status" name="status" useStatus={true} handleOnchange={handleOnchange} />
            <Category title="category" name="category_id" useColumn handleOnchange={handleOnchange} />
            <FormDate title="start day" name="start_day" handleOnchange={handleOnchange} />
            <FormDate title="end day" name="end_day" handleOnchange={handleOnchange} />
          </div>
        </div>
        <div className={cx('data_table')}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>code</th>
                <th>status</th>
                <th>percents</th>
                <th>quantity</th>
                <th>category </th>
                <th>start day </th>
                <th>end day </th>
                <th>tools</th>
              </tr>
            </thead>
            <tbody>
              {dataTable?.map((d, index) => (
                <ListVoucher
                  handleDelete={AddDeleteSuccess}
                  key={index}
                  P_id={d.id}
                  P_cat_name={d.cat_name}
                  P_cat_id={d.category_id}
                  P_status={d.status}
                  P_name={d.name}
                  P_code={d.code}
                  P_descriptions={d.descriptions}
                  P_quantity={d.quantity}
                  P_start_day={d.start_day}
                  P_end_day={d.end_day}
                  P_percents={d.percents}
                  data={d}
                />
              ))}
            </tbody>
          </table>
        </div>
      </WrapperMain>
    </>
  );
}
