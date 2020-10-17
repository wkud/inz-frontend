import axios from 'axios';

const config = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: localStorage.getItem('token')
    ? { Authorization: 'JWT ' + localStorage.getItem('token') }
    : {},
};
const inzApi = () => axios.create(config);

export default inzApi;
