import axios from '~/api/axios';

export async function ShowData(prefixServer = '', type, id) {
  try {
    const res = await axios.get(`/api${prefixServer ? '/' + prefixServer : ''}/show-${type}/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function CreateData(prefixServer = '', type, data) {
  try {
    const res = await axios.post(`/api${prefixServer ? '/' + prefixServer : ''}/create-${type}`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function GetData(prefixServer = '', type, data) {
  try {
    const res = await axios.get(`/api${prefixServer ? '/' + prefixServer : ''}/get-${type}`, {
      params: {
        ...data,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function DeleteData(prefixServer = '', type, id) {
  try {
    const res = await axios.delete(`/api${prefixServer ? '/' + prefixServer : ''}/delete-${type}/${id}`);
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

export async function UpdateProfile(prefixServer = '', { data }) {
  try {
    const res = await axios.post(`/api${prefixServer ? '/' + prefixServer : ''}/update-profile`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function TodoListData({ prefixServer, type, name, id }) {
  try {
    const res = await axios.get(`/api${prefixServer ? '/' + prefixServer : ''}/todo-list-${type}`, {
      params: {
        name: name,
        id: id,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
