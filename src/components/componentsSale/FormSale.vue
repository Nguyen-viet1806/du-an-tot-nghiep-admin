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
              <input type="text" class="form-control" v-model="sale.nameSale" />
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
              v-model="sale.discount"
              min="1"
              max="100"
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
      sale: {
        idSale: null,
        discount: null,
        idStatus: null,
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    resetForm() {
      this.sale = {
        idSale: null,
        discount: null,
        idStatus: null,
      };
    },
    saveSale() {
      this.$store.dispatch("saleModule/saveSale", this.sale).then((res) => {
        if (res) {
          this.sale.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
          let listSaleTemp = [...this.listSales];
          if (!this.sale.idSale) {
            if (listSaleTemp.length === 5) {
              listSaleTemp.length = 4;
            }
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