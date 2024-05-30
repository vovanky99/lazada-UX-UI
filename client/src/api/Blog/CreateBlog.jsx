import axios from '../axios';

export default async function CreateBlog(data) {
  try {
    const res = await axios.post('api/admin/create-blogs', data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
