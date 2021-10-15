<template>
  <div class="form-tpf">
    <div class="container">
      <div class="row">
        <div class="col">
          <h5>Thêm danh mục</h5>
          <form>
            <div class="form-group" v-show="false">
              <label>Id danh mục:</label>
              <input
                v-model="categoryParent.idCategory"
                style="cursor: no-drop"
                class="form-control"
                disabled
              />
            </div>
            <div class="form-group">
              <label>Tên danh mục:</label>
              <input
                v-model="categoryParent.nameCategory"
                type="text"
                class="form-control"
              />
            </div>
            <div class="control">
              <button type="button" class="btn btn-save">Lưu</button>
              <button v-on:click="resetFormCategoryParent" type="button" class="btn btn-reset">Làm tươi</button>
            </div>
          </form>
        </div>
        <div class="col">
          <h5 v-if="isShowCategoryChild">Thêm thể loại vào trong danh mục</h5>
          <div class="form-group" v-show="false">
            <label>Id thể loại:</label>
            <input
              v-model="categoryChild.idCategory"
              style="cursor: no-drop"
              class="form-control"
              disabled
            />
          </div>
          <div class="form-group" v-if="isShowCategoryChild">
            <label>Tên thể loại:</label>
            <input
              v-model="categoryChild.nameCategory"
              type="text"
              class="form-control"
            />
          </div>
          <div class="control">
            <button
              type="button"
              class="btn btn-add"
              v-on:click="addCategoryChild"
              v-if="!isShowCategoryChild"
            >
              Thêm thể loại vào danh mục
            </button>
            <button
              type="button"
              class="btn btn-closes"
              v-on:click="addCategoryChild"
              v-if="isShowCategoryChild"
            >
              Đóng
            </button>
            <button
              type="button"
              v-if="isShowCategoryChild"
              class="btn btn-reset"
              v-on:click="resetFormCategoryChild"
            >
              Làm tươi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FormCategory",
  components: {},
  props: {},
  data() {
    return {
      isShowCategoryChild: false,
      categoryParent: {
        idCategory: null,
        nameCategory: "",
        idStatus: null,
        listCategoryChildDTO: [
          {
            idCategory: null,
            idStatus: null,
            nameCategory: "",
            parentId: null,
          },
        ],
      },
      categoryChild: {
        idCategory: null,
        idStatus: null,
        nameCategory: "",
        parentId: null,
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    resetFormCategoryParent() {
      this.categoryParent = {
        idCategory: null,
        nameCategory: "",
        idStatus: null,
        listCategoryChildDTO: [
          {
            idCategory: null,
            idStatus: null,
            nameCategory: "",
            parentId: null,
          },
        ],
      };
    },
    resetFormCategoryChild() {
      this.categoryChild = {
        idCategory: null,
        idStatus: null,
        nameCategory: "",
        parentId: null,
      };
    },
    // saveCategoryParent() {
    //   this.$store.dispatch("categoryModule/saveColor", this.color).then((res) => {
    //     if (res) {
    //       let listColorTemp = [...this.listColors];
    //       if (!this.color.idColor) {
    //          this.color.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
    //         if (listColorTemp.length === 5) {
    //           listColorTemp.length = 4;
    //         }
    //         listColorTemp.push(res.data.data);
    //         this.$store.commit("categoryModule/SET_LIST_COLORS", listColorTemp);
    //       } else {
    //         let len = listColorTemp.length;
    //         for (let i = 0; i < len; i++) {
    //           if (listColorTemp[i].idColor === res.data.data.idColor) {
    //             listColorTemp[i] = res.data.data;
    //           }
    //         }
    //         this.$store.commit("categoryModule/SET_LIST_COLORS", listColorTemp);
    //       }
    //       this.resetForm();
    //     }
    //   });
    // },
    addCategoryChild() {
      this.isShowCategoryChild = !this.isShowCategoryChild;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>