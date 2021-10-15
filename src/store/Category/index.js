import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  listCategoryParent: [],
  listCategoryChild: [],
  categoryParent: null,
};
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
