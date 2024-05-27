import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ShowData } from '~/api/General/HandleData';
import EditChild from './EditChild';

export default function EditAdmin() {
  const param = useParams();
  const location = useLocation();
  console.log(location.pathname);

  const [data, setData] = useState(null);

  /* handle get data */
  useEffect(() => {
    const id = param.id;
    ShowData('admin', 'admin', id)
      .then((result) => {
        setData(result[0]);
      })
      .catch((e) => console.log(e));
  }, [param.id]);

  return <>{data ? <EditChild data={data} /> : ''}</>;
}
