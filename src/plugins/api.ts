import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import Package from "../../package.json";
import { getUserToken } from "@/store/feature/user.slice";
import { i18n } from "../../next-i18next.config";

/**
 * Instance of axios
 * @date 4/4/2023 - 3:10:56 PM
 *
 * @export
 * @returns {AxiosInstance}
 */

export default function api(): AxiosInstance {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      common: {
        Accept: "application/json",
      },
    },
  });

  /**
   * Intercept the request and setup the headers properties
   * @date 4/4/2023 - 3:08:24 PM
   *
   * @async
   * @param {InternalAxiosRequestConfig} config
   * @returns {Promise<InternalAxiosRequestConfig<any>>}
   */

  const requestHandler = async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig<any>> => {
    // Adding firebase token
    const token = await getUserToken();
    config.headers["authorization"] = token;
    config.headers["app-name"] = Package.name;
    config.headers["app-domain"] = window.location.hostname;
    config.headers["Accept-Language"] = i18n.defaultLocale;
    return config;
  };

  /**
   * Handle error while intercepting the request.
   * The type is kept as any as defined in the library.
   * @date 4/4/2023 - 3:07:03 PM
   *
   * @param {any} error
   * @returns {Promise<never>}
   */

  const errorHandler = (error: any): Promise<never> => {
    const { data } = error.response;
    const output = {
      ...data,
      statusCode: error.response.status,
    };
    return Promise.reject(output);
  };

  api.interceptors.request.use(requestHandler, errorHandler);
  return api;
}
