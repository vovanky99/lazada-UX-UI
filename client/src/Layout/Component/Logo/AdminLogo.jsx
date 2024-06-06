import { useEffect, useState } from 'react';
import { Logo } from '~/api/Logo/GetLogo';
import Images from '~/components/Images';

export default function AdminLogo({ type }) {
  const [logo, setLogo] = useState(null);
  /* get logo */
  useEffect(() => {
    Logo(type)
      .then((result) => {
        setLogo(result);
      })
      .catch((e) => console.log(e));
  }, []);
  return <>{logo ? <Images src={logo?.image} alt={logo?.image} /> : <></>}</>;
}
