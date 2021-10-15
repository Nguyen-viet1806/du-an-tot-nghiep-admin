import ENDPOINT from "@/api/endpoints.js";
import {HTTP} from "@/api/http-common.js";

export function callApiGetDanhSachSize(payload) {
    return HTTP({
      url: ENDPOINT.GET_ALL_SIZE,
      method: "GET",
      params: payload,
    });
}

export function callApiSaveSize(payload) {
  return HTTP({
    url: ENDPOINT.SAVE_SIZE,
    method: "POST",
    data: payload,
  });
}
