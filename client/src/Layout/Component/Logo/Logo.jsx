import { useEffect, useState } from 'react';
import { Logo as LG } from '~/api/Logo/GetLogo';
import Images from '~/components/Images';

export default function Logo({ type }) {
  const [value, setValue] = useState(null);
  /* get logo */
  useEffect(() => {
    LG(type)
      .then((result) => {
        setValue(result);
      })
      .catch((e) => console.log(e));
  }, []);
  return <>{value ? <Images src={value?.image} alt={value?.image} /> : <></>}</>;
}
