import axios from '../axios';

export default async function DeleteBlog(id) {
  try {
    const res = await axios.post(`api/admin/delete-blogs/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
