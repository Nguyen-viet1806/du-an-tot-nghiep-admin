<template>
  <div class="table-tpf">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên Size</th>
          <th scope="col">Xóa/Khôi phục</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="(Size, index) in listSizes" :key="Size.idSize">
        <tr>
          <th scope="row">{{ getStt(index) }}</th>
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
    listSizes: {
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
    getStt(index){
    return this.pageable !== 0 ?  index + (this.pageable * 5) + 1 :  index + 1
    },
    pageNext() {
      this.pageable++;
    },
    pagePre() {
      if (this.pageable > 0) {
        this.pageable--;
      }
    },
    showFormSize(size) {
      this.$emit("clickShowFormSize", size);
    },
    updateStatus(size, event) {
      let checked = event.target.checked;
      if (checked) {
        size.idStatus = this.GIA_TRI_TRANG_THAI.EXISTS;
        this.$store.dispatch("sizeModule/saveSize", size);
      } else {
        size.idStatus = this.GIA_TRI_TRANG_THAI.DELETE;
        this.$store.dispatch("sizeModule/saveSize", size);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>