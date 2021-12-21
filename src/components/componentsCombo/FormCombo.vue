<template>
  <div class="form-tpf">
    <div class="row">
      <div class="col mt-4">
        <form @submit.prevent="saveCombo">
          <div class="form-group" v-show="false">
            <label>Id combo:</label>
            <input
              v-model="combo.idCombo"
              style="cursor: no-drop"
              class="form-control"
              disabled
            />
          </div>
          <div class="form-group">
            <label>Tên combo:</label>
            <input
              v-model="combo.nameCombo"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label>Giá combo:</label>
            <input
              v-model="combo.price"
              type="number"
              min="1"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label>Số lượng combo:</label>
            <input
              v-model="combo.quantity"
              type="number"
              class="form-control"
              min="1"
              required
            />
          </div>
          <div class="form-group">
            <label>Mô tả:</label>
            <textarea
              v-model="combo.descriptionCombo"
              type="number"
              class="form-control"
            />
          </div>
          <p class="lable-img">
            <label>Ảnh chính:</label>
            <label>Ảnh phụ 1:</label>
            <label>Ảnh phụ 2:</label>
          </p>
          <div class="img-combo">
            <div class="img-combo-unit mt-2">
              <div>
                <img
                  width="200"
                  id="uploadPreviewv1"
                  class="img-fluid rounded-start"
                  alt=""
                  :src="DO_MAIN + combo.frontPhoto"
                />
              </div>
              <div class="card-body">
                <button class="btn-upload">
                  <fa class="icon" :icon="['fas', 'file-upload']" /> Upload
                </button>
                <input
                  class="form-control input-file"
                  id="uploadImagev1"
                  type="file"
                  @change="onFileSelectedv1"
                />
              </div>
            </div>

            <div class="img-combo-unit mt-2">
              <div>
                <img
                  width="200"
                  id="uploadPreviewv2"
                  class="img-fluid rounded-start"
                  alt=""
                  :src="DO_MAIN + combo.backPhoto"
                />
              </div>
              <div class="card-body">
                <button class="btn-upload">
                  <fa class="icon" :icon="['fas', 'file-upload']" /> Upload
                </button>
                <input
                  class="form-control input-file"
                  id="uploadImagev2"
                  type="file"
                  @change="onFileSelectedv2"
                />
              </div>
            </div>

            <div class="img-combo-unit mt-2">
              <div>
                <img
                  width="200"
                  id="uploadPreviewv3"
                  class="img-fluid rounded-start"
                  alt=""
                  :src="DO_MAIN + combo.coverPhoto"
                />
              </div>
              <div class="card-body">
                <button class="btn-upload">
                  <fa class="icon" :icon="['fas', 'file-upload']" /> Upload
                </button>
                <input
                  class="form-control input-file"
                  id="uploadImagev3"
                  type="file"
                  @change="onFileSelectedv3"
                />
              </div>
            </div>
          </div>
          <div class="control">
            <button type="submit" class="btn btn-save">Lưu</button>
            <button v-on:click="resetForm" type="button" class="btn btn-reset">
              Làm tươi
            </button>
          </div>
        </form>
      </div>
      <div class="col">
        <h5>Sản phẩm có trong combo</h5>
        <div @click="showProductInCombo" class="btn btn-save">
          Thêm sản phẩm
        </div>
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
          <table class="table table-hover mt-4">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col"></th>
                <th scope="col">Tên</th>
                <th scope="col">Size,Màu</th>
                <th scope="col">Có thể tạo</th>
                <th scope="col">Giá</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in listProductInCombo" :key="product">
                <th scope="row">{{ getStt(index) }}</th>
                <td>
                  <img
                    width="80"
                    :src="DO_MAIN + product.productDetail.detailPhoto"
                  />
                </td>
                <td>{{ product.productDetail.nameProduct }}</td>
                <td>
                  {{
                    product.productDetail.size.nameSize +
                    ", " +
                    product.productDetail.color.nameColor
                  }}
                </td>
                <td>{{ product.productDetail.quantity }}</td>
                <td>{{ product.productDetail.price }}</td>
                <td>
                  <button @click="deleteProduct(index)" class="btn btn-danger">
                    xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="notify">
        <div
          id="popup1"
          v-if="isShowNotify"
          class="overlay"
          @click="closeNotify"
        ></div>
        <transition name="bounce">
          <div id="popup1" v-if="isShowNotify" class="popup">
            <h2>Thông báo:</h2>
            <a class="close" href="#" @click="closeNotify">&times;</a>
            <div class="content">
              {{ infoNotify }}
            </div>
          </div>
        </transition>
      </div>
      <div class="notifyv">
        <div
          id="popupv"
          v-if="isShowNotifyV"
          class="overlayv"
          @click="closeNotifyV"
        ></div>
        <transition name="bounce">
          <div id="popupv" v-if="isShowNotifyV" class="popupv">
            <a class="closev" href="#" @click="closeNotifyV">&times;</a>
            <div class="contentv">
              <table-product
                ref="TableProduct"
                @getListFollowPage="getListProduct"
                @addProduct="addProductInCombo"
              />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TableProduct from "@/components/componentsBill/TableProduct.vue";
