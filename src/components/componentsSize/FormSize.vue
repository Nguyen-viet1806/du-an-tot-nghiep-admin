<template>
  <div class="form-tpf">
    <div class="container">
      <div class="row">
        <div class="col">
          <form>
            <div class="form-group" v-show="false">
              <label for="exampleInputEmail1">Id size:</label>
              <input
                style="cursor: no-drop"
                class="form-control"
                id="exampleInputEmail1"
                disabled
                v-model="size.idSize"
              />
            </div>
            <div class="form-group">
              <label>Danh mục:</label>
              <select
                class="form-select"
                :class="{ active: isErrCategory  }"
                aria-label="Default select example"
                v-model="size.idCategory"
              >
                <option value="-1">Chọn danh mục</option>
                <option
                  v-for="CategoryParent in listCategoryParentExists"
                  :key="CategoryParent"
                  :value="CategoryParent.idCategory"
                >
                  {{ CategoryParent.nameCategory }}
                </option>
              </select>
            </div>
            <div class="form-group mt-2">
              <label for="exampleInputEmail1">Tên size:</label>
              <input
                type="text"
                class="form-control"
                :class="{ active: isErrNameSize }"
                id="exampleInputEmail1"
                v-model="size.nameSize"
              />
            </div>
            <div class="control">
              <button type="button" class="btn btn-save" v-on:click="saveSize">
                Lưu
              </button>
              <button
                v-on:click="resetForm"
                type="button"
                class="btn btn-reset"
              >
                Làm tươi
              </button>
            </div>
          </form>
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
  name: "FormSize",
  components: {},
  props: {
    listSizes: {
      type: Array,
      default: () => [],
    },
    listCategoryParentExists: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShowNotify: false,
      isErrNameSize: false,
      isErrCategory: false,
      checkFormValidate: false,
      infoNotify: "",
      size: {
        idSize: null,
        nameSize: "",
        idCategory: -1,
        idStatus: null,
      },
    };
  },
  computed: {},
  watch: {
    size: {
      handler() {
        if (this.size.nameSize !== "" || this.size.nameSize !== null) {
          this.isErrNameSize = false;
        }
        if (this.size.idCategory !== -1 ) {
          this.isErrCategory = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    closeNotify() {
      this.isShowNotify = false;
    },
    resetForm() {
      this.isErrNameSize = false;
      this.isErrCategory = false;
      this.size = {
        idSize: null,
        nameSize: "",
        idCategory: -1,
        idStatus: null,
      };
    },
    checkValidate() {
      if (
        this.size.nameSize.trim() === "" ||
        this.size.nameSize.trim() === null
      ) {
        this.isErrNameSize = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      if (this.size.idCategory === -1) {
        this.isErrCategory = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      } 
      else {
        this.isErrNameSize = false;
        this.isErrCategory = false;
        this.isShowNotify = false;
        this.infoNotify = "";
        this.checkFormValidate = true;
      }
    },
    saveSize() {
      this.checkValidate();
      if (!this.checkFormValidate) {
        return;
      }
      if (!this.size.idSize) {
        this.size.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
      }
      this.$store.dispatch("sizeModule/saveSize", this.size).then((res) => {
        if (res) {
          if (!this.size.idSize) {
            let listSizeTemp = [...this.listSizes];
            listSizeTemp.push(res.data.data);
            this.$store.commit("sizeModule/SET_LIST_SIZES", listSizeTemp);
          } else {
            let listSizeTemp = [...this.listSizes];
            let len = listSizeTemp.length;
            for (let i = 0; i < len; i++) {
              if (listSizeTemp[i].idSize === res.data.data.idSize) {
                listSizeTemp[i] = res.data.data;
              }
            }
            this.$store.commit("sizeModule/SET_LIST_SIZES", listSizeTemp);
          }
          this.resetForm();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>