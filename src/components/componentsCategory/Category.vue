<template>
  <div class="category">
    <h3>Danh mục</h3>
    <form-category ref="FormCategory" />
    {{ categoryParent }}
    <table-category
      ref="TableCategory"
      :listCategoryParent="listCategoryParent"
      :listCategoryChild="listCategoryChild"
      @getListFollowPageParent="getListCategoryParent"
      @getListFollowPageChild="getListCategoryChild"
      @clickShowFormCategoryParen="showFormCategoryParent"
      @clickShowFormCategoryChild="showFormCategoryChild"
    />
  </div>
</template>

<script>
import FormCategory from "@/components/componentsCategory/FormCategory.vue";
import TableCategory from "@/components/componentsCategory/TableCategory.vue";
import { mapGetters } from "vuex";
export default {
  name: "Category",
  components: { FormCategory, TableCategory },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      listCategoryParent: "categoryModule/getListCategoryParent",
      listCategoryChild: "categoryModule/getListCategoryChild",
    }),
  },
  watch: {},
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getListCategoryParent();
    },

    getListCategoryParent() {
      let payload = {
        page: this.$refs["TableCategory"].pageableParent,
      };
      this.$store.dispatch("categoryModule/getDanhSachCategoryParent", payload);
    },

    getListCategoryChild(parentId) {
      let payload = {
        page: this.$refs["TableCategory"].pageableChild,
        parentId: parentId,
      };
      this.$store.dispatch("categoryModule/getDanhSachCategoryChild", payload);
    },

    showFormCategoryParent(categoryParent) {
      let categoryTemp = { ...categoryParent };
      this.$refs["FormCategory"].categoryParent = categoryTemp;
      this.getListCategoryChild(categoryTemp.idCategory);
      this.$refs["FormCategory"].resetFormCategoryChild();
      this.$store.commit("categoryModule/SET_CATEGORYS_PARENT", categoryTemp);
      console.log(this.$store.state.categoryModule.categoryParent);
    },

    showFormCategoryChild(categoryChild) {
      this.$refs["FormCategory"].categoryChild = { ...categoryChild };
      this.$refs["FormCategory"].isShowCategoryChild = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>