import axios from '~/api/axios';

export default async function GetDepartment() {
  try {
    const res = await axios.get('/api/admin/get-department');
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
