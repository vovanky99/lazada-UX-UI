import axios from '~/api/axios';

export default async function GetRole() {
  try {
    const res = await axios.get('/api/admin/get-role');
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
