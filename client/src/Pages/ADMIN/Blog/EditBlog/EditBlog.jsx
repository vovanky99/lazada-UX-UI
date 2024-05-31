import { useEffect, useRef, useState } from 'react';
import EditElement from './EditElement';
import { useParams } from 'react-router-dom';
import { ShowData } from '~/api/General/HandleData';

export default function EditBlog() {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    ShowData('admin', 'blogs', params.id)
      .then((result) => setData(result))
      .catch((e) => console.log(e));
  }, [params.id]);

  return <>{data ? <EditElement data={data} /> : ''}</>;
}
