<template>
  <div class="size">
    <h3>Size</h3>
    <form-size ref="FormSize" :listSizes="listSizes" />

    <table-size
      ref="TableSize"
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
    },
    showFormSize(size) {
      this.$refs["FormSize"].size = { ...size };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>