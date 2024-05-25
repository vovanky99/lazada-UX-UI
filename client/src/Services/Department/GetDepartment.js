import axios from '~/api/axios';

export default async function GetDepartment(value) {
  try {
    const res = await axios.get('/api/admin/get-department', {
      params: {
        name: value,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
