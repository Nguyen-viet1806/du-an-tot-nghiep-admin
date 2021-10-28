<template>
  <div class="combo">
    <h3>Combo</h3>
    <form-combo ref="FormCombo"  />

    <table-combo
      ref="TableCombo"
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
  methods: {},
};
</script>

<style lnag="scss" scoped>
</style>