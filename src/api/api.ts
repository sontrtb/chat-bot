import axios, {
  type AxiosResponse,
  type AxiosError,
  type AxiosRequestConfig,
} from "axios";
import { store } from "../redux/store";
import { toast } from 'react-toastify';

export enum EStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export interface IDataResponse<T = unknown> {
  code: EStatus;
  message?: string;
  result: T;
  statusCode?: string;
  body?: string
}

interface IRootApiOptions {
  withToken?: boolean; // có cần token trong header hay không
  displayError?: boolean; // hiển thị thông báo lỗi
}

async function rootApi<T = undefined>(
  config: AxiosRequestConfig,
  options?: IRootApiOptions,
): Promise<T> {
  const defaultOptions = {
    withToken: true,
    displayError: true,
    ...options,
  };

  const apiClient = axios.create({
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
  });

  
  if (defaultOptions.withToken) {
    const state = store.getState();
    apiClient.defaults.headers.common.Authorization = `Bearer ${state.user.user?.token}`;
  }

  return await new Promise((resolve, rejects) => {
    apiClient
      .request(config)
      .then((res: AxiosResponse<IDataResponse<T>>): void => {
        if(res.data.statusCode === "BAD_REQUEST") {
          if(defaultOptions?.displayError) {
            toast.error(res?.data?.body ?? "Có lỗi xảy ra")
          }
          rejects(res.data);
        }
        resolve(res.data.result)
      })
      .catch((err: AxiosError<IDataResponse<T>>) => {
        if(defaultOptions?.displayError) {
          toast.error(err.response?.data?.message ?? "Có lỗi xảy ra")
        }
        rejects(err.response?.data);
      });
  });
}

export default rootApi;
