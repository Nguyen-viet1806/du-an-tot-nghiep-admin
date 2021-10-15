import { callApiGetDanhSachSize, callApiSaveSize } from "@/api/sizes.js";

const getDanhSachSize = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachSize(payload)
      .then((response) => {
        if (response) {
          context.commit("SET_LIST_SIZES", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const saveSize = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiSaveSize(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default {
  getDanhSachSize,
  saveSize
};
