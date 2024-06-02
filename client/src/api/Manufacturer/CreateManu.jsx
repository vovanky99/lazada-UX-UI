import axios from '~/api/axios';

export default async function CreateManu(...data) {
  try {
    const res = await axios.post('/api/admin/create-manu', ...data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
