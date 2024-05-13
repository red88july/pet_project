import axios from 'axios';
import { apiURL } from './constants.url.ts';

const axiosApi = axios.create({
  baseURL: apiURL,
});

export default axiosApi;