import { DO_MAIN, GIA_TRI_TRANG_THAI } from "@/constants/constants";
export default {
  name: "FormCombo",
  components: { TableProduct },
  props: {},
  data() {
    return {
      DO_MAIN,
      isShowNotify: false,
      infoNotify: "",
      GIA_TRI_TRANG_THAI,
      isShowNotifyV: false,
      listProductInCombo: [],
      combo: {
        idCombo: null,
        nameCombo: "",
        price: null,
        idStatus: null,
        descriptionCombo: "",
        coverPhoto: null,
        frontPhoto: null,
        backPhoto: null,
        createAt: "",
        quantity: "",
        comboDetail: [
          {
            idComboDetail: null,
            idCombo: null,
            idProductDetail: null,
          },
        ],
      },
    };
  },
  computed: {},
  watch: {
    combo: {
      handler() {
        if (this.combo.nameCombo == " ") {
          this.combo.nameCombo = "";
        }
        if (this.combo.descriptionCombo == " ") {
          this.combo.descriptionCombo = "";
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    deleteProduct(index) {
      this.listProductInCombo.splice(index, 1);
    },
    resetForm() {
      this.listProductInCombo = [];
      this.combo = {
        idCombo: null,
        nameCombo: "",
        price: null,
        idStatus: null,
        descriptionCombo: "",
        coverPhoto: null,
        frontPhoto: null,
        backPhoto: null,
        createAt: "",
        quantity: "",
        comboDetail: [
          {
            idComboDetail: null,
            idCombo: null,
            idProductDetail: null,
          },
        ],
      };
    },
    getStt(index) {
      return index + 1;
    },
    closeNotifyV() {
      this.isShowNotifyV = false;
    },
    onFileSelectedv1(event) {
      this.combo.frontPhoto = event.target.files[0];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImagev1").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreviewv1").src = oFREvent.target.result;
      };
    },
    onFileSelectedv2(event) {
      this.combo.backPhoto = event.target.files[0];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImagev2").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreviewv2").src = oFREvent.target.result;
      };
    },
    onFileSelectedv3(event) {
      this.combo.coverPhoto = event.target.files[0];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImagev3").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreviewv3").src = oFREvent.target.result;
      };
    },
    showProductInCombo() {
      this.isShowNotifyV = true;
      this.getListProduct();
    },
    getListProduct() {
      this.$nextTick(() => {
        let payload = {
          sort: -1,
          idStatus: -1,
          idCategoryParent: -1,
          idCategoryChild: -1,
          idGender: -1,
          page: this.$refs["TableProduct"].pageableParent,
        };
        this.$store.dispatch("productModule/getListProduct", payload);
      });
    },
    addProductInCombo(Product) {
      this.isShowNotifyV = false;
      if (Product.quantity < 1) {
        this.isShowNotify = true;
        this.infoNotify = `Sản phẩm đã hết`;
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        return;
      }
      for (let i = 0; i < this.listProductInCombo.length; i++) {
        if (
          this.listProductInCombo[i].productDetail.idProductDetail ===
          Product.idProductDetail
        ) {
          return;
        }
      }
      this.listProductInCombo.push({
        idComboDetail: null,
        idCombo: this.combo.idCombo,
        productDetail: Product,
      });
    },

    async uploadFile(file) {
      const fd = new FormData();
      fd.append("file", file);
      let img;
      await this.$store.dispatch("productModule/uploadFile", fd).then((res) => {
        if (res) {
          img = res.data;
        }
      });
      return img;
    },
    closeNotify() {
      this.isShowNotify = false;
    },
    async saveCombo() {
      if (
        this.combo.frontPhoto == null ||
        this.combo.frontPhoto == null ||
        this.combo.coverPhoto == null
      ) {
        this.isShowNotify = true;
        this.infoNotify = "Bạn chưa chọn đủ ảnh";
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        return;
      }
      if (this.listProductInCombo && this.listProductInCombo.length == 0) {
        this.isShowNotify = true;
        this.infoNotify = "Bạn chưa chọn sản phẩm";
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        return;
      }
      if (this.listProductInCombo && this.listProductInCombo.length == 1) {
        this.isShowNotify = true;
        this.infoNotify = "Combo phải có ít nhất 2 sản phẩm";
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        return;
      }
      let today = new Date();
      let Month = today.getMonth() + 1;
      let day = today.getDate() >= 10 ? today.getDate() : "0" + today.getDate();
      let datestring = today.getFullYear() + "-" + Month + "-" + day;
      if (!this.combo.idCombo) {
        this.combo.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
        this.combo.createAt = datestring;
      }
      if (typeof this.combo.frontPhoto == "object") {
        this.combo.frontPhoto = await this.uploadFile(this.combo.frontPhoto);
      }
      if (typeof this.combo.backPhoto == "object") {
        this.combo.backPhoto = await this.uploadFile(this.combo.backPhoto);
      }
      if (typeof this.combo.coverPhoto == "object") {
        this.combo.coverPhoto = await this.uploadFile(this.combo.coverPhoto);
      }
      this.combo.comboDetail = [];
      this.listProductInCombo.forEach((item) => {
        this.combo.comboDetail.push({
          idComboDetail: item.idComboDetail,
          idCombo: item.idCombo ? item.idCombo : null,
          idProductDetail: item.productDetail.idProductDetail,
        });
      });
      let payload = {
        ...this.combo,
      };
      this.$store
        .dispatch("comboModule/saveCombo", payload)
        .then((res) => {
          if (res) {
            if (res.data.message == "Lưu combo thành công!") {
              if (this.combo.idStatus == 1) {
                this.infoNotify = "Lưu combo thành công, Trạng thái combo đang không tồn tại bạn vui lòng cập nhật trạng thái để combo được kích hoạt"
              } else {
                this.infoNotify = res.data.message;
              }
              this.isShowNotify = true;
              this.resetForm();
              this.$emit("getListCombo");
            } else {
              this.isShowNotify = true;
              this.infoNotify = res.data.message;
              if (this.isShowNotify) {
                setTimeout(this.closeNotify, 1000);
              }
            }
          }
        })
        .catch((err) => {
          if (err) {
            this.isShowNotify = true;
            this.infoNotify = "Tạo combo thất bại";
            if (this.isShowNotify) {
              setTimeout(this.closeNotify, 1000);
            }
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.control {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btn-upload {
  z-index: 998;
  width: 110px;
  height: 30px;
  background: transparent;
  border: 1px solid #1890ff;
  color: #1890ff;
  line-height: 1;
}
.input-file {
  position: relative;
  bottom: 28px;
  width: 150px;
  z-index: 999;
  opacity: 0;
}
.img-combo {
  display: flex;
  &-unit {
    img {
      width: 150px;
    }
  }
}
.table-product {
  display: flex;
  justify-content: space-between;
}
.my-custom-scrollbar {
  position: relative;
  height: 55vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #990033;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #d4aa70;
  }
}
.table-wrapper-scroll-y {
  display: block;
}
.lable-img {
  display: flex;
  margin-top: 10px;
  label {
    width: 28%;
  }
}
</style>