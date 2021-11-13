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

    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên Voucher</th>
          <th scope="col">Discount</th>
          <th scope="col">Ngày bắt đầu</th>
          <th scope="col">Ngày kết thúc</th>
          <th scope="col">Mô tả</th>
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
      <tbody v-for="(Voucher,index) in listVouchers" :key="Voucher">
        <tr>
          <th scope="row">{{ getStt(index) }}</th>
          <td>{{ Voucher.nameVoucher }}</td>
          <td>{{ Voucher.discount }}%</td>
          <td>{{ Voucher.dateStart }}</td>
          <td>{{ Voucher.dateEnd }}</td>
          <td>{{ Voucher.descriptionVoucher }}</td>
          <td>
            <div class="form-switch">
              <input
                class="form-check-input"
                @change="updateStatus(Voucher, $event)"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                :checked="
                  Voucher.idStatus === GIA_TRI_TRANG_THAI.EXISTS ? true : false
                "
              />
            </div>
          </td>
          <td>
            <button v-on:click="showFormVoucher(Voucher)" class="btn-show">
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
  name: "TableVoucher",
  components: {},
  props: {
    listVouchers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      keyWordSearch: "",
      idTrangThai: -1,
      GIA_TRI_TRANG_THAI,
      pageable: 0,
    };
  },
  computed: {},
  watch: {
    pageable() {
      this.idTrangThai = -1;
      this.$emit("getListFollowPage");
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
        page: this.pageable,
        idStatus:
          this.idTrangThai && this.idTrangThai === -1 ? "" : this.idTrangThai,
      };
      this.$store.dispatch("voucherModule/getDanhSachVoucherSort", payload);
    },
    search() {
      let payload = {
        name: this.keyWordSearch,
        page: this.pageable,
      };
      this.$store.dispatch("voucherModule/search", payload);
    },
    pageNext() {
      this.pageable++;
    },
    pagePre() {
      if (this.pageable > 0) {
        this.pageable--;
      }
    },
    showFormVoucher(voucher) {
      this.$emit("clickShowFormVoucher", voucher);
    },
    updateStatus(voucher, event) {
      let checked = event.target.checked;
      if (checked) {
        voucher.idStatus = this.GIA_TRI_TRANG_THAI.EXISTS;
        this.$store.dispatch("voucherModule/saveVoucher", voucher);
      } else {
        voucher.idStatus = this.GIA_TRI_TRANG_THAI.DELETE;
        this.$store.dispatch("voucherModule/saveVoucher", voucher);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>