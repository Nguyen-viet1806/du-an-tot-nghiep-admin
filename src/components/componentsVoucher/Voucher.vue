<template>
  <div class="voucher">
    <h3>Voucher</h3>
    <form-voucher ref="FormVoucher" :listVouchers="listVouchers" />

    <table-voucher
      ref="TableVoucher"
      :listVouchers="listVouchers"
      @getListFollowPage="getListVoucher"
      @clickShowFormVoucher="showFormVoucher"
    />
  </div>
</template>

<script>
import FormVoucher from "@/components/componentsVoucher/FormVoucher.vue";
import TableVoucher from "@/components/componentsVoucher/TableVoucher.vue";
import { mapGetters } from "vuex";

export default {
  name: "Voucher",
  components: { FormVoucher, TableVoucher },
  props: {},
  data() {},
  computed: {
    ...mapGetters({
      listVouchers: "voucherModule/getListVouchers",
    }),
  },
  watch: {},
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getListVoucher();
    },
    getListVoucher() {
      let payload = {
        page: this.$refs["TableVoucher"].pageable,
      };
      this.$store.dispatch("voucherModule/getDanhSachVoucher", payload);
    },
    showFormVoucher(voucher) {
      this.$refs["FormVoucher"].voucher = { ...voucher };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>