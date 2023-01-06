import http from "./httpService";
import config from "../config/config.json";

export function getCustomers(searchQuery, checkedIn) {
  let url = config.apiUrl + `/api/customer?name=${searchQuery}`;
  if (checkedIn === true || checkedIn === false)
    url =
      config.apiUrl +
      `/api/customer?name=${searchQuery}&&checkedIn=${checkedIn}`;
  return http.get(url);
}
