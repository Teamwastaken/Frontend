import http from "./httpService";
import config from "../config/config.json";

export function getCustomers() {
  return http.get(config.apiUrl + "/api/customer");
}
