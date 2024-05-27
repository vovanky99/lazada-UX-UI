import axios from '~/api/axios';

export default async function DeleteUser(id) {
  try {
    const res = await axios.get(`/api/delete-user${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
