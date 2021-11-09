import ENDPOINT from "@/api/endpoints.js";
import { HTTP } from "@/api/http-common.js";

export function callApiSaveProduct(payload) {
  return HTTP({
    url: ENDPOINT.SAVE_PRODUCT,
    method: "POST",
    data: payload,
  });
}
export function callApiGetListProduct(payload) {
  return HTTP({
    url: ENDPOINT.GET_LIST_PRODUCT,
    method: "GET",
    params: payload,
  });
}

export function callApiGetListProductChild(payload) {
  return HTTP({
    url: ENDPOINT.GET_LIST_PRODUCT_CHILD,
    method: "GET",
    params: payload,
  });
}

export function callApiShowProduct(payload) {
  return HTTP({
    url: ENDPOINT.SHOW_PRODUCT,
    method: "GET",
    params: payload,
  });
}

export function callApiDeleteProductParent(payload) {
  return HTTP({
    url: ENDPOINT.DELETE_PRODUCT_PARENT,
    method: "DELETE",
    params: payload,
  });
}

export function callApiDeleteProductChild(payload) {
  return HTTP({
    url: ENDPOINT.DELETE_PRODUCT_CHILD,
    method: "DELETE",
    params: payload,
  });
}
