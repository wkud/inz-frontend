import axios from 'axios';

const inzApi = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: localStorage.getItem('token')
      ? { Authorization: 'JWT ' + localStorage.getItem('token') }
      : {},
  });

export default inzApi;
