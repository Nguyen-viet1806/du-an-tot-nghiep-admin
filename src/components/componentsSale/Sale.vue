<template>
  <div class="sale">
    <h3>Sale</h3>
    <form-sale ref="FormSale" :listSales="listSales"  @getListSale="getListSale"/>

    <table-sale
      ref="TableSale"
      :listSales="listSales"
      @getListFollowPage="getListSale"
      @clickShowFormSale="showFormSale"
    />
  </div>
</template>

<script>
import FormSale from "@/components/componentsSale/FormSale.vue";
import TableSale from "@/components/componentsSale/TableSale.vue";
import { mapGetters } from "vuex";

export default {
  name: "Sale",
  components: { FormSale, TableSale },
  props: {},
  data() {},
  computed: {
    ...mapGetters({
      listSales: "saleModule/getListSales",
    }),
  },
  watch: {},
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getListSale();
    },
    getListSale() {
      let payload = {
        page: this.$refs["TableSale"].pageable,
      };
      this.$store.dispatch("saleModule/getDanhSachSale", payload);
    },
    showFormSale(sale) {
      this.$refs["FormSale"].sale = { ...sale };
      let payload = {
        page: 0,
        limit: 100000000,
        idSale: sale.idSale,
      };
      this.$store.dispatch("saleModule/getListProductSale", payload);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>