import axios from '~/api/axios';

export default async function DeleteCategory(id) {
  try {
    const res = await axios.delete(`/api/admin/delete-category/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
