import axios from 'axios';
axios.defauls.baseURL = 'http://192.168.0.102:8080';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default axios;