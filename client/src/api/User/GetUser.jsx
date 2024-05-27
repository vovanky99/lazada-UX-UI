import axios from '~/api/axios';

export default async function GetUser({ ...data }) {
  try {
    const res = await axios.get(`/api/admin/get-user`, { ...data });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
