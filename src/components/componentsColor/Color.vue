<template>
  <div class="color">
    <h3>Màu</h3>
    <form-color ref="FormColor" :listColors="listColors" />

    <table-color
      ref="TableColor"
      :listColors="listColors"
      @getListFollowPage="getListColor"
      @clickShowFormColor="showFormColor"
    />
  </div>
</template>

<script>
import FormColor from "@/components/componentsColor/FormColor.vue";
import TableColor from "@/components/componentsColor/TableColor.vue";
import { mapGetters } from "vuex";

export default {
  name: "Size",
  components: { FormColor, TableColor },
  props: {},
  data() {},
  computed: {
    ...mapGetters({
      listColors: "colorModule/getListColors",
    }),
  },
  watch: {},
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getListColor();
    },
    getListColor() {
      let payload = {
        page: this.$refs["TableColor"].pageable,
      };
      this.$store.dispatch("colorModule/getDanhSachColor", payload);
    },
    showFormColor(color) {
      this.$refs["FormColor"].color = { ...color };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>