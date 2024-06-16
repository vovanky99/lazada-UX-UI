import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import WrapperMain from '~/layout/Component/WrapperMain';
import styles from '~/pages/ADMIN/Logo/logo.module.scss';
import LogoElement from './LogoElement';
import Button from '~/components/Button';
import config from '~/config';
import { GetData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function Logo() {
  const [dataTable, setDataTable] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [Logo, setLogo] = useState({
    name: '',
    type: '',
    status: '',
    image: '',
  });

  const handleDelete = (value) => {
    setDeleteSuccess(deleteSuccess + value);
  };
  useEffect(() => {
    GetData('admin', 'logo')
      .then((result) => {
        setDataTable(result);
      })
      .catch((e) => console.log(e));
  }, [deleteSuccess]);
  return (
    <>
      <WrapperMain
        title="Logo"
        BtnAddRender={
          <>
            <Button type="button" small gradient_primary to={config.adminRoutes.AddLogo}>
              Add Logo
            </Button>
          </>
        }
      >
        <div className={cx('logo', 'd-flex flex-wrap flex-row')}>
          {dataTable ? (
            dataTable.map((d, index) => <LogoElement handleDelete={handleDelete} key={index} Data={d} />)
          ) : (
            <></>
          )}
        </div>
      </WrapperMain>
    </>
  );
}
