import axios from '~/api/axios';

export default async function deleteDepartment(id) {
  try {
    const res = await axios.get(`/api/admin/delete-department/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
