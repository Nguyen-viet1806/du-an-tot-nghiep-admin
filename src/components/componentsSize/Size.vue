<template>
  <div class="size">
    <h3>Size</h3>
    <form-size ref="FormSize" :listSizes="listSizes" :listCategoryParentExists="listCategoryParentExists"/>

    <table-size
      ref="TableSize"
      :listCategoryParentExists="listCategoryParentExists"
      :listSizes="listSizes"
      @getListFollowPage="getListSizes"
      @clickShowFormSize="showFormSize"
    />
  </div>
</template>

<script>
import FormSize from "@/components/componentsSize/FormSize.vue";
import TableSize from "@/components/componentsSize/TableSize.vue";
import { mapGetters } from "vuex";

export default {
  name: "Size",
  components: { FormSize, TableSize },
  props: {},
  data() {},
  computed: {
    ...mapGetters({
      listSizes: "sizeModule/getListSizes",
      listCategoryParentExists: "categoryModule/getListCategoryParentExists",
    }),
  },
  watch: {},
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getListSizes();
    },
    getListSizes() {
      let payload = {
        page: this.$refs["TableSize"].pageable,
      };
      this.$store.dispatch("sizeModule/getDanhSachSize", payload);
      this.$store.dispatch("categoryModule/getDanhSachCategoryParentExists");
    },
    showFormSize(size) {
      this.$refs["FormSize"].size = { ...size , idCategory:size.categoryParent.idCategory };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>