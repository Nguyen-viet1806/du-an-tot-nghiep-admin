import { callApiGetDanhSachColor, callApiSaveColor } from "@/api/colors.js";

const getDanhSachColor = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachColor(payload)
      .then((response) => {
        if (response) {
          context.commit("SET_LIST_COLORS", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const saveColor = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiSaveColor(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  getDanhSachColor,
  saveColor,
};
