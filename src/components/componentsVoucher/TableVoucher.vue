<template>
  <div class="table-tpf">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên Voucher</th>
          <th scope="col">Discount</th>
          <th scope="col">Ngày bắt đầu</th>
          <th scope="col">Ngày kết thúc</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Xóa/Khôi phục</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="Voucher in listVouchers" :key="Voucher">
        <tr>
          <th scope="row">{{ Voucher.idVoucher }}</th>
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
      GIA_TRI_TRANG_THAI,
      pageable: 0,
    };
  },
  computed: {},
  watch: {
    pageable() {
      this.$emit("getListFollowPage");
    },
  },
  mounted() {},
  methods: {
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