import sizeModule from "@/store/Size";
import colorModule from "@/store/Color";
import saleModule from "@/store/Sale";
import voucherModule from "@/store/Voucher";
import categoryModule from "@/store/Category";
import {createStore} from "vuex";
export default new createStore({
  modules: {
    sizeModule,
    colorModule,
    saleModule,
    voucherModule,
    categoryModule
  },
  state: {
   
  },
  getters: {},
  mutations: {},
});
