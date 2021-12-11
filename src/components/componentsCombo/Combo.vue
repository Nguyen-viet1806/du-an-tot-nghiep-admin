<template>
  <div class="combo">
    <h3>Combo</h3>
    <form-combo ref="FormCombo" @getListCombo="getListCombo"/>

    <table-combo ref="TableCombo" @showCombo="showCombo" @getListCombo="getListCombo"/>
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
    getComboDetail(combo) {
      let payload = {
        page: 0,
        idCombo: combo.idCombo,
      };
      this.$store
        .dispatch("comboModule/getComboDetailByIdCombo", payload)
        .then((res) => {
          if (res) {
            this.$refs["FormCombo"].listProductInCombo = res.data.data;
          }
        });
    },
    getListCombo() {
      let payload = {
        sort: -1,
        idStatus: 2,
        page: this.refs["TableCombo"].pageable,
      };
      this.$store.dispatch("comboModule/getAllCombo", payload);
    },
  },
};
</script>

<style lnag="scss" scoped>
</style>