import ENDPOINT from "@/api/endpoints.js";
import {HTTP} from "@/api/http-common.js";

export function callApiGetDanhSachSale(payload) {
    return HTTP({
      url: ENDPOINT.GET_ALL_SALE,
      method: "GET",
      params: payload,
    });
}

export function callApiSaveSale(payload) {
  return HTTP({
    url: ENDPOINT.SAVE_SALE,
    method: "POST",
    data: payload,
  });
}
