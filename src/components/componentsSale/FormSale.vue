<template>
  <div class="form-tpf">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <form>
            <div class="form-group" v-show="false">
              <label>Id sale:</label>
              <input
                style="cursor: no-drop"
                class="form-control"
                disabled
                v-model="sale.idSale"
              />
            </div>
            <div class="form-group">
              <label>Tên sale:</label>
              <input
                type="text"
                class="form-control"
                :class="{ active: isErrNameSale }"
                v-model="sale.nameSale"
              />
            </div>
            <div class="form-group">
              <label>Ngày bắt đầu:</label>
              <input
                type="date"
                class="form-control"
                v-model="sale.dateStart"
              />
            </div>
            <div class="form-group">
              <label>Ngày kết thúc:</label>
              <input type="date" class="form-control" v-model="sale.dateEnd" />
            </div>

            <div class="form-group">
              <label>Discount:</label>
              <input
                type="number"
                class="form-control"
                :class="{ active: isErrDiscount }"
                v-model="sale.discount"
                min="1"
                max="100"
              />
            </div>

            <div class="form-group">
              <label>Mô tả:</label>
              <input
                type="text"
                class="form-control"
                v-model="sale.descriptionSale"
              />
            </div>
            <div class="control">
              <button type="button" class="btn btn-save" v-on:click="saveSale">
                Lưu
              </button>
              <button
                v-on:click="resetForm"
                type="button"
                class="btn btn-reset"
              >
                Làm tươi
              </button>
            </div>
          </form>
        </div>
        <div class="col-8">
          <h5>Sản phẩm được sale:</h5>
          <div @click="showProductInSale" class="btn btn-save">
            Thêm sản phẩm
          </div>
          <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table class="table table-hover mt-4">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col"></th>
                  <th scope="col">Tên</th>
                  <th scope="col">Size,Màu</th>
                  <th scope="col">Hàng còn</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in listProductDetailTemp.productDetailSaleResponseDTOS" :key="product">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    <img
                      width="80"
                      :src="DO_MAIN + product.detailPhoto"
                    />
                  </td>
                  <td>{{ product.nameProduct }}</td>
                  <td>
                    {{
                      product.size.nameSize +
                      ", " +
                      product.color.nameColor
                    }}
                  </td>
                  <td>
                    {{ product.quantity }}
                  </td>
                  <td>{{ product.price }}</td>
                   <td><div @click="deleteProduct(index)" class="btn btn-danger" >Xóa</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="notify">
          <div
            id="popup1"
            v-if="isShowNotify"
            class="overlay"
            @click="closeNotify"
          ></div>
          <transition name="bounce">
            <div id="popup1" v-if="isShowNotify" class="popup">
              <h2>Thông báo:</h2>
              <a class="close" href="#" @click="closeNotify">&times;</a>
              <div class="content">
                {{ infoNotify }}
              </div>
            </div>
          </transition>
        </div>
        <div class="notifyv">
          <div
            id="popupv"
            v-if="isShowNotifyV"
            class="overlayv"
            @click="closeNotifyV"
          ></div>
          <transition name="bounce">
            <div id="popupv" v-if="isShowNotifyV" class="popupv">
              <a class="closev" href="#" @click="closeNotifyV">&times;</a>
              <div class="contentv">
                <table-product-sale
                  ref="TableProductSale"
                  @getListFollowPage="getListProduct"
                  @addProduct="addProductInSale"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableProductSale from "@/components/componentsSale/TableProductSale.vue";
