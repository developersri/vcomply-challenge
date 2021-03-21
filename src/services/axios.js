import axios from 'axios';
  
const instance = axios.create({
  baseURL: 'http://localhost:3001'
});
instance.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.put['Access-Control-Allow-Origin'] = '*';

export default instance;