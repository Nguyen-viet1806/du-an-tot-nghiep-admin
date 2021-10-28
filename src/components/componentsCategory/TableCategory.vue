<template>
  <div class="table-tpf">

    <div class="row">
      <div class="col-md-4">
        <div class="input-group">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Tìm kiếm"
            aria-label="Search"
            aria-describedby="search-addon"
            v-model="keyWordSearch"
          />
          <button type="button" @click="search" class="btn btn-outline-primary">
            Tìm kiếm
          </button>
        </div>
      </div>
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-8 mt-2">
            <select
              class="form-select form-select-sm"
              aria-label="Default select example"
              v-model="idTrangThai"
            >
              <option value="-1">Chọn theo trạng thái</option>
              <option :value="GIA_TRI_TRANG_THAI.DELETE">Đã xóa</option>
              <option :value="GIA_TRI_TRANG_THAI.EXISTS">Tồn tại</option>
            </select>
          </div>
          <div class="col-md-4 mt-2">
            <button
              type="button"
              class="btn btn-filter w-100"
              @click="getListSort(-1)"
            >
              Lọc
            </button>
          </div>
        </div>
      </div>
    </div>
      <div class="row mt-4">
        <div class="col">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên danh mục</th>
                <th scope="col">Xóa/Khôi phục</th>
                <th scope="col">
            <button class="btn-arrow-up" @click="getListSort(0)">
              <fa class="icon" :icon="['fas', 'arrow-up']" /></button
            ><button class="btn-arrow-down" @click="getListSort(1)">
              <fa class="icon" :icon="['fas', 'arrow-down']" />
            </button>
          </th>
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
                <th scope="col">
            <button class="btn-arrow-up" @click="getListSort(0)">
              <fa class="icon" :icon="['fas', 'arrow-up']" /></button
            ><button class="btn-arrow-down" @click="getListSort(1)">
              <fa class="icon" :icon="['fas', 'arrow-down']" />
            </button>
          </th>
              </tr>
            </thead>
            <tbody
              v-for="(CategoryChild, index) in listCategoryChild"
              :key="CategoryChild"
            >
              <tr>
                <th scope="row">{{ getStt(index) }}</th>
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
      keyWordSearch: "",
      idTrangThai: -1,
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
    getStt(index) {
      return this.pageable !== 0 ? index + this.pageable * 5 + 1 : index + 1;
    },
    getListSort(sort = -1) {
      let payload = {
        sort: sort,
        page: this.pageableParent,
        idStatus:
          this.idTrangThai && this.idTrangThai === -1 ? "" : this.idTrangThai,
      };
      this.$store.dispatch("categoryModule/getDanhSachCategoryParentSort", payload);
    },
    search() {
      let payload = {
        name: this.keyWordSearch,
        page: this.pageableParent,
      };
      this.$store.dispatch("categoryModule/search", payload);
    },
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