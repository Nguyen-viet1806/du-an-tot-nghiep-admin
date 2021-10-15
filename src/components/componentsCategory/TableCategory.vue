<template>
  <div class="table-tpf">
    <div class="container">
      <div class="row">
        <div class="col">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên danh mục</th>
                <th scope="col">Xóa/Khôi phục</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody
              v-for="(CategoryParent, index) in listCategoryParent"
              :key="CategoryParent"
            >
              <tr>
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ CategoryParent.nameCategory }}</td>
                <td>
                  <div class="form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      @change="
                        updateCategoryParenStatus(CategoryParent, $event)
                      "
                      :checked="
                        CategoryParent.idStatus === GIA_TRI_TRANG_THAI.EXISTS
                          ? true
                          : false
                      "
                    />
                  </div>
                </td>
                <td>
                  <button
                    v-on:click="showFormCategoryParen(CategoryParent)"
                    class="btn-show"
                  >
                    Show
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="Page" aria-label="Page navigation example ">
            <ul class="pagination">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  v-on:click.prevent="pagePreParent"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" v-on:click.prevent="">{{
                  pageableParent + 1
                }}</a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  v-on:click.prevent="pageNextParent"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên Category</th>
                <th scope="col">Xóa/Khôi phục</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody
              v-for="(CategoryChild, index) in listCategoryChild"
              :key="CategoryChild"
            >
              <tr>
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ CategoryChild.nameCategory }}</td>
                <td>
                  <div class="form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      @change="updateCategoryChildStatus(CategoryChild, $event)"
                      :checked="
                        CategoryChild.idStatus === GIA_TRI_TRANG_THAI.EXISTS
                          ? true
                          : false
                      "
                    />
                  </div>
                </td>
                <td>
                  <button
                    v-on:click="showFormCategoryChild(CategoryChild)"
                    class="btn-show"
                  >
                    Show
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="Page" aria-label="Page navigation example ">
            <ul class="pagination">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  v-on:click.prevent="pagePreChild"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" v-on:click.prevent="">{{
                  pageableChild + 1
                }}</a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  v-on:click.prevent="pageNextChild"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GIA_TRI_TRANG_THAI } from "@/constants/constants";
export default {
  name: "TableCategory",
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
    categoryParent: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      GIA_TRI_TRANG_THAI,
      pageableParent: 0,
      pageableChild: 0,
      parentId: null,
    };
  },
  computed: {},
  watch: {
    pageableParent() {
      this.$emit("getListFollowPageParent");
    },

    pageableChild() {
      if (this.$store.state.categoryModule.categoryParent) {
        this.$emit("getListFollowPageChild", this.$store.state.categoryModule.categoryParent.idCategory);
      }
    },
  },
  mounted() {},
  methods: {
    pageNextParent() {
      this.pageableParent++;
    },

    pagePreParent() {
      if (this.pageableParent > 0) {
        this.pageableParent--;
      }
    },

    pageNextChild() {
      this.pageableChild++;
    },

    pagePreChild() {
      if (this.pageableChild > 0) {
        this.pageableChild--;
      }
    },
    updateCategoryParenStatus(CategoryParen, event) {
      let checked = event.target.checked;
      if (checked) {
        CategoryParen.idStatus = this.GIA_TRI_TRANG_THAI.EXISTS;
        this.$store.dispatch(
          "categoryModule/saveCategoryParent",
          CategoryParen
        );
      } else {
        CategoryParen.idStatus = this.GIA_TRI_TRANG_THAI.DELETE;
        this.$store.dispatch(
          "categoryModule/saveCategoryParent",
          CategoryParen
        );
      }
    },
    updateCategoryChildStatus(CategoryChild, event) {
      let checked = event.target.checked;
      if (checked) {
        CategoryChild.idStatus = this.GIA_TRI_TRANG_THAI.EXISTS;
        this.$store.dispatch("categoryModule/saveCategoryChild", CategoryChild);
      } else {
        CategoryChild.idStatus = this.GIA_TRI_TRANG_THAI.DELETE;
        this.$store.dispatch("categoryModule/saveCategoryChild", CategoryChild);
      }
    },
    showFormCategoryParen(CategoryParen) {
      this.$emit("clickShowFormCategoryParen", CategoryParen);
    },

    showFormCategoryChild(CategoryChild) {
      this.$emit("clickShowFormCategoryChild", CategoryChild);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>