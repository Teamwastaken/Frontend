import http from "./httpService";
import config from "../config/config.json";

const apiEndpoint = config.apiUrl + "/api/user";
export function register(name, email, password) {
  return http.post(apiEndpoint, { name, email, password });
}

export default register;
