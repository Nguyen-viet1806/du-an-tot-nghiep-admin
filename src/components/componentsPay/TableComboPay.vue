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
              v-on:click="resetForm"
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

    <table class="table table-hover mt-4">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col"></th>
          <th scope="col">Tên combo</th>
          <th scope="col">Giá combo</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Ngày tạo</th>
          <th scope="col">Mô tả combo</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">
            <button class="btn-arrow-up" @click="getListSort(0)">
              <fa class="icon" :icon="['fas', 'arrow-up']" /></button
            ><button class="btn-arrow-down" @click="getListSort(1)">
              <fa class="icon" :icon="['fas', 'arrow-down']" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody v-for="(combo, index) in listCombo" :key="combo">
        <tr>
          <th scope="row">{{ getStt(index) }}</th>
          <td>
            <img width="80" :src="DO_MAIN + combo.frontPhoto" /><img
              width="80"
              :src="DO_MAIN + combo.backPhoto"
            /><img width="80" :src="DO_MAIN + combo.coverPhoto" />
          </td>
          <td>{{ combo.nameCombo }}</td>
          <td>{{ combo.price }}</td>
          <td>{{ combo.quantity }}</td>
          <td>{{ combo.createAt }}</td>
          <td>{{ combo.descriptionCombo }}</td>

          <td>
            <div class="form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                :checked="
                  combo.idStatus === GIA_TRI_TRANG_THAI.EXISTS ? true : false
                "
              />
            </div>
          </td>
          <td>
            <div v-on:click="showCombo(combo)" class="btn-show cuso">Chọn combo</div>
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
import { GIA_TRI_TRANG_THAI, DO_MAIN } from "@/constants/constants";
import { mapGetters } from "vuex";
export default {
  name: "TableCombo",
  components: {},
  props: {},
  data() {
    return {
      DO_MAIN,
      keyWordSearch: "",
      idTrangThai: -1,
      pageable: 0,
      GIA_TRI_TRANG_THAI,
    };
  },
  computed: {
    ...mapGetters({
      listCombo: "comboModule/getListCombo",
    }),
  },
  watch: {
    pageable() {
      this.getListCombo();
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getListCombo();
    },
    pageNext() {
      this.pageable++;
    },

    pagePre() {
      if (this.pageable > 0) {
        this.pageable--;
      }
    },
    showCombo(combo) {
      this.$emit("addComboInBill", combo);
    },
    getStt(index) {
      return this.pageable !== 0 ? index + this.pageable * 5 + 1 : index + 1;
    },
    getListCombo() {
      let payload = {
        sort: -1,
        idStatus: 2,
        page: this.pageable,
      };
      this.$store.dispatch("comboModule/getAllCombo", payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.cuso{
  cursor: pointer;
}
</style>