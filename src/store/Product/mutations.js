const SET_LIST_PRODUCTS_PARENT = (state, listProductsParent) => {
    state.listProductsParent = listProductsParent;
} 

const SET_LIST_PRODUCTS_CHILD = (state, listProductsChild) => {
    state.listProductsChild = listProductsChild;
} 

export default {
    SET_LIST_PRODUCTS_PARENT,
    SET_LIST_PRODUCTS_CHILD,
  };