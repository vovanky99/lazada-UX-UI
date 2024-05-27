import axios from '~/api/axios';

export default async function GetUser(prefixServer = '', { ...data }) {
  try {
    const res = await axios.get(`/api${prefixServer ? '/' + prefixServer : ''}/get-user`, ...data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
