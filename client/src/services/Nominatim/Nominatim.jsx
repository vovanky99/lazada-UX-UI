import axios from '~/api/axios';

/* get location on map  */
export default async function Nominatim(lat, long) {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
