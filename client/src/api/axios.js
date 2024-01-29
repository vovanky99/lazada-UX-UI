import axios from 'axios';
export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    // 'Access-Control-Request-Headers': 'Content-Type, Authorization',
    // 'X-Requested-With': 'XMLHttpRequest',
  },
});
axios.defaults.withCredentials = true;
// http.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!'),
// );
// export default http;
