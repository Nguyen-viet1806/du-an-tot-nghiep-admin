import ENDPOINT from "@/api/endpoints.js";
import {HTTP} from "@/api/http-common.js";

export function callApiGetDanhSachVoucher(payload) {
    return HTTP({
      url: ENDPOINT.GET_ALL_VOUCHER,
      method: "GET",
      params: payload,
    });
}

export function callApiSaveVoucher(payload) {
  return HTTP({
    url: ENDPOINT.SAVE_VOUCHER,
    method: "POST",
    data: payload,
  });
}
