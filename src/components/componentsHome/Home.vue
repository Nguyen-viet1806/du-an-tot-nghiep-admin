<template>
  <div class="vgrid table-tpf">
    <h5>Bảng thống kê tháng</h5>
    <div class="thangNam">
      <label> Tháng </label>
      <select
        class="form-select form-select-sm thang"
        aria-label="Default select example"
        v-model="month"
      >
        <option v-for="item in listThang" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <label> Năm </label>
      <select
        class="form-select form-select-sm nam"
        aria-label="Default select example"
        v-model="year"
      >
        <option v-for="item in listNam" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <button @click="getListHome" type="button" class="btn btn-filter loc">
        Lọc
      </button>
    </div>
    <div class="row mt-4">
      <div class="col">
        <p class="title-table">Top sản phẩm có lượt mua nhiều của tháng:</p>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Số lượng</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in listHome.topProductHot" :key="item">
            <tr>
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.nameProduct }}</td>
              <td>{{ item.quantityProduct }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <p class="title-table">Tổng hợp combo mua nhiều của tháng:</p>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên combo</th>
              <th scope="col">Số lượng</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in listHome.topComboHot" :key="item">
            <tr>
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.nameStatus }}</td>
              <td>{{ item.totalBill }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <p class="title-table">Tổng hợp trạng đơn hàng của tháng:</p>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên trạng thái</th>
              <th scope="col">Số lượng</th>
            </tr>
          </thead>
          <tbody
            v-for="(item, index) in listHome.summaryStatusBill"
            :key="item"
          >
            <tr>
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.nameStatus }}</td>
              <td>{{ item.totalBill }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <p class="title-table">Top người mua của tháng:</p>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên người mua</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Số lượng sản phẩm</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in listHome.topUserBuy" :key="item">
            <tr>
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.firthName + " " + item.lastName }}</td>
              <td>{{ item.totalBuy }}</td>
              <td>{{ item.quantityBill }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  props: {},
  data() {
    return {
      month: null,
      year: null,
      listHome: {},
    };
  },
  computed: {
    listThang() {
      let listThangTemp = [];
      for (let i = 1; i < 13; i++) {
        listThangTemp.push(i);
      }
      return listThangTemp;
    },
    listNam() {
      let now = new Date();
      let namHienTai = now.getFullYear();
      let listNamTemp = [];
      for (let i = namHienTai - 5; i <= namHienTai; i++) {
        listNamTemp.unshift(i);
      }
      return listNamTemp;
    },
  },
  watch: {},
  mounted() {
    let now = new Date();
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();
    this.getListHome();
  },
  methods: {
    getListHome() {
      let payload = {
        month: this.month,
        year: this.year,
      };
      this.$store.dispatch("loginRegisterModule/home", payload).then((res) => {
        if (res) {
          this.listHome = res.data.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title-table {
  font-size: 16px;
  padding: 4px;
}
.thang {
  width: 40%;
}
.nam {
  margin-left: 10px;
  width: 40%;
}
.thangNam {
  display: flex;
}
.loc {
  margin-left: 10px;
}
label{
  margin-left: 10px;
  padding: 2px;
}
</style>