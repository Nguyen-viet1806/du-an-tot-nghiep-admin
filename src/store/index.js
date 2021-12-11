import sizeModule from "@/store/Size";
import colorModule from "@/store/Color";
import saleModule from "@/store/Sale";
import voucherModule from "@/store/Voucher";
import categoryModule from "@/store/Category";
import productModule from "@/store/Product";
import billModule from "@/store/Bill";
import loginRegisterModule from "@/store/LoginRegister";
import comboModule from "@/store/Combo";
import { createStore } from "vuex";
export default new createStore({
  modules: {
    sizeModule,
    colorModule,
    saleModule,
    voucherModule,
    categoryModule,
    productModule,
    billModule,
    loginRegisterModule,
    comboModule,
  },
  state: {},
  getters: {},
  mutations: {},
});
