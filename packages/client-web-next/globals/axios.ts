import axios from 'axios';
import { SUCCESS_STATUS_CODE, ERROR_STATUS_CODE } from './globals.contants';
import * as HttpStatus from './http.contants';

const baseURL =
  typeof window !== 'undefined' ? '/api/v1' : 'http://127.0.0.1:8083/api/v1';
const instance = axios.create({
  baseURL,
});
instance.defaults.timeout = 5000;

instance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.retcode === SUCCESS_STATUS_CODE) {
      return response.data.data;
    } else if (response.data && response.data.retcode === ERROR_STATUS_CODE) {
      if (response.data.data.status === HttpStatus.UNAUTHORIZED) {
        // navigateTo({
        //   path: "/login",
        // });
        // if (!process.server) {
        //   const router = useRouter();
        //   router.push("/login");
        // }
        // if (process.server) {
        //   return false
        // } else {
        //   navigateTo({
        //     path: '/login'
        //   })
        // }
        // console.log("HttpStatus===", HttpStatus.UNAUTHORIZED);
        return response.data.data;
      }
      return response.data;
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
