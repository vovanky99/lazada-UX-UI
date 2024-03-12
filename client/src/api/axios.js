import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json',
  //   // 'Access-Control-Request-Headers': 'Content-Type, Authorization',
  // Authorization: `Bearer ${localStorage.getItem('token')}`,
  'X-Requested-With': 'XMLHttpRequest',
  // },
});
axios.defaults.withCredentials = true;

// export default axios;

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!'),
// );
