import axios from '~/api/axios';

export default async function DeleteAdmin(id) {
  try {
    const res = await axios.delete(`/api/admin/delete-admin/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
