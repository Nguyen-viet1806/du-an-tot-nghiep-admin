import {
  callApiGetDanhSachTinh,
  callApiGetDanhSachQuanHuyen,
  callApiGetDanhSachXa,
  callApiGetDanhSachBill,
  callApiGetDanhSachBillFilter,
  callApiGetDanhSachProductInBill,
  callApiSaveBill,
  callApiGetDanhSachComboInBill,
} from "@/api/bill.js";

const getDanhSachTinh = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachTinh(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDanhSachQuanHuyen = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachQuanHuyen(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDanhSachXa = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachXa(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDanhSachBill = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachBill(payload)
      .then((response) => {
        if(response){
          context.commit("SET_LIST_BILL", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDanhSachBillFilter = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachBillFilter(payload)
      .then((response) => {
        if(response){
          context.commit("SET_LIST_BILL", response.data.data);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDanhSachProductInBill = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachProductInBill(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDanhSachComboInBill = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiGetDanhSachComboInBill(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const saveBill = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiSaveBill(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  getDanhSachTinh,
  getDanhSachQuanHuyen,
  getDanhSachXa,
  getDanhSachBill,
  getDanhSachBillFilter,
  getDanhSachProductInBill,
  saveBill,
  getDanhSachComboInBill,
};
