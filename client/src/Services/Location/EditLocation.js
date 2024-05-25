import axios from '~/api/axios';

export default async function EditLocation(location, id, { ...data }) {
  try {
    const res = await axios.patch(`/api/admin/edit-${location}/${id}`, { ...data });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
