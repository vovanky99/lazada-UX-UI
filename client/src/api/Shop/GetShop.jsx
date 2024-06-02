import axios from '../axios';

export default async function GetShop(data) {
  try {
    const res = await axios.get('/api/admin/get-shop', {
      params: {
        ...data,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
