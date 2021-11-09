<template>
  <div class="combo">
    <h3>Hóa đơn</h3>
    <form-bill ref="FormBill" />

    <table-bill ref="TableBill" />
  </div>
</template>

<script>
import FormBill from "@/components/componentsBill/FormBill.vue";
import TableBill from "@/components/componentsBill/TableBill.vue";
export default {
  name: "Combo",
  components: { FormBill, TableBill },
  props: {},
  data() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lnag="scss" scoped>
</style>