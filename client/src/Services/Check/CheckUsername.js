import axios from '~/api/axios';

export default async function CheckUsername(type, username) {
  try {
    const res = await axios.get('/api/check-username', {
      params: {
        type,
        username,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
