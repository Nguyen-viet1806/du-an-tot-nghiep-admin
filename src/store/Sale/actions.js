import {
  callApiGetDanhSachSale,
  callApiSaveSale,
  callApiGetDanhSachSaleSort,
  callApiSearch,
  callApiApsSale,
  callApiDeleteProductInSale,
  callApiGetListProductSale,
} from "@/api/sales.js";

const getDanhSachSale = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachSale(payload)
      .then((response) => {
        if (response) {
          context.commit("SET_LIST_SALES", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDanhSachSaleSort = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachSaleSort(payload)
      .then((response) => {
        if (response) {
          context.commit("SET_LIST_SALES", response.data.data);
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
          context.commit("SET_LIST_SALES", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const saveSale = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiSaveSale(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const apsSale = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiApsSale(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteProductInSale = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiDeleteProductInSale(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getListProductSale = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetListProductSale(payload)
      .then((reponse) => {
        resolve(reponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  getDanhSachSale,
  saveSale,
  getDanhSachSaleSort,
  search,
  apsSale,
  deleteProductInSale,
  getListProductSale,
};
