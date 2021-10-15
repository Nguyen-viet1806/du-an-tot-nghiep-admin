<template>
  <div class="table-tpf">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên Sale</th>
          <th scope="col">Discount</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Xóa/Khôi phục</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="Sale in listSales" :key="Sale">
        <tr >
          <th scope="row">{{ Sale.idSale }}</th>
          <td>{{ Sale.nameSale }}</td>
          <td>{{ Sale.discount }}%</td>
          <td>{{ Sale.descriptionSale }}</td>
          <td>
            <div class="form-switch">
              <input
                class="form-check-input"
                @change="updateStatus(Sale, $event)"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                :checked="Sale.idStatus === GIA_TRI_TRANG_THAI.EXISTS ? true : false"
              />
            </div>
          </td>
          <td>
            <button v-on:click="showFormSale(Sale)" class="btn-show">
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
  name: "TableSale",
  components: {},
  props: {
    listSales: {
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
    showFormSale(Sale) {
      this.$emit("clickShowFormSale", Sale);
    },
    updateStatus(Sale, event) {
      let checked = event.target.checked;
      if (checked) {
        Sale.idStatus = this.GIA_TRI_TRANG_THAI.EXISTS;
        this.$store.dispatch("saleModule/saveSale", Sale);
      } else {
        Sale.idStatus = this.GIA_TRI_TRANG_THAI.DELETE;
        this.$store.dispatch("saleModule/saveSale", Sale);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>