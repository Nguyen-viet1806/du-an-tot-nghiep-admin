<template>
  <div class="form-tpf">
    <div class="container">
      <div class="row">
        <div class="col">
          <form>
            <div class="form-group" v-show="false">
              <label for="exampleInputEmail1">Id voucher:</label>
              <input
                style="cursor: no-drop"
                class="form-control"
                id="exampleInputEmail1"
                disabled
                v-model="voucher.idVoucher"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Tên voucher:</label>
              <input
                type="text"
                class="form-control"
                :class="{ active: isErrNameVoucher}"
                id="exampleInputEmail1"
                v-model="voucher.nameVoucher"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Discount:</label>
              <input
                type="number"
                class="form-control"
                :class="{ active: isErrDiscount}"
                id="exampleInputEmail1"
                v-model="voucher.discount"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Mô tả:</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                v-model="voucher.descriptionVoucher"
              />
            </div>
            <div class="control">
              <button
                type="button"
                class="btn btn-save"
                v-on:click="saveVoucher"
              >
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
            <label for="exampleInputEmail1">Điều kiện áp dụng khi đơn hàng lớn hơn:</label>
            <input
              type="text"
              class="form-control"
              :class="{ active: isErrCondition}"
              id="exampleInputEmail1"
              v-model="voucher.condition"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Mã voucher:</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              v-model="voucher.codeVoucher"
              disabled
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
  name: "FormVoucher",
  components: {},
  props: {
    listVouchers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isErrNameVoucher: false,
      isErrDiscount: false,
      isErrDateStart: false,
      isErrDateEnd: false,
      isShowNotify: false,
      checkFormValidate: false,
      infoNotify: "",
      voucher: {
        idVoucher: null,
        nameVoucher: "",
        discount: 0,
        condition: 0,
        codeVoucher: null,
        descriptionVoucher: null,
        idStatus: null,
      },
    };
  },
  computed: {},
  watch: {
    voucher: {
      handler() {
        if (this.voucher.nameVoucher !== "" && this.voucher.nameVoucher != null) {
          this.isErrNameVoucher = false;
        }
        if (this.voucher.discount > 0 && this.voucher.discount < 100) {
          this.isErrDiscount = false;
        }
        if (this.voucher.condition !== "" && this.voucher.condition != null) {
          this.isErrCondition = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    resetForm() {
      this.isErrNameVoucher = false;
      this.isErrDiscount = false;
      this.isErrCondition = false;
      this.isShowNotify = false;
      this.voucher = {
        idVoucher: null,
        nameVoucher: "",
        discount: 0,
        condition: 0,
        codeVoucher: null,
        descriptionVoucher: null,
        idStatus: null,
      };
    },
    closeNotify() {
      this.isShowNotify = false;
    },
    checkValidate() {
      let check = true
      if (
        this.voucher.nameVoucher.trim() === "" ||
        this.voucher.nameVoucher.trim() === null
      ) {
        this.isErrNameVoucher = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
        check= false
      }
      if (
        this.voucher.discount === "" ||
        this.voucher.discount === null 
      ) {
        this.isErrDiscount = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
        check= false
      }
       if (
        this.voucher.condition === "" ||
        this.voucher.condition === null
      ) {
        this.isErrCondition = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
        check= false
      }
      if((this.voucher.discount <= 0 || this.voucher.discount > 100) && check){
        this.isErrDiscount = true;
        this.isShowNotify = true;
        this.infoNotify = "Discount phải lớn hơn 0 và nhỏ hơn 100 !";
        this.checkFormValidate = false;
        check= false
      }
      if((this.voucher.condition <= 0) && check){
        this.isErrCondition = true;
        this.isShowNotify = true;
        this.infoNotify = "Điều kiện áp dụng phải lớn hơn 0 !";
        this.checkFormValidate = false;
        check= false
      }
      if(check) {
        this.isErrNameVoucher = false;
        this.isErrDiscount = false;
        this.isErrDateStart = false;
        this.isErrDateEnd = false;
        this.isShowNotify = false;
        this.infoNotify = "";
        this.checkFormValidate = true;
      }
    },
    saveVoucher() {
      this.checkValidate();
      if (!this.checkFormValidate) {
        return;
      }
      if (!this.voucher.idVoucher) {
        this.voucher.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
      }
      this.$store
        .dispatch("voucherModule/saveVoucher", this.voucher)
        .then((res) => {
          if (res) {
            if (!this.voucher.idVoucher) {
              this.voucher.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
              let listVoucherTemp = [...this.listVouchers];
              listVoucherTemp.push(res.data.data);
              this.$store.commit(
                "voucherModule/SET_LIST_VOUCHERS",
                listVoucherTemp
              );
            } else {
              let listVoucherTemp = [...this.listVouchers];
              let len = listVoucherTemp.length;
              for (let i = 0; i < len; i++) {
                if (listVoucherTemp[i].idVoucher === res.data.data.idVoucher) {
                  listVoucherTemp[i] = res.data.data;
                }
              }
              this.$store.commit(
                "voucherModule/SET_LIST_VOUCHERS",
                listVoucherTemp
              );
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