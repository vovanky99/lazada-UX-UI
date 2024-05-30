import axios from '~/api/axios';

export default async function CreateVoucher(...data) {
  try {
    const res = await axios.post('/api/admin/create-voucher', ...data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
