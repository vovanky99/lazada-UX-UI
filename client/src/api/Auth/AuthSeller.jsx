import axios from '../axios';

export async function RegisterSeller(data) {
  try {
    const res = await axios.post('/api/seller/register', data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function ResendEmailSeller() {
  try {
    const res = await axios.post('/api/seller/email/verification-notification');
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function LoginSeller(data) {
  try {
    const res = await axios.post('/api/seller/login', data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function resetPasswordSeller(data) {
  try {
    const res = await axios.post('/api/seller/login', data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
