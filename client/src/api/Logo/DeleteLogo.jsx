import axios from '~/api/axios';

export default async function Deletelogo(id) {
  try {
    const res = await axios.delete(`/api/admin/delete-logo/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
