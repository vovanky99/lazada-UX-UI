import axios from '~/api/axios';

export default async function CheckPhone(type, phone) {
  try {
    const res = await axios.get('/api/check-phone', {
      params: {
        type,
        phone,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
