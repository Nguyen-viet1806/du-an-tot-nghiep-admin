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
                :class="{ active: isErrNameCategory }"
              />
            </div>
            <div class="control">
              <button
                v-on:click="saveCategory"
                type="button"
                class="btn btn-save"
              >
                Lưu
              </button>
              <button
                v-on:click="resetFormCategoryParent"
                type="button"
                class="btn btn-reset"
              >
                Làm tươi
              </button>
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
        <div class="col">
          <div class="notify">
            <div
              id="popup1"
              v-if="isShowNotify"
              class="overlay"
              @click="closeNotify"
            ></div>
            <transition name="bounce">
              <div id="popup1" v-if="isShowNotify" class="popup">
                <h2>Thông báo:</h2>
                <a class="close" href="#" @click="closeNotify">&times;</a>
                <div class="content">
                  {{ infoNotify }}
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GIA_TRI_TRANG_THAI } from "@/constants/constants";
export default {
  name: "FormCategory",
  components: {},
  props: {
    listCategoryParent: {
      type: Array,
      default: () => [],
    },
    listCategoryChild: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShowNotify: false,
      isErrNameCategory: false,
      checkFormValidate: false,
      infoNotify: "",
      isShowCategoryChild: false,
      GIA_TRI_TRANG_THAI,
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
  watch: {
    categoryParent: {
      handler() {
        if (this.categoryParent.nameCategory !== "" ||this.categoryParent.nameCategory !== null) {
          this.isErrNameCategory = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
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
    closeNotify() {
      this.isShowNotify = false;
    },
    checkValidate() {
      if (
        this.categoryParent.nameCategory.trim() === "" ||
        this.categoryParent.nameCategory.trim() === null
      ) {
        this.isErrNameCategory = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      else {
        this.isErrNameCategory = false;
        this.isShowNotify = false;
        this.infoNotify = "";
        this.checkFormValidate = true;
      }
    },
    saveCategory() {
      this.checkValidate();
      if (!this.checkFormValidate) {
        return;
      }
      if (this.categoryParent.idCategory) {
        if (this.categoryChild.idCategory) {
          // check trong
          this.categoryParent.listCategoryChildDTO[0] = {
            ...this.categoryChild,
          };
        } else {
          //check trong
          if (this.categoryChild.nameCategory.trim() === "") {
            this.categoryParent.listCategoryChildDTO = null;
          } else {
            this.categoryChild.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
            this.categoryParent.listCategoryChildDTO[0] = {
            ...this.categoryChild,
          };
          }
        }
      } else {
        if (this.categoryChild.nameCategory.trim() === "") {
          this.categoryParent.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
          this.categoryParent.listCategoryChildDTO = null;
        } else {
          //check trong cha
          this.categoryParent.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
          this.categoryChild.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
          this.categoryParent.listCategoryChildDTO[0] = {
            ...this.categoryChild,
          };
        }
      }
      this.$store
        .dispatch("categoryModule/saveCategoryParent", this.categoryParent)
        .then((res) => {
          if (res) {
            this.$emit("getListFollowPageParent");
            this.resetFormCategoryParent();
            this.resetFormCategoryChild();
          }
        });
    },
    addCategoryChild() {
      this.isShowCategoryChild = !this.isShowCategoryChild;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>