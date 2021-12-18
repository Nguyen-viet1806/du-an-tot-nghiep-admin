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
        <select
          class="form-select form-select-sm"
          aria-label="Default select example"
          v-model="idDanhMuc"
        >
          <option value="-1">Chọn theo danh mục</option>
          <option
            v-for="CategoryParent in listCategoryParentExists"
            :key="CategoryParent"
            :value="CategoryParent.idCategory"
          >
            {{ CategoryParent.nameCategory }}
          </option>
        </select>
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
              @click="getListSizeSort(-1,true)"
            >
              Lọc
            </button>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên danh mục</th>
          <th scope="col">Tên Size</th>
          <th scope="col">Xóa/Khôi phục</th>
          <th scope="col">
            <button class="btn-arrow-up" @click="getListSizeSort(0)">
              <fa class="icon" :icon="['fas', 'arrow-up']" /></button
            ><button class="btn-arrow-down" @click="getListSizeSort(1)">
              <fa class="icon" :icon="['fas', 'arrow-down']" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody v-for="(Size, index) in listSizes" :key="Size.idSize">
        <tr>
          <th scope="row">{{ getStt(index) }}</th>
          <td>{{ Size.categoryParent.nameCategory }}</td>
          <td>{{ Size.nameSize }}</td>
          <td>
            <div class="form-switch">
              <input
                class="form-check-input"
                @change="updateStatus(Size, $event)"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                :checked="
                  Size.idStatus === GIA_TRI_TRANG_THAI.EXISTS ? true : false
                "
              />
            </div>
          </td>
          <td>
            <button v-on:click="showFormSize(Size)" class="btn-show">
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
            v-on:click.prevent="pagePre"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" v-on:click.prevent="">{{
            pageable + 1
          }}</a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            v-on:click.prevent="pageNext"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { GIA_TRI_TRANG_THAI } from "@/constants/constants";
export default {
  name: "TableSize",
  components: {},
  props: {
    listCategoryParentExists: {
      type: Array,
      default: () => [],
    },
    listSizes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      keyWordSearch: "",
      idDanhMuc: -1,
      idTrangThai: -1,
      GIA_TRI_TRANG_THAI,
      pageable: 0,
    };
  },
  computed: {},
  watch: {
    pageable() {
      this.idTrangThai = -1;
      this.idDanhMuc = -1;
      this.$emit("getListFollowPage");
    },
  },
  mounted() {},
  methods: {
    getStt(index) {
      return this.pageable !== 0 ? index + this.pageable * 5 + 1 : index + 1;
    },
    pageNext() {
      this.pageable++;
    },
    pagePre() {
      if (this.pageable > 0) {
        this.pageable--;
      }
    },
    getListSizeSort(sort = -1, isLoc = false) {
      if (isLoc) {
        this.pageable = 0;
      }
      let payload = {
        sort: sort,
        page: this.pageable,
        idStatus:
          this.idTrangThai && this.idTrangThai === -1 ? "" : this.idTrangThai,
        idCategory:
          this.idDanhMuc && this.idDanhMuc === -1 ? "" : this.idDanhMuc,
      };
      this.$store.dispatch("sizeModule/getDanhSachSizeSort", payload);
    },
    search() {
      this.pageable = 0;
      let payload = {
        name: this.keyWordSearch,
        page: this.pageable,
      };
      this.$store.dispatch("sizeModule/search", payload);
    },
    showFormSize(size) {
      this.$emit("clickShowFormSize", size);
    },
    updateStatus(size, event) {
      let payload = {
        ...size,
        idCategory: size.categoryParent.idCategory,
      };
      let checked = event.target.checked;
      if (checked) {
        payload.idStatus = this.GIA_TRI_TRANG_THAI.EXISTS;
        this.$store.dispatch("sizeModule/saveSize", payload);
      } else {
        payload.idStatus = this.GIA_TRI_TRANG_THAI.DELETE;
        this.$store.dispatch("sizeModule/saveSize", payload);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>