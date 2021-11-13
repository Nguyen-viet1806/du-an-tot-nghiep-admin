export default {

  //upload file 
  UPLOAD_FILE: "/api/webtpf/upload/image",

  //size
  GET_ALL_SIZE: "/api/webtpf/admin/sizes/getall/",
  GET_SIZE_BY_ID: "/api/webtpf/admin/sizes/findbyid/",
  SAVE_SIZE: "/api/webtpf/admin/sizes/save/",
  DELETE_SIZE: "/api/webtpf/admin/sizes/delete/",
  SEARCH_SIZE: "/api/webtpf/admin/sizes/search/",
  FILTER_SIZE: "/api/webtpf/admin/sizes/findbystatus/",
  GET_LIST_SIZE_SORT: "/api/webtpf/admin/sizes/getallsort",
  GET_LIST_SIZE_EXIST_BY_CATEGORY: "/api/webtpf/admin/sizes/findbyidcategory/",
  //color
  GET_ALL_COLOR: "/api/webtpf/admin/colors/getall/",
  GET_COLOR_BY_ID: "/api/webtpf/admin/colors/findbyid/",
  SAVE_COLOR: "/api/webtpf/admin/colors/save/",
  DELETE_COLOR: "/api/webtpf/admin/colors/delete/",
  SEARCH_COLOR: "/api/webtpf/admin/colors/search/",
  FILTER_COLOR: "/api/webtpf/admin/colors/findbystatus/",
  GET_LIST_COLOR_SORT: "/api/webtpf/admin/colors/getallsort",
  GET_LIST_COLOR_EXISTS:"/api/webtpf/admin/colors/findexists",

  //Sale
  GET_ALL_SALE: "/api/webtpf/admin/sales/getall/",
  GET_SALE_BY_ID: "/api/webtpf/admin/sales/findbyid/",
  SAVE_SALE: "/api/webtpf/admin/sales/save/",
  DELETE_SALE: "/api/webtpf/admin/sales/delete/",
  SEARCH_SALE: "/api/webtpf/admin/sales/search/",
  FILTER_SALE: "/api/webtpf/admin/sales/findbystatus/",
  GET_LIST_SALE_SORT: "/api/webtpf/admin/sales/getallsort",

  //Voucher
  GET_ALL_VOUCHER: "/api/webtpf/admin/vouchers/getall/",
  GET_VOUCHER_BY_ID: "/api/webtpf/admin/vouchers/findbyid/",
  SAVE_VOUCHER: "/api/webtpf/admin/vouchers/save/",
  DELETE_VOUCHER: "/api/webtpf/admin/vouchers/delete/",
  SEARCH_VOUCHER: "/api/webtpf/admin/vouchers/search/",
  FILTER_VOUCHER: "/api/webtpf/admin/vouchers/findbystatus/",
  GET_LIST_VOUCHER_SORT: "/api/webtpf/admin/vouchers/getallsort",

  //CategoryParent
  GET_ALL_CATEGORY_PARENT: "/api/webtpf/admin/categories/parent/getall/",
  GET_CATEGORY_PARENT_BY_ID: "/api/webtpf/admin/categories/parent/findbyid/",
  SAVE_CATEGORY_PARENT: "/api/webtpf/admin/categories/parent/save/",
  DELETE_CATEGORY_PARENT: "/api/webtpf/admin/categories/parent/delete/",
  SEARCH_CATEGORY_PARENT: "/api/webtpf/admin/categories/parent/search/",
  FILTER_CATEGORY_PARENT: "/api/webtpf/admin/categories/parent/findbystatus/",
  GET_LIST_CATEGORY_PARENT_SORT: "/api/webtpf/admin/categories/parent/getallsort",
  GET_CATEGORY_EXISTS: "/api/webtpf/admin/categories/getexists",
  
  //CategoryChild
  GET_ALL_CATEGORY_CHILD: "/api/webtpf/admin/categories/child/getall/",
  GET_CATEGORY_CHILD_BY_ID: "/api/webtpf/admin/categories/child/findbyid/",
  SAVE_CATEGORY_CHILD: "/api/webtpf/admin/categories/child/save/",
  DELETE_CATEGORY_CHILD: "/api/webtpf/admin/categories/child/delete/",
  SEARCH_CATEGORY_CHILD: "/api/webtpf/admin/categories/child/search/",
  FILTER_CATEGORY_CHILD: "/api/webtpf/admin/categories/child/findbystatus/",
  GET_LIST_CATEGORY_CHILD_SORT: "/api/webtpf/admin/categories/child/getallsort",
  GET_LIST_CATEGORY_CHILD_EXISTS_BY_PARENT: "/api/webtpf/admin/categories/child/findbyparent/",

  //product
  SAVE_PRODUCT:  "/api/webtpf/admin/products/save",
  GET_LIST_PRODUCT: "/api/webtpf/admin/products/getlistparent/",
  GET_LIST_PRODUCT_CHILD: "/api/webtpf/admin/products/getlistchild",
  SHOW_PRODUCT: "/api/webtpf/admin/products/show",
  DELETE_PRODUCT_PARENT: "/api/webtpf/admin/products/deleteparent",
  DELETE_PRODUCT_CHILD: "/api/webtpf/admin/products/deletechild",
  SEARCH_PRODUCT_PARENT: "/api/webtpf/admin/products/search",

  //bill
  GET_LIST_TINH: "/api/webtpf/getallprovince",
  GET_LIST_QUAN_HUYEN: "/api/webtpf/getalldistrict",
  GET_LIST_XA: "/api/webtpf/getallcommune",
};
