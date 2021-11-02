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
                type="text"
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
            <label for="exampleInputEmail1">Ngày bắt đầu:</label>
            <input
              type="date"
              class="form-control"
              :class="{ active: isErrDateStart}"
              id="exampleInputEmail1"
              v-model="voucher.dateStart"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Ngày kết thúc:</label>
            <input
              type="date"
              class="form-control"
              :class="{ active: isErrDateEnd}"
              id="exampleInputEmail1"
              v-model="voucher.dateEnd"
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
        discount: null,
        dateStart: "",
        dateEnd: null,
        descriptionVoucher: null,
        idStatus: null,
      },
    };
  },
  computed: {},
  watch: {
    voucher: {
      handler() {
        if (this.voucher.nameVoucher !== "" || this.voucher.nameVouchere !== null) {
          this.isErrNameVoucher = false;
        }
        if (this.voucher.discount !== "" || this.voucher.discount !== null) {
          this.isErrDiscount = false;
        }
        if (this.voucher.dateStart !== "" || this.voucher.dateStart !== null) {
          this.isErrDateStart = false;
        }
        if (this.voucher.dateEnd !== "" || this.voucher.dateEnd !== null) {
          this.isErrDateEnd = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    resetForm() {
      this.voucher = {
        idVoucher: null,
        nameVoucher: "",
        discount: null,
        dateStart: null,
        dateEnd: null,
        descriptionVoucher: null,
        idStatus: null,
      };
    },
    closeNotify() {
      this.isShowNotify = false;
    },
    checkValidate() {
      if (
        this.voucher.nameVoucher.trim() === "" ||
        this.voucher.nameVoucher.trim() === null
      ) {
        this.isErrNameVoucher = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      if (
        this.voucher.discount === "" ||
        this.voucher.discount === null
      ) {
        this.isErrDiscount = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      if (
        this.voucher.dateStart < Date.now()
      ) {
        this.isErrDateStart = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      } 
      if (
        this.voucher.dateEnd < this.voucher.dateStart
      ) {
        this.isErrDateEnd = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      } 
      else {
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