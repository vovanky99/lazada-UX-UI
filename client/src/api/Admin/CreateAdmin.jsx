import axios from '~/api/axios';

export default async function CreateAdmin(data) {
  try {
    const res = await axios.post('/api/admin/create-admin', data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
