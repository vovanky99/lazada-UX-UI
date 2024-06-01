import axios from '~/api/axios';

export default async function CreateLogo(...data) {
  try {
    const res = await axios.post('/api/admin/create-logo', ...data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
