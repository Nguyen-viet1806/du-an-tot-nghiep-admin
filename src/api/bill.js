import ENDPOINT from "@/api/endpoints.js";
import { HTTP } from "@/api/http-common.js";

export function callApiGetDanhSachTinh() {
  return HTTP({
    url: ENDPOINT.GET_LIST_TINH,
    method: "GET",
  });
}

export function callApiGetDanhSachQuanHuyen(payload) {
  return HTTP({
    url: ENDPOINT.GET_LIST_QUAN_HUYEN,
    method: "GET",
    params: payload
  });
}

export function callApiGetDanhSachXa(payload) {
  return HTTP({
    url: ENDPOINT.GET_LIST_XA,
    method: "GET",
    params: payload
  });
}

export function callApiGetDanhSachBill(payload) {
  return HTTP({
    url: ENDPOINT.GET_LIST_BILL,
    method: "GET",
    params: payload
  });
}

export function callApiGetDanhSachBillFilter(payload) {
  return HTTP({
    url: ENDPOINT.GET_LIST_BILL_FILTER,
    method: "GET",
    params: payload
  });
}

export function callApiGetDanhSachProductInBill(payload) {
  return HTTP({
    url: ENDPOINT.GET_LIST_PRODUCT_IN_BILL,
    method: "GET",
    params: payload
  });
}

export function callApiSaveBill(payload) {
  return HTTP({
    url: ENDPOINT.SAVE_BILL,
    method: "POST",
    data: payload
  });
}
