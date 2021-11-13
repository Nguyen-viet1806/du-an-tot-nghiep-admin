<template>
  <div class="form-tpf">
    <div class="container">
      <div class="row">
        <div class="col">
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
        <div class="col">
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
        </div>
        <div class="col">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GIA_TRI_TRANG_THAI } from "@/constants/constants";
export default {
  name: "FormSale",
  components: {},
  props: {
    listSales: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShowNotify: false,
      isErrNameSale: false,
      isErrDiscount: false,
      checkFormValidate: false,
      infoNotify: "",
      sale: {
        idSale: null,
        nameSale: "",
        discount: null,
        idStatus: null,
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
    saveSale() {
      this.checkValidate();
      if (!this.checkFormValidate) {
        return;
      }
      if (!this.sale.idSale) {
        this.sale.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
      }
      this.$store.dispatch("saleModule/saveSale", this.sale).then((res) => {
        if (res) {
          let listSaleTemp = [...this.listSales];
          if (!this.sale.idSale) {
            listSaleTemp.push(res.data.data);
            this.$store.commit("saleModule/SET_LIST_SALES", listSaleTemp);
          } else {
            let len = listSaleTemp.length;
            for (let i = 0; i < len; i++) {
              if (listSaleTemp[i].idSale === res.data.data.idSale) {
                listSaleTemp[i] = res.data.data;
              }
            }
            this.$store.commit("saleModule/SET_LIST_SALES", listSaleTemp);
          }
          this.resetForm();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>