import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ShowData } from '~/api/General/HandleData';
import EditDetail from './EditDetail';

export default function EditAdmin() {
  const param = useParams();
  const location = useLocation();

  const [data, setData] = useState(null);

  /* handle get data */
  useEffect(() => {
    const id = param.id;
    ShowData('admin', 'user', id)
      .then((result) => {
        setData(result[0]);
      })
      .catch((e) => console.log(e));
  }, [param.id]);

  return <>{data ? <EditDetail data={data} /> : ''}</>;
}
