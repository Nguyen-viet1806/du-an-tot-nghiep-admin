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
                aria-label="Default select example"
                v-model="size.idCategory"
              >
                <option value="-1">Open this select menu</option>
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
        <div class="col"></div>
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
      size: {
        idSize: null,
        nameSize: "",
        idCategory: -1,
        idStatus: null,
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    resetForm() {
      this.size = {
        idSize: null,
        nameSize: "",
        idCategory: -1,
        idStatus: null,
      };
    },
    saveSize() {
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