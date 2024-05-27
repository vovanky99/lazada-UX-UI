import axios from '~/api/axios';

export default async function CreateLocation(location, data) {
  try {
    const res = await axios.post(`/api/admin/create-${location}`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
