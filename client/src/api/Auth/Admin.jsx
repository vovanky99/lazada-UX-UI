import axios from '../axios';

export async function LoginAdmin(data) {
  try {
    axios.get('/sanctum/csrf-cookie');
    const res = await axios.post('/api/admin/admin-login', data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
