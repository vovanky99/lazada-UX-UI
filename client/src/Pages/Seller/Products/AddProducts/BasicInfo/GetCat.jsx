import axios from '~/api/axios';

export default async function GetCat(search) {
  try {
    const res = await axios.get(`api/seller/get-cat`, {
      params: {
        search,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
