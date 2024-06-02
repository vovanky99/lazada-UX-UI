import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '~/pages/ADMIN/Manufacturer/Manufacturer.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import Button from '~/components/Button';
import FormImage from '~/layout/Component/FormGroup/FormImage';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import { useParams } from 'react-router-dom';
import { EditData, ShowData } from '~/api/General/HandleData';
import EditElement from './EditElement';

const cx = classNames.bind(styles);

export default function EditManu() {
  const params = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    ShowData('admin', 'manu', params.id)
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params.id]);
  return (
    <WrapperMain title="edit manu" className={cx('add_manufacturer')}>
      {data ? <EditElement data={data} /> : <></>}
    </WrapperMain>
  );
}
