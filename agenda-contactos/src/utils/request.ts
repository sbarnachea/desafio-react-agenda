import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response || error.message),
);

interface Options {
  method: string;
  url: string;
  data?: any;
  params?: object;
  headers?: object;
}

const request = async (options: Options) => {
  const config: AxiosRequestConfig = {
    method: options.method,
    url: `/api/${options.url}`,
    data: options.data,
    params: options.params,
    headers: options.headers,
  };

  const onSuccess = (response: any) => response;

  const onError = (error: any) => {
    console.error('Error:', error?.status, error?.config?.url);
    return Promise.reject(error?.data || error?.message || 'Error desconocido');
  };

  return client(config).then(onSuccess).catch(onError);
};

export default request;
