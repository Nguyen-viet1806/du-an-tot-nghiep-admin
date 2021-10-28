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
                id="exampleInputEmail1"
                v-model="voucher.nameVoucher"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Discount:</label>
              <input
                type="text"
                class="form-control"
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
              id="exampleInputEmail1"
              v-model="voucher.dateStart"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Ngày kết thúc:</label>
            <input
              type="date"
              class="form-control"
              id="exampleInputEmail1"
              v-model="voucher.dateEnd"
            />
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
  watch: {},
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
    saveVoucher() {
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