import {
  callApiSaveCombo,
  callApiDeleteCombo,
  callApiGetAllCombo,
  callApiSearch,
  callApiGetComboDetailByIdCombo,
} from "@/api/combo.js";


const getAllCombo = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetAllCombo(payload)
      .then((response) => {
        if (response) {
          context.commit("SET_LIST_COMBO", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const search = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiSearch(payload)
      .then((response) => {
        if (response) {
          context.commit("SET_LIST_COMBO", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const saveCombo = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiSaveCombo(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteCombo = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiDeleteCombo(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getComboDetailByIdCombo = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetComboDetailByIdCombo(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  saveCombo,
  search,
  deleteCombo,
  getAllCombo,
  getComboDetailByIdCombo,
};
