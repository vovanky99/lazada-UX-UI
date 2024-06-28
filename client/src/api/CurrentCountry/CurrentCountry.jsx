import { useEffect, useState } from 'react';

import Nominatim from '~/services/Nominatim';
import GetLocation from '../Location/GetLocation';

export default function CurrentCountry() {
  const [country, setCountry] = useState(null);

  /* get data for country */
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        Nominatim(position.coords.latitude, position.coords.longitude)
          .then((result) => {
            GetLocation('country', result.address.country)
              .then((result) => {
                setCountry(result[0]);
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      });
    }
  }, []);

  return country;
}
