<template>
  <div class="product">
    <h3>Sản phẩm</h3>
    <form-product ref="FormProduct" @getListFollowPage="getListProduct" />

    <table-product
      ref="TableProduct"
      @getListFollowPage="getListProduct"
      @showFormProduct="showFormProduct"
    />
  </div>
</template>

<script>
import FormProduct from "@/components/componentsProduct/FormProduct.vue";
import TableProduct from "@/components/componentsProduct/TableProduct.vue";
import { mapGetters } from "vuex";

export default {
  name: "Size",
  components: { FormProduct, TableProduct },
  props: {},
  data() {},
  computed: {
    ...mapGetters({}),
  },
  watch: {},
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getCategoryExists();
      this.getListProduct();
    },
    getListProduct() {
      let payload = {
        sort: -1,
        idStatus: -1,
        idCategoryParent: -1,
        idCategoryChild: -1,
        idGender: -1,
        page: this.$refs["TableProduct"].pageableParent,
      };
      this.$store.dispatch("productModule/getListProduct", payload);
    },
    getCategoryExists() {
      this.$store.dispatch("categoryModule/getDanhSachCategoryParentExists");
    },
    showFormProduct(product) {
      this.$router.push({ path: this.$route.path, query: { isShow: true } });
      this.$refs["FormProduct"].product = product.productResponseShowDTO;
      this.$refs["FormProduct"].idDanhMuc = product.idCategoryParent;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>