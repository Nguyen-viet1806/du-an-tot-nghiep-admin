<template>
  <div class="form-tpf">
    <div class="container">
      <div class="row">
        <div class="col">
          <form>
            <div class="form-group" v-show="false">
              <label>Id color:</label>
              <input
                style="cursor: no-drop"
                class="form-control"
                disabled
                v-model="color.idColor"
              />
            </div>
            <div class="form-group">
              <label>Tên color:</label>
              <input
                type="text"
                class="form-control"
                v-model="color.nameColor"
              />
            </div>
            <div class="control">
              <button type="button" class="btn btn-save" v-on:click="saveColor">
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
  name: "FormColor",
  components: {},
  props: {
    listColors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      color: {
        idColor: null,
        nameColor: "",
        idStatus: null,
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    resetForm() {
      this.color = {
        idColor: null,
        nameColor: "",
        idStatus: null,
      };
    },
    saveColor() {
      if (!this.color.idColor) {
        this.color.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
      }
      this.$store.dispatch("colorModule/saveColor", this.color).then((res) => {
        if (res) {
          let listColorTemp = [...this.listColors];
          if (!this.color.idColor) {
            if (listColorTemp.length === 5) {
              listColorTemp.length = 4;
            }
            listColorTemp.push(res.data.data);
            this.$store.commit("colorModule/SET_LIST_COLORS", listColorTemp);
          } else {
            let len = listColorTemp.length;
            for (let i = 0; i < len; i++) {
              if (listColorTemp[i].idColor === res.data.data.idColor) {
                listColorTemp[i] = res.data.data;
              }
            }
            this.$store.commit("colorModule/SET_LIST_COLORS", listColorTemp);
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