import ENDPOINT from "@/api/endpoints.js";
import {HTTP} from "@/api/http-common.js";

export function callApiGetDanhSachSale(payload) {
    return HTTP({
      url: ENDPOINT.GET_ALL_SALE,
      method: "GET",
      params: payload,
    });
}

export function callApiGetDanhSachSaleSort(payload) {
  return HTTP({
    url: ENDPOINT.GET_LIST_SALE_SORT,
    method: "GET",
    params: payload,
  });
}

export function callApiSearch(payload) {
  return HTTP({
    url: ENDPOINT.SEARCH_SALE,
    method: "GET",
    params: payload,
  });
}

export function callApiSaveSale(payload) {
  return HTTP({
    url: ENDPOINT.APS_SALE,
    method: "POST",
    data: payload,
  });
}

export function callApiApsSale(payload) {
  return HTTP({
    url: ENDPOINT.APS_SALE,
    method: "POST",
    data: payload,
  });
}

export function callApiDeleteProductInSale(payload) {
  return HTTP({
    url: ENDPOINT.DELETE_PRODUCT_IN_SALE,
    method: "POST",
    data: payload,
  });
}

export function callApiGetListProductSale(payload) {
  return HTTP({
    url: ENDPOINT.GET_LIST_PRODUCT_SALE,
    method: "GET",
    params: payload,
  });
}
