import axios, { AxiosRequestConfig } from "axios";
import { ERROR_STATUS_CODE, SUCCESS_STATUS_CODE } from "./globals.contants";
import * as HttpStatus from "./http.contants";
import { TOKEN_KEY } from "./globals.contants";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const ajaxInstance = axios.create({
  baseURL: "http://localhost:3003/api/v1",
});

console.log(
  'Cookies.get("token")',
  process.env.TOKEN ||
    Cookies.get("token") ||
    localStorage.getItem(TOKEN_KEY) ||
    ""
);
setToken(
  process.env.TOKEN ||
    Cookies.get("token") ||
    localStorage.getItem(TOKEN_KEY) ||
    ""
);

ajaxInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ajaxInstance.interceptors.response.use(
  (response) => {
    console.log("response=============", response.data);
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
  }
);

export function useAjaxInstance() {
  return ajaxInstance;
}

export function setToken(token: string) {
  ajaxInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function authorization(config?: AxiosRequestConfig) {
  return Object.assign(
    {},
    {
      headers: {
        Authorization: `Bearer `,
      },
    },
    config || {}
  );
}

export function ajaxGet<D>(url: string, config: AxiosRequestConfig = {}) {
  return ajaxInstance.get<any, D>(url, authorization(config));
}

export function ajaxPost<D>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
) {
  console.log("data", data);
  return ajaxInstance.post<any, D>(url, data, authorization(config));
}
//
export function ajaxPut<D>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
) {
  return ajaxInstance.put<any, D>(url, data, authorization(config));
}

export function ajaxPatch(url: string, data: any, config?: AxiosRequestConfig) {
  return ajaxInstance.patch(url, data, authorization(config));
}

export function ajaxDelete(url: string, config?: AxiosRequestConfig) {
  return ajaxInstance.delete(url, authorization(config));
}

export default ajaxInstance;
