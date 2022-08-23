import axios from "axios";
import config from "../config/config.json";

const apiEndpoint = config.apiUrl + "/api/user";
export function register(name, email, password) {
  return axios.post(apiEndpoint, { name, email, password });
}
