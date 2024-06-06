import axios from '~/api/axios';

export async function ShowData(prefixServer = '', name, id) {
  try {
    const res = await axios.get(`/api${prefixServer ? '/' + prefixServer : ''}/show-${name}/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function CreateData(prefixServer = '', name, data) {
  try {
    const res = await axios.post(`/api${prefixServer ? '/' + prefixServer : ''}/create-${name}`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function GetData(prefixServer = '', name, data) {
  try {
    const res = await axios.get(`/api${prefixServer ? '/' + prefixServer : ''}/get-${name}`, {
      params: {
        ...data,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function DeleteData(prefixServer = '', name, id) {
  try {
    const res = await axios.delete(`/api${prefixServer ? '/' + prefixServer : ''}/delete-${name}/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function EditData(prefixServer = '', name, id, { ...data }) {
  try {
    const res = await axios.patch(`/api${prefixServer ? '/' + prefixServer : ''}/edit-${name}/${id}`, {
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

export async function ChangePass(prefixServer, data) {
  try {
    const res = await axios.post(`/api${prefixServer ? '/' + prefixServer : ''}/change-password`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function RequestPhone(data) {
  try {
    const res = await axios.post(`/api/admin/password/phone-number`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function ResetPassword(prefixServer, data) {
  try {
    const res = await axios.post(`/api${prefixServer ? '/' + prefixServer : ''}/password/reset-password`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
