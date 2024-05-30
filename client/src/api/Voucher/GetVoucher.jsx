import axios from '~/api/axios';

export default async function GetVoucher({ ...data }) {
  try {
    const res = await axios.get('/api/get-voucher', {
      params: {
        ...data,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
