import axios from '../axios';

export async function RegisterShop(data, type) {
  try {
    const res = await axios.post(`/api/seller/register-shop/${type}`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
