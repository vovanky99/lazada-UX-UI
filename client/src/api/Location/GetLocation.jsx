import axios from '~/api/axios';

export default async function GetLocation(location, searchValue, foreignID) {
  try {
    const res = await axios.get(`/api/get-${location}`, {
      params: {
        name: searchValue,
        foreign_id: foreignID,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function GetAllLocation(data) {
  try {
    const res = await axios.get('/api/all-location', {
      params: {
        ...data,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function ShowLocation(type, id) {
  try {
    const res = await axios.get('/api/show-location', {
      params: {
        type,
        id,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
