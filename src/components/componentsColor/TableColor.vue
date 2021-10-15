<template>
  <div class="table-tpf">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên Color</th>
          <th scope="col">Xóa/Khôi phục</th>
           <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="Color in listColors" :key="Color">
        <tr >
          <th scope="row">{{ Color.idColor }}</th>
          <td>{{ Color.nameColor }}</td>
          <td>
            <div class="form-switch">
              <input
                class="form-check-input"
                @change="updateStatus(Color, $event)"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                :checked="Color.idStatus === GIA_TRI_TRANG_THAI.EXISTS ? true : false"
              />
            </div>
          </td>
          <td><button v-on:click="showFormColor(Color)" class="btn-show">Show</button></td>
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
  name: "TableColor",
  components: {},
  props: {
    listColors: {
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
    updateStatus(Color, event) {
      let checked = event.target.checked;
      if (checked) {
        Color.idStatus = this.GIA_TRI_TRANG_THAI.EXISTS;
        this.$store.dispatch("colorModule/saveColor", Color);
      } else {
        Color.idStatus = this.GIA_TRI_TRANG_THAI.DELETE;
        this.$store.dispatch("colorModule/saveColor", Color);
      }
    },
    showFormColor(Color) {
      this.$emit("clickShowFormColor", Color);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>