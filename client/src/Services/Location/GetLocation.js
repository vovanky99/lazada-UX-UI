import axios from '~/api/axios';

export default async function GetLocation(location, searchValue, ForeignID) {
  try {
    const res = await axios.get(`/api/get-${location}`, {
      params: {
        name: searchValue,
        foreign_id: ForeignID,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function GetAllLocation(country_id, city_id, district_id) {
  try {
    const res = await axios.get('/api/all-location', {
      params: {
        country_id,
        city_id,
        district_id,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
