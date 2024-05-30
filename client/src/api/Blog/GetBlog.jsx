import axios from '../axios';

export default async function GetBlog(data) {
  try {
    const res = await axios.get('api/admin/get-blogs', {
      params: {
        ...data,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
