import axios from '~/api/axios';

export default async function GetManu(data) {
  try {
    const res = await axios.get('/api/admin/get-manu', {
      params: {
        ...data,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
