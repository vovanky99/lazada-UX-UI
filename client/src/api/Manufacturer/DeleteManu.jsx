import axios from '~/api/axios';

export default async function DeleteManu(id) {
  try {
    const res = await axios.delete(`/api/admin/delete-manu/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
