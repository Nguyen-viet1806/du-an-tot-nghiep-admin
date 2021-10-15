import { callApiGetDanhSachVoucher, callApiSaveVoucher } from "@/api/vouchers.js";

const getDanhSachVoucher = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachVoucher(payload)
      .then((response) => {
        if (response) {
          context.commit("SET_LIST_VOUCHERS", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const saveVoucher = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiSaveVoucher(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default {
  getDanhSachVoucher,
  saveVoucher
};
