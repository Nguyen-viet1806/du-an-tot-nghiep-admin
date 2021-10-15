import {
  callApiGetDanhSachCategoryParent,
  callApiSaveCategoryParent,
  callApiGetDanhSachCategoryChild,
  callApiSaveCategoryChild,
} from "@/api/category.js";

const getDanhSachCategoryParent = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachCategoryParent(payload)
      .then((response) => {
        if (response) {
          context.commit("SET_LIST_CATEGORYS_PARENT", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const saveCategoryParent = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiSaveCategoryParent(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDanhSachCategoryChild = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachCategoryChild(payload)
      .then((response) => {
        if (response) {
          context.commit("SET_LIST_CATEGORYS_CHILD", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const saveCategoryChild = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiSaveCategoryChild(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  getDanhSachCategoryParent,
  saveCategoryParent,
  getDanhSachCategoryChild,
  saveCategoryChild,
};
