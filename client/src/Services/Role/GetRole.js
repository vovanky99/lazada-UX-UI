import axios from '~/api/axios';

export default async function GetRole(value) {
  try {
    const res = await axios.get('/api/admin/get-role', {
      params: {
        name: value,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
