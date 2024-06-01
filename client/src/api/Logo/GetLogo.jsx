import axios from '~/api/axios';

export default async function GetLogo() {
  try {
    const res = await axios.get('/api/admin/get-logo');
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function Logo(type) {
  try {
    const res = await axios.get(`/api/get-web-logo`, {
      params: {
        type,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
