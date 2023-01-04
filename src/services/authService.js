import http from "./httpService";
import config from "../config/config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiUrl + "/api/auth";
const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
  localStorage.setItem("logedIn", true);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.setItem("logedIn", false);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default { login, loginWithJwt, logout, getCurrentUser, getJwt };
