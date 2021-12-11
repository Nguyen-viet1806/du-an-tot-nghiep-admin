<template>
  <div>
    <h4>Bảng mặt hàng</h4>
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
          <div type="button" @click="search" class="btn btn-outline-primary cusor">
            Tìm kiếm
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <select
          class="form-select form-select-sm"
          aria-label="Default select example"
          v-model="idGender"
        >
          <option value="-1">Chọn giới tính</option>
          <option value="1">Nam</option>
          <option value="2">Nữ</option>
          <option value="3">Unisex</option>
        </select>
        <select
          class="form-select form-select-sm mt-2"
          aria-label="Default select example"
          v-model="idStatusParent"
        >
          <option value="-1">Chọn trạng thái</option>
          <option :value="GIA_TRI_TRANG_THAI.DELETE">Đã xóa</option>
          <option :value="GIA_TRI_TRANG_THAI.EXISTS">Tồn tại</option>
        </select>
      </div>
      <div class="col-md-4">
        <div class="row">
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            v-model="idCategoryParent"
          >
            <option value="-1">Chọn danh mục</option>
            <option
              v-for="CategoryParent in listCategoryParentExists"
              :key="CategoryParent"
              :value="CategoryParent.idCategory"
            >
              {{ CategoryParent.nameCategory }}
            </option>
          </select>
          <div class="col-md-8 mt-2">
            <select
              class="form-select form-select-sm"
              aria-label="Default select example"
              v-model="idCategoryChild"
              :disabled="isDisabledCategoryChild"
            >
              <option value="-1">Chọn thể loại</option>
              <option
                v-for="CategoryChild in danhSachCategoryChild"
                :key="CategoryChild"
                :value="CategoryChild.idCategory"
              >
                {{ CategoryChild.nameCategory }}
              </option>
            </select>
          </div>
          <div class="col-md-4 mt-2">
            <div
              type="button"
              class="btn btn-filter w-100 cusor"
              @click="getListProductParent(-1)"
            >
              Lọc
            </div>
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
              <th scope="col">Ảnh sản phẩm</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Danh mục</th>
              <th scope="col">Thể loại</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Mô tả</th>
              <th scope="col">
                <div class="btn-arrow-up" @click="getListProductParent(0)">
                  <fa class="icon" :icon="['fas', 'arrow-up']" /></div
                ><div
                  class="btn-arrow-down"
                  @click="getListProductParent(1)"
                >
                  <fa class="icon" :icon="['fas', 'arrow-down']" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-for="(Product, index) in listProductsParent" :key="Product">
            <tr>
              <th scope="row">{{ getSttParent(index) }}</th>
              <td>
                <img width="100" :src="DO_MAIN + Product.frontPhoto" /><img
                  width="100"
                  :src="DO_MAIN + Product.backPhoto"
                /><img width="100" :src="DO_MAIN + Product.coverPhoto" />
              </td>
              <td>{{ Product.nameProduct }}</td>
              <td>{{ Product.categoryParentDTO.nameCategory }}</td>
              <td>{{ Product.categoryChildDTO.nameCategory }}</td>
              <td>{{ Product.genderDTO.nameGender }}</td>
              <td>{{ Product.totalProduct }}</td>
              <td>{{ Product.descriptionProduct }}</td>
              <td>
                <div @click="getListChild(Product)" class="btn-show cusor">
                  Show
                </div>
              </td>
              <td></td>
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
    </div>
    <div class="row mt-4">
      <h4>Bảng sản phẩm</h4>
      <div class="row">
        <div class="col-md-4">
          <select
            class="form-select form-select-sm mt-4"
            aria-label="Default select example"
            v-model="idColor"
          >
            <option value="-1">Chọn màu</option>
            <option
              v-for="color in danhSachColor"
              :key="color"
              :value="color.idColor"
            >
              {{ color.nameColor }}
            </option>
          </select>
        </div>
        <div class="col-md-4">
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            v-model="idStatusChild"
          >
            <option value="-1">Chọn trạng thái</option>
            <option :value="GIA_TRI_TRANG_THAI.DELETE">Đã xóa</option>
            <option :value="GIA_TRI_TRANG_THAI.EXISTS">Tồn tại</option>
          </select>
          <select
            class="form-select form-select-sm mt-2"
            aria-label="Default select example"
            v-model="idTag"
          >
            <option value="-1">Chọn tag</option>
            <option :value="GIA_TRI_TAG.SALE">Sale</option>
            <option :value="GIA_TRI_TAG.HOT">Hot</option>
            <option :value="GIA_TRI_TAG.OUT_OF_STOCK">Hết hàng</option>
            <option :value="GIA_TRI_TAG.NOT_ENOUGH">Thiếu hàng</option>
          </select>
        </div>
        <div class="col-md-4">
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            v-model="idCategoryParentv"
            disabled
          >
            <option value="-1">Chọn danh mục</option>
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
                v-model="idSize"
                :disabled="isDisabledCategoryChildv"
              >
                <option value="-1">Chọn size</option>
                <option
                  v-for="size in danhSachSize"
                  :key="size"
                  :value="size.idSize"
                >
                  {{ size.nameSize }}
                </option>
              </select>
            </div>
            <div class="col-md-4 mt-2">
              <div
                type="button"
                class="btn btn-filter w-100 cusor"
                @click="getListChildSort(-1)"
              >
                Lọc
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col mt-4">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Ảnh màu</th>
              <th scope="col">Màu</th>
              <th scope="col">Size</th>
              <th scope="col">Giới tính</th>
              <th scope="col">tags</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Giá</th>
              <th scope="col">
                <div class="btn-arrow-up" @click="getListChildSort(0)">
                  <fa class="icon" :icon="['fas', 'arrow-up']" /></div
                ><div class="btn-arrow-down" @click="getListChildSort(1)">
                  <fa class="icon" :icon="['fas', 'arrow-down']" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody
            v-for="(Product, index) in listCategoryChildExists"
            :key="Product"
          >
            <tr>
              <th scope="row">{{ getSttChild(index) }}</th>
              <td><img width="100" :src="DO_MAIN + Product.detailPhoto" /></td>
              <td>{{ Product.color.nameColor }}</td>
              <td>{{ Product.size.nameSize }}</td>
              <td>
                {{
                  Product.idGender === 1
                    ? "Nam"
                    : Product.idGender === 2
                    ? "Nữ"
                    : "Unisex"
                }}
              </td>
              <td>{{ Product.listTag }}</td>
              <td>{{ Product.quantity }}</td>
              <td>{{ Product.price }}đ</td>
              <td>
            <div v-on:click.prevent="addProductInBill(Product)" class="btn-show cusor">
              Chọn sản phẩm
            </div>
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
import {
  GIA_TRI_TRANG_THAI,
  DO_MAIN,
  GIA_TRI_TAG,
} from "@/constants/constants";
import { mapGetters } from "vuex";
export default {
  name: "TableProductPay",
  components: {},
  props: {},
  data() {
    return {
      DO_MAIN,
      GIA_TRI_TAG,
      keyWordSearch: "",
      idStatusParent: -1,
      idStatusChild: -1,
      GIA_TRI_TRANG_THAI,
      pageableParent: 0,
      pageableChild: 0,
      idCategoryParent: -1,
      idCategoryParentv: -1,
      idCategoryChild: -1,
      idGender: -1,
      danhSachCategoryChild: [],
      danhSachColor: [],
      danhSachSize: [],
      isDisabledCategoryChild: true,
      isDisabledCategoryChildv: true,
      idColor: -1,
      idSize: -1,
      idTag: -1,
      idProduct: null,
    };
  },
  computed: {
    ...mapGetters({
      listProductsParent: "productModule/getListProductsParent",
      listCategoryParentExists: "categoryModule/getListCategoryParentExists",
      listCategoryChildExists: "productModule/getListProductsChild",
    }),
  },
  watch: {
    pageableParent() {
      (this.idStatusParent = -1),
        (this.idStatusChild = -1),
        (this.idCategoryParent = -1),
        (this.idCategoryParentv = -1),
        (this.idCategoryChild = -1),
        (this.idGender = -1),
        (this.idColor = -1),
        (this.idSize = -1),
        (this.idTag = -1),
        this.$emit("getListFollowPage");
    },
    pageableChild() {
      (this.idStatusChild = -1),
        (this.idCategoryParentv = -1),
        (this.idCategoryChild = -1),
        (this.idColor = -1),
        (this.idSize = -1),
        (this.idTag = -1),
        this.getListChildPage();
    },
    idCategoryParentv() {
      if (this.idCategoryParentv > 0) {
        this.isDisabledCategoryChildv = false;
        this.$store
          .dispatch(
            "sizeModule/getDanhSachSizeByCategory",
            Number(this.idCategoryParentv)
          )
          .then((res) => {
            if (res) {
              this.danhSachSize = res.data.data;
            }
          });
      } else if (this.idCategoryParentv < 0) {
        this.isDisabledCategoryChildv = true;
        this.danhSachSize = [];
        this.idSize = -1;
      }
    },
    idCategoryParent() {
      if (this.idCategoryParent > 0) {
        this.isDisabledCategoryChild = false;
        this.$store
          .dispatch(
            "categoryModule/getDanhSachCategoryChildExistsByParent",
            Number(this.idCategoryParent)
          )
          .then((res) => {
            if (res) {
              this.danhSachCategoryChild = res.data.data;
            }
          });
      } else if (this.idCategoryParent < 0) {
        this.isDisabledCategoryChild = true;
        this.danhSachCategoryChild = [];
        this.idCategoryChild = -1;
      }
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      if (this.idProduct === null) {
        this.$store.commit("productModule/SET_LIST_PRODUCTS_CHILD", []);
      }
      this.getColorExists();
      this.getCategoryExists();
    },
    addProductInBill(Product){
    this.$emit("addProduct", Product)
    },
    getCategoryExists() {
      this.$store.dispatch("categoryModule/getDanhSachCategoryParentExists");
    },
    search() {
      let payload = {
        name: this.keyWordSearch,
        page: this.pageableParent,
      };
      this.$store.dispatch("productModule/search", payload);
    },
    getListProductParent(sort = -1) {
      let payload = {
        sort: sort,
        idStatus:
          this.idStatusParent && this.idStatusParent === -1
            ? ""
            : this.idStatusParent,
        idCategoryParent:
          this.idCategoryParent && this.idCategoryParent === -1
            ? ""
            : this.idCategoryParent,
        idCategoryChild:
          this.idCategoryChild && this.idCategoryChild === -1
            ? ""
            : this.idCategoryChild,
        idGender: this.idGender && this.idGender === -1 ? "" : this.idGender,
        page: this.pageableParent,
      };
      this.$store
        .dispatch("productModule/getListProduct", payload)
        .then((res) => {
          if (res) {
            this.$store.commit("productModule/SET_LIST_PRODUCTS_CHILD", []);
          }
        });
    },
    getListChildSort(sort = -1) {
      let payload = {
        sort: sort,
        idProduct: this.idProduct ? this.idProduct : "",
        idStatus:
          this.idStatusChild && this.idStatusChild === -1
            ? ""
            : this.idStatusChild,
        idColor: this.idColor && this.idColor === -1 ? "" : this.idColor,
        idSize: this.idSize && this.idSize === -1 ? "" : this.idSize,
        idTag: this.idTag && this.idTag === -1 ? "" : this.idTag,
        page: this.pageableChild,
      };
      this.$store.dispatch("productModule/getListProductChild", payload);
    },
    getListChildPage() {
      let payload = {
        sort: -1,
        idProduct: this.idProduct ? this.idProduct : "",
        idStatus: "",
        idColor: "",
        idSize: "",
        idTag: "",
        page: this.pageableChild,
      };
      this.$store.dispatch("productModule/getListProductChild", payload);
    },
    getListChild(Product) {
      this.idProduct = Product.idProduct;
      this.idCategoryParentv = Product.categoryParentDTO.idCategory;
      let payload = {
        sort: -1,
        idProduct: Product.idProduct,
        idStatus: "",
        idColor: "",
        idSize: "",
        idTag: "",
        page: this.pageableChild,
      };
      this.$store.dispatch("productModule/getListProductChild", payload);
    },

    getSttParent(index) {
      return this.pageableParent !== 0
        ? index + this.pageableParent * 5 + 1
        : index + 1;
    },
    getSttChild(index) {
      return this.pageableParent !== 0
        ? index + this.pageableParent * 5 + 1
        : index + 1;
    },
    getColorExists() {
      this.$store.dispatch("colorModule/getDanhSachColorExists").then((res) => {
        if (res) {
          this.danhSachColor = res.data.data;
        }
      });
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
  },
};
</script>

<style lang="scss" scoped>
.cusor{
  cursor: pointer;
}
</style>