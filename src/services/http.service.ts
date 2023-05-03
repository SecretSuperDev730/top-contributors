import axios, {AxiosRequestConfig, Method} from "axios";

import {GITHUB_API_TOKEN} from "@/constant/env";

const http = axios.create({
  baseURL: 'https://api.github.com',
});

http.interceptors.request.use((req) => {
  req.headers.set('Authorization', `Bearer ${GITHUB_API_TOKEN}`);
  return req;
});

http.interceptors.response.use((res) => res.data);

export default class HttpService {
  static get(url: string, queries: any = {}, config?: AxiosRequestConfig) {
    return HttpService.request('GET', url, { params: queries, ...config });
  }

  static post(url: string, data: any = {}, config?: AxiosRequestConfig) {
    return HttpService.request('POST', url, { data, ...config });
  }

  static put(url: string, data: any = {}, config?: AxiosRequestConfig) {
    return HttpService.request('PUT', url, { data, ...config });
  }

  static patch(url: string, data: any = {}, config?: AxiosRequestConfig) {
    return HttpService.request('PATCH', url, { data, ...config });
  }

  static delete(url: string, data: any = {}, config?: AxiosRequestConfig) {
    return HttpService.request('DELETE', url, { data, ...config });
  }

  static request(method: Method, url: string, data?: AxiosRequestConfig): Promise<any> {
    return http.request({
      method,
      url,
      ...data,
    });
  }
}
