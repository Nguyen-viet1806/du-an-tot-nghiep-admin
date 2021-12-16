import ENDPOINT from "@/api/endpoints.js";
import { HTTP } from "@/api/http-common.js";

export function callApiSaveCombo(payload) {
  return HTTP({
    url: ENDPOINT.SAVE_COMBO,
    method: "POST",
    data: payload,
  });
}

export function callApiDeleteCombo(payload) {
  return HTTP({
    url: ENDPOINT.DELETE_COMBO,
    method: "DELETE",
    params: payload,
  });
}

export function callApiGetAllCombo(payload) {
  return HTTP({
    url: ENDPOINT.GET_ALL_COMBO_WITH_PAGE,
    method: "GET",
    params: payload,
  });
}

export function callApiSearch(payload) {
  return HTTP({
    url: ENDPOINT.SEARCH_COMBO,
    method: "GET",
    params: payload,
  });
}


export function callApiGetComboDetailByIdCombo(payload) {
  return HTTP({
    url: ENDPOINT.GET_COMBO_DETAIL_BY_IDCOMBO,
    method: "GET",
    params: payload,
  });
}
