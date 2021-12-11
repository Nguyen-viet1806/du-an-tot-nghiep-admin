const getListBill = (state) => state.listBill.filter(item => item.billType == 0);
const getListBillByBillType = (state) => state.listBill.filter(item => item.billType == 1);
export default {
  getListBill,
  getListBillByBillType,
};
