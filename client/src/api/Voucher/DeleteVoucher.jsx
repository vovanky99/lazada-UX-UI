import axios from '~/api/axios';

export default async function DeleteVoucher(id) {
  try {
    const res = await axios.delete(`/api/admin/delete-voucher/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
