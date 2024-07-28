import axios from '~/api/axios';

export async function EditData(location, id, { ...data }) {
  try {
    const res = await axios.patch(`/api/admin/edit-${location}/${id}`, { ...data });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
