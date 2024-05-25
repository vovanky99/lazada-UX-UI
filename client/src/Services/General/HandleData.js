import axios from '~/api/axios';

export async function ShowData(prefixServer = '', type, id) {
  try {
    const res = await axios.get(`/api${prefixServer ? '/' + prefixServer : ''}/show-${type}/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function EditData(prefixServer = '', type, id, { ...data }) {
  try {
    const res = await axios.patch(`/api${prefixServer ? '/' + prefixServer : ''}/edit-${type}/${id}`, {
      ...data,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
