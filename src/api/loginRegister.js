import ENDPOINT from "@/api/endpoints.js";
import { HTTP } from "@/api/http-common.js";


export function callApiLogout(payload) {
  return HTTP({
    url: ENDPOINT.LOGOUT,
    method: "POST",
    data: payload,
  });
}

export function callApiLogin(payload) {
  return HTTP({
    url: ENDPOINT.LOGIN,
    method: "POST",
    params: payload,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
}