import { GIA_TRI_TRANG_THAI, DO_MAIN } from "@/constants/constants";
export default {
  name: "FormSale",
  components: { TableProductSale },
  props: {
    listSales: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      DO_MAIN,
      isShowNotify: false,
      isShowNotifyV: false,
      isErrNameSale: false,
      isErrDiscount: false,
      checkFormValidate: false,
      infoNotify: "",
      listProductDetailTemp: {
        saleDTO: {
          idSale: null,
          nameSale: null,
          discount: null,
          idStatus: null,
          descriptionSale: null,
        },
        productDetailSaleResponseDTOS: [],
      },
      sale: {
        idSale: null,
        nameSale: "",
        discount: null,
        idStatus: null,
        listProductDetail: [],
        dateStart: null,
        dateEnd: null,
      },
    };
  },
  computed: {},
  watch: {
    sale: {
      handler() {
        if (this.sale.nameSale !== "") {
          this.isErrNameSale = false;
        }
        if (this.sale.discount > 0 && this.sale.discount < 100) {
          this.isErrDiscount = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    closeNotify() {
      this.isShowNotify = false;
    },
    closeNotifyV() {
      this.isShowNotifyV = false;
    },
    showProductInSale() {
      this.isShowNotifyV = true;
      this.getListProduct();
    },
    getListProduct() {
      this.$nextTick(() => {
        let payload = {
          sort: -1,
          idStatus: -1,
          idCategoryParent: -1,
          idCategoryChild: -1,
          idGender: -1,
          page: this.$refs["TableProductSale"].pageableParent,
        };
        this.$store.dispatch("productModule/getListProduct", payload);
      });
    },
    deleteProduct(index) {
      this.listProductDetailTemp.productDetailSaleResponseDTOS.splice(index, 1);
    },
    resetForm() {
      this.isErrNameSale = false;
      this.isErrDiscount = false;
      this.checkFormValidate = false;
      this.sale = {
        idSale: null,
        nameSale: "",
        discount: null,
        idStatus: null,
      };
    },
    checkValidate() {
      let check = true;
      if (this.sale.discount < 0 || this.sale.discount > 100) {
        this.isErrDiscount = true;
        this.isShowNotify = true;
        this.infoNotify = "Discount phải là số lớn hơn 0 và nhỏ hơn 100 !";
        this.checkFormValidate = false;
        check = false;
      }
      if (this.sale.nameSale.trim() === "" || this.sale.nameSale === null) {
        this.isErrNameSale = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
        check = false;
      }
      if (this.sale.discount === null) {
        this.isErrDiscount = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
        check = false;
      }
      if (check) {
        this.isErrNameSale = false;
        this.isErrDiscount = false;
        this.isShowNotify = false;
        this.infoNotify = "";
        this.checkFormValidate = true;
      }
    },
    addProductInSale(Product){
      this.isShowNotifyV = false;
      for (let i = 0; i < this.listProductDetailTemp.productDetailSaleResponseDTOS.length; i++) {
        if (
          this.listProductDetailTemp.productDetailSaleResponseDTOS[i].idProductDetail ===
          Product.idProductDetail
        ) {
          return;
        }
      }
      this.listProductDetailTemp.productDetailSaleResponseDTOS.push({
         ...Product,
      });
    },
    saveSale() {
      this.checkValidate();
      if (!this.checkFormValidate) {
        return;
      }
      if (this.listProductDetailTemp.productDetailSaleResponseDTOS && this.listProductDetailTemp.productDetailSaleResponseDTOS.length == 0) {
        this.isShowNotify = true;
        this.infoNotify = "Bạn chưa chọn sản phẩm";
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        return;
      }
      if (!this.sale.idSale) {
        this.sale.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
      }
      this.listProductDetailTemp.productDetailSaleResponseDTOS.forEach(item => {
        this.sale.listProductDetail.push({
          idProductDetail: item.idProductDetail,
          idStatus: GIA_TRI_TRANG_THAI.EXISTS,
        })
      });
      this.$store.dispatch("saleModule/saveSale", this.sale).then((res) => {
        if (res) {
          this.$emit("getListSale");
          this.resetForm();
        }
      });

    },
  },
};
</script>

<style lang="scss" scoped>
.table-product {
  display: flex;
  justify-content: space-between;
}
.my-custom-scrollbar {
  position: relative;
  height: 55vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #990033;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #d4aa70;
  }
}
.table-wrapper-scroll-y {
  display: block;
}
.input-quantity {
  width: 50px;
  text-align: center;
  border: 1px solid gray;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>