import axios from '~/api/axios';

export default async function CheckEmail(type, email) {
  try {
    const res = await axios.get('/api/check-email', {
      params: {
        type,
        email,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
