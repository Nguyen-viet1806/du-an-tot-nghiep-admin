<template>
  <div class="combo">
    <h3>Combo</h3>
    <form-combo ref="FormCombo" @getListCombo="getListCombo" />

    <table-combo
      ref="TableCombo"
      @showCombo="showCombo"
      @getListCombo="getListCombo"
      @reserForm="reserForm"
    />
  </div>
</template>

<script>
import FormCombo from "@/components/componentsCombo/FormCombo.vue";
import TableCombo from "@/components/componentsCombo/TableCombo.vue";
export default {
  name: "Combo",
  components: { FormCombo, TableCombo },
  props: {},
  data() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    showCombo(combo) {
      let comboTemp = {
        ...combo,
        comboDetail: [],
      };
      this.$refs["FormCombo"].combo = comboTemp;
      this.getComboDetail(combo);
    },
    reserForm() {
      this.$refs["FormCombo"].resetForm();
    },
    getComboDetail(combo) {
      let payload = {
        page: 0,
        idCombo: combo.idCombo,
      };
      this.$store
        .dispatch("comboModule/getComboDetailByIdCombo", payload)
        .then((res) => {
          if (res) {
            res.data.data.forEach((item) => {
              this.$refs["FormCombo"].listProductInCombo.push({
                idCombo: item.idCombo,
                idComboDetail: item.idComboDetail,
                productDetail: {...item.productDetail,quantity: combo.quantity + item.productDetail.quantity},
              });
            });
            // this.$refs["FormCombo"].listProductInCombo = res.data.data;
          }
        });
    },
    getListCombo(sort = -1, idStatus = -1, isLoc = false) {
      if (isLoc) {
        this.$refs["TableCombo"].pageable = 0;
      }
      let payload = {
        sort: sort,
        idStatus: idStatus,
        page: this.$refs["TableCombo"].pageable,
      };
      this.$store.dispatch("comboModule/getAllCombo", payload);
    },
  },
};
</script>

<style lnag="scss" scoped>
</style>