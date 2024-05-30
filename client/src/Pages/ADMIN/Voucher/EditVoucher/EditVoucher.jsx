import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShowData } from '~/api/General/HandleData';
import EditElement from './EditElement';

export default function EditVoucher() {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    ShowData('admin', 'voucher', params.id)
      .then((result) => {
        setData(result);
      })
      .catch((e) => console.log(e));
  }, [params.id]);

  return <>{data ? <EditElement data={data} /> : ''}</>;
}
