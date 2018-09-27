import axios from 'axios';
import { CONF, ACCESS_TOKEN } from './Config';

const instance = axios.create({
    baseURL: CONF.CarrotApiEnpoint,
    timeout: 1000,
    auth: {
        username: 'cakpep',
        password: 'dev'
    },
    headers: { 'Content-Type': 'application/json' }
});
if (localStorage.getItem(ACCESS_TOKEN)) {
    console.log("this is " + ACCESS_TOKEN + " : " + localStorage.getItem(ACCESS_TOKEN));
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
}
export default instance;
