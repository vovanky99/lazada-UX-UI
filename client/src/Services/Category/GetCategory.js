import axios from '~/api/axios';

export default async function GetCategory({ value, status, parent_id }) {
  try {
    const res = await axios.get('/api/get-category', {
      params: {
        name: value,
        parent_id: parent_id,
        status: status,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
