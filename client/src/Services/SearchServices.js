import axios from '~/api/axios';

export const search = async (q) => {
  try {
    const res = await axios.get(`/api/search/header`, {
      params: {
        q,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
