import axios from '~/api/axios';

export default async function DeleteLocation(location, id) {
  try {
    const res = await axios.delete(`/api/delete-${location}/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function DeleteSingleLocation(value, id) {
  try {
    const res = await axios.delete(`/api/delete-location/${value}/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
