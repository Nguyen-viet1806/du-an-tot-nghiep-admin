<template>
  <div class="table-tpf">
    <div class="row">
      <div class="col-md-4">
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <input
            type="date"
            class="form-control"
            id="validationCustom01"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="date"
            class="form-control"
            id="validationCustom01"
            required
          />
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
          <th scope="col">Tên người mua</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Ngày tạo</th>
          <th scope="col">Ngày giao thành công</th>
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
      <tbody v-for="(bill, index) in listBill" :key="bill">
        <tr>
          <th scope="row">{{ getStt(index) }}</th>
          <td>{{ bill.userResponseDTO.lastName }}</td>
          <td>{{ bill.phoneUser }}</td>
          <td>{{ bill.dateCreate }}</td>
          <td>{{ bill.dateSuccess }}</td>
          <td>{{ bill.nameStatus }}</td>
          <td>
            <button v-on:click="showBill(bill)" class="btn-show">Show</button>
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
import { mapGetters } from "vuex";
export default {
  name: "TableBill",
  components: {},
  props: {},
  data() {
    return {
      keyWordSearch: "",
      idTrangThai: -1,
      pageable: 0,
      GIA_TRI_TRANG_THAI,
    };
  },
  computed: {
    ...mapGetters({
      listBill: "billModule/getListBill",
    }),
  },
  watch: {
    pageable() {
      this.$emit("getListBill");
    },
  },
  mounted() {},
  methods: {
    showBill(bill) {
      this.$emit("showBill", bill);
    },
    pageNext() {
      this.pageable++;
    },
    getStt(index) {
      return this.pageable !== 0 ? index + this.pageable * 5 + 1 : index + 1;
    },
    pagePre() {
      if (this.pageable > 0) {
        this.pageable--;
      }
    },
  },
};
</script>

<style lnag="scss" scoped>
</style>