import {
  callApiSaveProduct,
  callApiDeleteProductParent,
  callApiDeleteProductChild,
  callApiGetListProduct,
  callApiGetListProductChild,
  callApiShowProduct,
  callApiSearch
} from "@/api/product.js";
import { callApiUploadFile } from "@/api/common.js";

const uploadFile = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiUploadFile(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getListProduct = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetListProduct(payload)
      .then((response) => {
        if (response) {
          context.commit("SET_LIST_PRODUCTS_PARENT", response.data.data);
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
          context.commit("SET_LIST_PRODUCTS_PARENT", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getListProductChild = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetListProductChild(payload)
      .then((response) => {
        if (response) {
          context.commit("SET_LIST_PRODUCTS_CHILD", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


const showProduct = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiShowProduct(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const saveProduct = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiSaveProduct(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteProductParent = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiDeleteProductParent(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteProductChild = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiDeleteProductChild(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default {
  saveProduct,
  uploadFile,
  getListProduct,
  getListProductChild,
  showProduct,
  deleteProductParent,
  deleteProductChild,
  search,
};
