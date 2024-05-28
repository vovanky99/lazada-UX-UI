import axios from '~/api/axios';

export default async function CreateUser(data) {
  try {
    const res = await axios.post(`/api/admin/create-user`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
