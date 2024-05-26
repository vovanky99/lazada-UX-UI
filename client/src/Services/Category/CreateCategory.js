import axios from '~/api/axios';

export default async function CreateCategory(data) {
  try {
    const res = await axios.post('/api/admin/create-category', data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
