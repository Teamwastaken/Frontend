import axios from "axios";
import config from "../config/config.json";

const apiEndpoint = config.apiUrl + "/api/auth";
export function login(email, password) {
  return axios.post(apiEndpoint, { email, password });
}
