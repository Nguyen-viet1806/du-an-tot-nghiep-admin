<template>
  <div class="form-tpf">
    <div class="container">
      <div class="row">
        <div class="col-3">
          <form>
            <div class="form-group" v-show="false">
              <label>Id sản phẩm:</label>
              <input
                style="cursor: no-drop"
                class="form-control"
                disabled
                v-model="product.idProduct"
              />
            </div>
            <div class="form-group">
              <label>Tên sản phẩm:</label>
              <input
                type="text"
                class="form-control"
                v-model="product.nameProduct"
                :class="{ active: isErrNameProduct }"
              />
            </div>

            <div class="form-group">
              <label>Giới tính:</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="product.detailInProduct.idGender"
                :class="{ active: isErrGenderProduct }"
              >
                <option :value="Number(-1)">Chọn giới tính</option>
                <option :value="Number(1)">Nam</option>
                <option :value="Number(2)">Nữ</option>
                <option :value="Number(3)">Unisex</option>
              </select>
            </div>

            <div class="form-group">
              <label>Danh mục:</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="idDanhMuc"
                :class="{ active: isErrCategoryParent }"
              >
                <option value="-1">Chọn danh mục</option>
                <option
                  v-for="CategoryParent in isShow
                    ? listCategoryParentExists.filter(
                        (item) =>
                          item.idStatus == 2 || item.idCategory == idDanhMuc
                      )
                    : listCategoryParentExists.filter(
                        (item) => item.idStatus == 2
                      )"
                  :key="CategoryParent"
                  :value="CategoryParent.idCategory"
                  :disabled="CategoryParent.idStatus == 1"
                >
                  {{ CategoryParent.nameCategory }}
                  {{ CategoryParent.idStatus == 1 ? "(Đã xóa)" : "" }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Thể loại:</label>
              <select
                :disabled="isDisabledCategoryChild"
                class="form-select"
                aria-label="Default select example"
                v-model="product.detailInProduct.idCategory"
                :class="{ active: isErrCategoryChild }"
              >
                <option value="-1">Chọn thể loại</option>
                <option
                  v-for="CategoryChild in isShow
                    ? danhSachCategoryChild.filter(
                        (item) =>
                          item.idStatus == 2 ||
                          item.idCategory == product.detailInProduct.idCategory
                      )
                    : danhSachCategoryChild.filter(
                        (item) => item.idStatus == 2
                      )"
                  :key="CategoryChild"
                  :value="CategoryChild.idCategory"
                  :disabled="CategoryChild.idStatus == 1"
                >
                  {{ CategoryChild.nameCategory }}
                  {{ CategoryChild.idStatus == 1 ? "(Đã xóa)" : "" }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Mô tả:</label>
              <textarea
                class="form-control"
                id="floatingTextarea"
                v-model="product.descriptionProduct"
              ></textarea>
            </div>
            <label class="mt-2">Chọn ảnh:</label>
            <div
              :class="{ active: isErrFrontPhoto }"
              class="card mb-3 mt-3"
              style="max-width: 540px"
            >
              <div class="row g-0">
                <div class="col-md-5">
                  <img
                    :src="DO_MAIN + product.frontPhoto"
                    id="uploadPreviewv1"
                    class="img-fluid rounded-start"
                    alt=""
                  />
                </div>
                <div class="col-md-7">
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
              </div>
            </div>
            <div
              :class="{ active: isErrBackPhoto }"
              class="card mb-3 mt-3"
              style="max-width: 540px"
            >
              <div class="row g-0">
                <div class="col-md-5">
                  <img
                    :src="DO_MAIN + product.backPhoto"
                    id="uploadPreviewv2"
                    class="img-fluid rounded-start"
                    alt=""
                  />
                </div>
                <div class="col-md-7">
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
              </div>
            </div>
            <div
              :class="{ active: isErrCoverPhoto }"
              class="card mb-3 mt-3"
              style="max-width: 540px"
            >
              <div class="row g-0">
                <div class="col-md-5">
                  <img
                    :src="DO_MAIN + product.coverPhoto"
                    id="uploadPreviewv3"
                    class="img-fluid rounded-start"
                    alt=""
                  />
                </div>
                <div class="col-md-7">
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
            </div>
          </form>
        </div>
        <div class="col-9">
          <div class="add-products">
            <div
              class="add-products-color"
              v-for="(color, index) in product.detailInProduct
                .listDetailColorRequest"
              :key="color"
            >
              <h5>Màu</h5>
              <button
                class="btn-x"
                v-if="
                  index != 0 &&
                  product.detailInProduct.listDetailColorRequest[index]
                    .listSizeInColor[0].idProductDetail == null
                "
                v-on:click="remoteColor(index)"
              >
                <fa class="icon" :icon="['fas', 'times']" />
              </button>
              <div class="form-color">
                <div class="container">
                  <div class="row">
                    <div class="col-4">
                      <div class="form-group">
                        <label>Màu:</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          v-model="
                            product.detailInProduct.listDetailColorRequest[
                              index
                            ].idColor
                          "
                          :class="{
                            active:
                              product.detailInProduct.listDetailColorRequest[
                                index
                              ].idColor == -1 && isClickLuu,
                          }"
                        >
                          <option value="-1">Chọn màu</option>
                          <option
                            v-for="color in isShow
                              ? danhSachColor.filter(
                                  (item) =>
                                    item.idStatus == 2 ||
                                    item.idColor ==
                                      product.detailInProduct
                                        .listDetailColorRequest[index].idColor
                                )
                              : danhSachColor.filter(
                                  (item) => item.idStatus == 2
                                )"
                            :key="color.idColor"
                            :value="color.idColor"
                            :disabled="
                              checkDuplicateColor(color.idColor) ||
                              color.idStatus == 1
                            "
                          >
                            {{ color.nameColor }}
                            {{ color.idStatus == 1 ? "(Đã xóa)" : "" }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="form-group img-file">
                        <input
                          class="form-control input-filev"
                          :id="['uploadImage' + index]"
                          type="file"
                          @change="onFileSelected(index, $event)"
                        />
                      </div>
                    </div>
                    <div
                      class="col-4"
                      :class="{
                        active:
                          product.detailInProduct.listDetailColorRequest[index]
                            .detailPhoto == null && isClickLuu,
                      }"
                    >
                      <p
                        v-if="
                          product.detailInProduct.listDetailColorRequest[index]
                            .detailPhoto == null && isClickLuu
                        "
                      >
                        Bạn chưa chọn ảnh
                      </p>
                      <img
                        width="110"
                        :src="
                          DO_MAIN +
                          product.detailInProduct.listDetailColorRequest[index]
                            .detailPhoto
                        "
                        alt=""
                        :id="['uploadPreview' + index]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="size"
                v-for="(size, i) in product.detailInProduct
                  .listDetailColorRequest[index].listSizeInColor"
                :key="size"
              >
                <button
                  class="btn-x-v"
                  v-if="
                    i != 0 &&
                    product.detailInProduct.listDetailColorRequest[index]
                      .listSizeInColor[i].idProductDetail == null
                  "
                  v-on:click="remoteSize(i, index)"
                >
                  <fa class="icon" :icon="['fas', 'times']" />
                </button>
                <div class="form-size">
                  <p class="title-size">Size</p>
                  <div class="form-size-unit">
                    <label class="title">Size:</label>
                    <select
                      :disabled="isDisabledCategoryChild"
                      class="select-size"
                      aria-label="Default select example"
                      v-model="
                        product.detailInProduct.listDetailColorRequest[index]
                          .listSizeInColor[i].idSize
                      "
                      :class="{
                        active:
                          product.detailInProduct.listDetailColorRequest[index]
                            .listSizeInColor[i].idSize == -1 && isClickLuu,
                      }"
                    >
                      <option value="-1">Chọn size</option>
                      <option
                        v-for="size in isShow
                          ? danhSachSize.filter(
                              (item) =>
                                item.idStatus == 2 ||
                                item.idSize ==
                                  product.detailInProduct
                                    .listDetailColorRequest[index]
                                    .listSizeInColor[i].idSize
                            )
                          : danhSachSize.filter((item) => item.idStatus == 2)"
                        :key="size.idSize"
                        :value="size.idSize"
                        :disabled="
                          checkDuplicateSize(size.idSize, index) ||
                          size.idStatus == 1
                        "
                      >
                        {{ size.nameSize }}
                        {{ size.idStatus == 1 ? "(Đã xóa)" : "" }}
                      </option>
                    </select>
                  </div>

                  <div class="form-size-unit">
                    <label class="title">Giá:</label>
                    <input
                      type="number"
                      class="input-price"
                      v-model="
                        product.detailInProduct.listDetailColorRequest[index]
                          .listSizeInColor[i].price
                      "
                      @change="test(index, i)"
                      :class="{
                        active:
                          (product.detailInProduct.listDetailColorRequest[index]
                            .listSizeInColor[i].price == null ||
                            product.detailInProduct.listDetailColorRequest[
                              index
                            ].listSizeInColor[i].price?.length == 0) &&
                          isClickLuu,
                      }"
                    />
                  </div>

                  <div class="form-size-unit">
                    <label class="title-amout">Số lượng:</label>
                    <input
                      type="number"
                      class="input-amount"
                      min="1"
                      max="1000"
                      v-model="
                        product.detailInProduct.listDetailColorRequest[index]
                          .listSizeInColor[i].quantity
                      "
                      :class="{
                        active:
                          (product.detailInProduct.listDetailColorRequest[index]
                            .listSizeInColor[i].quantity == null ||
                            product.detailInProduct.listDetailColorRequest[
                              index
                            ].listSizeInColor[i].quantity?.length == 0) &&
                          isClickLuu,
                      }"
                    />
                  </div>
                </div>
              </div>
              <div v-on:click="addSize(index)" class="add-size">
                <fa class="icon" :icon="['fas', 'plus']" />
              </div>
            </div>
            <div class="add-color" v-on:click="addColor">
              <fa class="icon" :icon="['fas', 'plus']" />
            </div>
          </div>
        </div>
        <div class="control">
          <button type="button" class="btn btn-save" @click="saveProduct">
            Lưu
          </button>
          <button type="button" class="btn btn-reset" @click="resetForm">
            Làm tươi
          </button>
        </div>
        <div class="col">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GIA_TRI_TRANG_THAI, DO_MAIN } from "@/constants/constants";
import { mapGetters } from "vuex";
export default {
  name: "FormProduct",
  components: {},
  props: {},
  data() {
    return {
      isClickLuu: false,
      isErrNameProduct: false,
      isErrGenderProduct: false,
      isErrCategoryParent: false,
      isErrCategoryChild: false,
      isErrFrontPhoto: false,
      isErrBackPhoto: false,
      isErrCoverPhoto: false,
      isErrColor: false,
      isErrImageColor: false,
      isErrSize: false,
      isErrPrice: false,
      isErrQuantity: false,
      isShowNotify: false,
      checkFormValidate: false,
      infoNotify: "",
      DO_MAIN,
      GIA_TRI_TRANG_THAI,
      idDanhMuc: -1,
      isDisabledCategoryChild: true,
      product: {
        idProduct: null,
        nameProduct: "",
        dateCreate: null,
        totalProduct: 0,
        idStatus: null,
        descriptionProduct: "",
        frontPhoto: null,
        backPhoto: null,
        coverPhoto: null,
        detailInProduct: {
          idGender: -1,
          idCategory: -1,
          listDetailColorRequest: [
            {
              idColor: -1,
              detailPhoto: null,
              listSizeInColor: [
                {
                  dateCreate: null,
                  idProductDetail: null,
                  idSize: -1,
                  quantity: null,
                  price: null,
                  idSale: null,
                  idStatus: null,
                },
              ],
            },
          ],
        },
      },
      color: {
        idColor: -1,
        detailPhoto: null,
        listSizeInColor: [
          {
            dateCreate: null,
            idProductDetail: null,
            idSize: -1,
            quantity: null,
            price: null,
            idSale: null,
            idStatus: null,
          },
        ],
      },
      size: {
        dateCreate: null,
        idProductDetail: null,
        idSize: -1,
        quantity: null,
        price: null,
        idSale: null,
        idStatus: null,
      },
      danhSachCategoryChild: [],
      danhSachColor: [],
      danhSachSize: [],
      img: null,
    };
  },
  computed: {
    ...mapGetters({
      listCategoryParentExists: "categoryModule/getListCategoryParentExists",
    }),
    isShow() {
      return this.$route.query.isShow;
    },
  },
  watch: {
    idDanhMuc() {
      if (this.idDanhMuc > 0) {
        // let dsCategoryTemp = this.listCategoryParentExists.map(
        //   (item) => item.idCategory
        // );
        // if (!dsCategoryTemp.includes(this.idDanhMuc)) {
        //   this.$store
        //     .dispatch("categoryModule/getCategoryParentById", this.idDanhMuc)
        //     .then((res) => {
        //       if (res) {
        //           this.listCategoryParentExists.push(res.data)
        //       }
        //     });
        // }
        this.isDisabledCategoryChild = false;
        this.$store
          .dispatch(
            "categoryModule/getDanhSachCategoryChildExistsByParent",
            Number(this.idDanhMuc)
          )
          .then((res) => {
            if (res) {
              this.danhSachCategoryChild = res.data.data;
              // .filter(
              //   (item) => item.idStatus == 2
              // );
            }
          });
        this.$store
          .dispatch(
            "sizeModule/getDanhSachSizeByCategory",
            Number(this.idDanhMuc)
          )
          .then((res) => {
            if (res) {
              this.danhSachSize = res.data.data;
              // .filter(
              //   (item) => item.idStatus == 2
              // );
            }
          });
      } else if (this.idDanhMuc < 0) {
        this.isDisabledCategoryChild = true;
        this.danhSachCategoryChild = [];
        this.danhSachSize = [];
      }
    },
    product: {
      handler() {
        if (this.product.nameProduct == " ") {
          this.product.nameProduct = "";
        }
        if (this.product.nameProduct !== "") {
          this.isErrNameProduct = false;
        }
        if (this.product.detailInProduct.idGender !== -1) {
          this.isErrGenderProduct = false;
        }
        if (this.idDanhMuc !== -1) {
          this.isErrCategoryParent = false;
        }
        if (this.product.detailInProduct.idCategory !== -1) {
          this.isErrCategoryChild = false;
        }
        if (this.product.frontPhoto !== null) {
          this.isErrFrontPhoto = false;
        }
        if (this.product.backPhoto !== null) {
          this.isErrBackPhoto = false;
        }
        if (this.product.coverPhoto !== null) {
          this.isErrCoverPhoto = false;
        }
      },
      deep: true,
      immediate: true,
    },

    // "product.detailInProduct.listDetailColorRequest": {
    //   handler() {
    //     this.product.detailInProduct.listDetailColorRequest.forEach((item) => {
    //       if (item.idColor != null) {
    //         let dsColorTemp = this.danhSachColor.map((item) => item.idColor);
    //         if (!dsColorTemp.includes(item.idColor)) {
    //           if (item.idColor > 0) {
    //             this.$store
    //               .dispatch("colorModule/getColorById", item.idColor)
    //               .then((res) => {
    //                 if (res) {
    //                   this.danhSachColor.push(res.data.data);
    //                 }
    //               });
    //           }
    //         }
    //       }
    //       for (let index = 0; index < item.listSizeInColor.length; index++) {
    //         if (item.listSizeInColor[index].idSize != null) {
    //           let dsSizeTemp = this.danhSachSize.map((item) => item.idSize);
    //           if (!dsSizeTemp.includes(item.listSizeInColor[index].idSize)) {
    //             if (item.listSizeInColor[index].idSize > 0) {
    //               this.$store
    //                 .dispatch(
    //                   "sizeModule/getSizeById",
    //                   item.listSizeInColor[index].idSize
    //                 )
    //                 .then((res) => {
    //                   if (res) {
    //                     this.danhSachSize.push(res.data.data);
    //                   }
    //                 });
    //             }
    //           }
    //         }
    //       }
    //     });
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
  mounted() {
    this.initData();
    this.$router.push({ path: this.$route.path, query: { isShow: false } });
  },
  methods: {
    test(index, i) {
      this.product.detailInProduct.listDetailColorRequest[index]
        .listSizeInColor[i].price.indexOf("-") > 0
        
        
    },
    resetForm() {
      this.isClickLuu = false;
      this.$router.push({ path: this.$route.path, query: { isShow: false } });
      // this.getColorExists();
      this.idDanhMuc = -1;
      this.product = {
        idProduct: null,
        nameProduct: "",
        dateCreate: null,
        totalProduct: 0,
        idStatus: null,
        descriptionProduct: "",
        frontPhoto: null,
        backPhoto: null,
        coverPhoto: null,
        detailInProduct: {
          idGender: -1,
          idCategory: -1,
          listDetailColorRequest: [
            {
              idColor: -1,
              detailPhoto: null,
              listSizeInColor: [
                {
                  dateCreate: null,
                  idProductDetail: null,
                  idSize: -1,
                  quantity: null,
                  price: null,
                  idSale: null,
                  idStatus: null,
                },
              ],
            },
          ],
        },
      };
    },
    initData() {
      this.getColorExists();
    },
    closeNotify() {
      this.isShowNotify = false;
    },
    checkValidate() {
      if (this.product.nameProduct.trim() === "") {
        this.isErrNameProduct = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      if (this.product.detailInProduct.idGender === -1) {
        this.isErrGenderProduct = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      if (this.idDanhMuc === -1) {
        this.isErrCategoryParent = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      if (this.product.detailInProduct.idCategory === -1) {
        this.isErrCategoryChild = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      if (this.product.frontPhoto === null) {
        this.isErrFrontPhoto = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      if (this.product.backPhoto === null) {
        this.isErrBackPhoto = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      if (this.product.coverPhoto === null) {
        this.isErrCoverPhoto = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      if (this.idDanhMuc === -1) {
        this.isErrCategoryParent = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      if (this.product.detailInProduct.idCategory === -1) {
        this.isErrCategoryChild = true;
        this.isShowNotify = true;
        this.infoNotify = "Không để trống các trường màu đỏ !";
        this.checkFormValidate = false;
      }
      let checkThuocTinh = false;
      for (
        let i = 0;
        i < this.product.detailInProduct.listDetailColorRequest.length;
        i++
      ) {
        if (
          this.product.detailInProduct.listDetailColorRequest[i].idColor ==
            -1 ||
          this.product.detailInProduct.listDetailColorRequest[i].detailPhoto ==
            null
        ) {
          this.isShowNotify = true;
          this.infoNotify = "Không để trống các trường màu đỏ !";
          this.checkFormValidate = false;
          checkThuocTinh = true;
          break;
        } else {
          for (
            let j = 0;
            j <
            this.product.detailInProduct.listDetailColorRequest[i]
              .listSizeInColor.length;
            j++
          ) {
            if (
              this.product.detailInProduct.listDetailColorRequest[i]
                .listSizeInColor[j].idSize == -1 ||
              this.product.detailInProduct.listDetailColorRequest[i]
                .listSizeInColor[j].price == null ||
              this.product.detailInProduct.listDetailColorRequest[i]
                .listSizeInColor[j].price?.length == 0 ||
              this.product.detailInProduct.listDetailColorRequest[i]
                .listSizeInColor[j].quantity == null ||
              this.product.detailInProduct.listDetailColorRequest[i]
                .listSizeInColor[j].quantity?.length == 0
            ) {
              this.isShowNotify = true;
              this.infoNotify = "Không để trống các trường màu đỏ !";
              this.checkFormValidate = false;
              checkThuocTinh = true;
              break;
            }
          }
        }
      }
      if (
        !checkThuocTinh &&
        !this.isErrNamePro &&
        !this.isErrGenderProduct &&
        !this.isErrCategoryParent &&
        !this.isErrCategoryChild &&
        !this.isErrFrontPhoto &&
        !this.isErrBackPhoto &&
        !this.isErrCoverPhoto &&
        !this.isErrCategoryParent &&
        !this.isErrCategoryChild
      ) {
        this.checkFormValidate = true;
      }
    },
    getColorExists() {
      this.$store.dispatch("colorModule/getDanhSachColorExists").then((res) => {
        if (res) {
          this.danhSachColor = res.data.data;
          // .filter(
          //   (item) => item.idStatus == 2
          // );
        }
      });
    },
    checkDuplicateColor(idColor) {
      for (
        let i = 0;
        i < this.product.detailInProduct.listDetailColorRequest.length;
        i++
      ) {
        if (
          this.product.detailInProduct.listDetailColorRequest[i].idColor ===
          idColor
        ) {
          return true;
        }
      }
      return false;
    },
    checkDuplicateSize(idSize, index) {
      for (
        let i = 0;
        i <
        this.product.detailInProduct.listDetailColorRequest[index]
          .listSizeInColor.length;
        i++
      ) {
        if (
          this.product.detailInProduct.listDetailColorRequest[index]
            .listSizeInColor[i].idSize === idSize
        ) {
          return true;
        }
      }
      return false;
    },
    onFileSelectedv1(event) {
      // this.isPreviewImg = true;
      // this.isImg = false;
      this.product.frontPhoto = event.target.files[0];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImagev1").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreviewv1").src = oFREvent.target.result;
      };
    },
    onFileSelectedv2(event) {
      // this.isPreviewImg = true;
      // this.isImg = false;
      this.product.backPhoto = event.target.files[0];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImagev2").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreviewv2").src = oFREvent.target.result;
      };
    },
    onFileSelectedv3(event) {
      // this.isPreviewImg = true;
      // this.isImg = false;

      this.product.coverPhoto = event.target.files[0];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImagev3").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreviewv3").src = oFREvent.target.result;
      };
    },

    onFileSelected(index, event) {
      console.log(index, event);
      // this.isPreviewImg = true;
      // this.isImg = false;
      this.product.detailInProduct.listDetailColorRequest[index].detailPhoto =
        event.target.files[0];
      var oFReader = new FileReader();
      if (event.target.files[0]) {
        oFReader.readAsDataURL(
          document.getElementById("uploadImage" + index).files[0]
        );
        oFReader.onload = function () {
          document.getElementById("uploadPreview" + index).src =
            oFReader.result;
        };
      }
    },

    addColor() {
      let danhSachColorTemp = this.danhSachColor;
      if (
        this.product.detailInProduct.listDetailColorRequest?.length ==
        danhSachColorTemp.length
      ) {
        this.isShowNotify = true;
        this.infoNotify = "Không đủ màu để tạo tiếp sản phẩm !";
        return;
      }
      let colorTemp = {
        idColor: -1,
        detailPhoto: null,
        listSizeInColor: [
          {
            dateCreate: null,
            idProductDetail: null,
            idSize: -1,
            quantity: null,
            price: null,
            idSale: null,
            idStatus: null,
          },
        ],
      };
      this.product.detailInProduct.listDetailColorRequest.push({
        ...colorTemp,
      });
    },

    addSize(index) {
      let danhSachSizeTemp = this.danhSachSize;
      if (this.danhSachSize?.length == 0) {
        this.isShowNotify = true;
        this.infoNotify = "Bạn chưa chọn danh mục !! !";
        return;
      }
      if (
        this.product.detailInProduct.listDetailColorRequest[index]
          .listSizeInColor?.length == danhSachSizeTemp?.length
      ) {
        this.isShowNotify = true;
        this.infoNotify = "Không đủ size để tạo tiếp sản phẩm !! !";
        return;
      }
      let sizeTemp = { ...this.size };
      this.product.detailInProduct.listDetailColorRequest[
        index
      ].listSizeInColor.push(sizeTemp);
    },

    remoteColor(index) {
      // check k the xoa
      this.product.detailInProduct.listDetailColorRequest.splice(index, 1);
    },

    remoteSize(i, index) {
      // check k the xoa
      this.product.detailInProduct.listDetailColorRequest[
        index
      ].listSizeInColor.splice(i, 1);
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

    async saveProduct() {
      this.isClickLuu = true;
      this.checkValidate();
      if (!this.checkFormValidate) {
        return;
      }

      let today = new Date();
      let Month = today.getMonth() + 1;
      let day = today.getDate() >= 10 ? today.getDate() : "0" + today.getDate();
      let datestring = today.getFullYear() + "-" + Month + "-" + day;
      if (!this.product.idProduct) {
        this.product.idStatus = GIA_TRI_TRANG_THAI.EXISTS;
        this.product.dateCreate = datestring;
      }

      if (typeof this.product.frontPhoto == "object") {
        this.product.frontPhoto = await this.uploadFile(
          this.product.frontPhoto
        );
      }
      if (typeof this.product.backPhoto == "object") {
        this.product.backPhoto = await this.uploadFile(this.product.backPhoto);
      }
      if (typeof this.product.coverPhoto == "object") {
        this.product.coverPhoto = await this.uploadFile(
          this.product.coverPhoto
        );
      }

      let lenght = this.product.detailInProduct.listDetailColorRequest.length;
      for (let i = 0; i < lenght; i++) {
        if (
          typeof this.product.detailInProduct.listDetailColorRequest[i]
            .detailPhoto == "object"
        ) {
          this.product.detailInProduct.listDetailColorRequest[i].detailPhoto =
            await this.uploadFile(
              this.product.detailInProduct.listDetailColorRequest[i].detailPhoto
            );
        }
        for (
          let x = 0;
          x <
          this.product.detailInProduct.listDetailColorRequest[i].listSizeInColor
            .length;
          x++
        ) {
          if (
            !this.product.detailInProduct.listDetailColorRequest[i]
              .listSizeInColor[x].idProductDetail
          ) {
            this.product.detailInProduct.listDetailColorRequest[
              i
            ].listSizeInColor[x].idStatus = GIA_TRI_TRANG_THAI.EXISTS;
            this.product.detailInProduct.listDetailColorRequest[
              i
            ].listSizeInColor[x].dateCreate = datestring;
          }
        }
      }
      let payload = {
        ...this.product,
      };
      this.$store
        .dispatch("productModule/saveProduct", payload)
        .then((res) => {
          if (res) {
            this.isShowNotify = true;
            this.infoNotify = "Lưu sản phẩm thành công !! !";
            setTimeout(() => {
              this.isShowNotify = false;
              this.infoNotify = "";
            }, 1000);
            this.resetForm();
            this.$emit("getListFollowPage");
            this.$emit("getListFollowPage");
          }
        })
        .catch((err) => {
          if (err) {
            this.isShowNotify = true;
            this.infoNotify = "Tạo sản phẩm thất bại !! !";
            setTimeout(() => {
              this.isShowNotify = false;
              this.infoNotify = "";
            }, 1000);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.add-products {
  width: 100%;
  border: 1px solid #b0b7bd;
  height: 96vh;
  padding: 10px;
  overflow-y: auto;
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
  & .add-color {
    cursor: pointer;
    margin: 10px auto;
    width: 100px;
    height: 50px;
    background: #3399cc;
    text-align: center;
    line-height: 50px;
    color: white;
    font-size: 30px;
    border-radius: 5px;
    &:hover {
      color: #3399cc;
      background: white;
      border: 1px solid #3399cc;
    }
  }
  &-color {
    position: relative;
    margin-top: 20px;
    padding-left: 5px;
    padding-right: 5px;
    border: 2px dotted #990033;
    width: 100%;
    min-height: 220px;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    & h5 {
      position: relative;
      bottom: 10px;
      color: #990033;
      padding: 5px;
      margin: 0;
      margin-left: 45%;
      background: wheat;
    }
    & .btn-x {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background: #990033;
      border-radius: 50%;
      line-height: 20px;
      text-align: center;
      color: white;
      &:hover {
        color: #990033;
        background: white;
        border: 1px solid #990033;
      }
    }
    & .btn-x-v {
      position: absolute;
      top: 0;
      right: 5px;
      width: 20px;
      height: 20px;
      background: #990033;
      border-radius: 50%;
      line-height: 20px;
      text-align: center;
      color: white;
      &:hover {
        color: #990033;
        background: white;
        border: 1px solid #990033;
      }
    }
    & .form-color {
      border-bottom: 1px dotted gray;
      flex: 100%;
      max-width: 100%;
      height: 150px;
      padding-left: 10px;
      padding-right: 10px;
      color: #990033;
      & .img-file {
        margin-top: 22px;
      }
    }
    & .size {
      position: relative;
      margin-top: 10px;
      flex: 0 0 25%;
      max-width: 25%;
      height: 125px;
      padding-left: 4px;
      padding-right: 4px;
      & .form-size {
        background: #cdb99c;
        width: 100%;
        height: 100%;
        padding: 5px;
        color: #990033;
        & .title-size {
          background: white;
          position: relative;
          bottom: 12px;
          left: -8px;
          display: inline;
          padding: 3px;
        }
        & .form-size-unit {
          margin-top: 5px;
        }
        & .title {
          width: 20%;
        }
        & .title-amout {
          width: 50%;
        }
        & .select-size {
          width: 72%;
          border-radius: 0.25rem;
          margin-left: 10px;
          &:disabled {
            background-color: #e9ecef;
          }
        }
        & .input-price {
          width: 75%;
          border-radius: 0.25rem;
          margin-left: 5px;
          padding-left: 5px;
        }
        & .input-amount {
          width: 45%;
          border-radius: 0.25rem;
          margin-left: 5px;
          padding-left: 5px;
        }
      }
    }
    & .add-size {
      cursor: pointer;
      margin-top: 10px;
      margin-left: 10px;
      background: #3399cc;
      flex: 0 0 8.33333%;
      max-width: 8.33333%;
      height: 70px;
      padding-left: 4px;
      padding-right: 4px;
      text-align: center;
      padding-top: 25px;
      color: white;
      border-radius: 5px;
      &:hover {
        color: #3399cc;
        background: white;
        border: 1px solid #3399cc;
      }
      & .icon {
        font-size: 20px;
      }
    }
  }
}
.form-group {
  padding-top: 10px;
}
.control {
  padding-left: 45%;
}
.input-file {
  position: relative;
  bottom: 28px;
  width: 150px;
  z-index: 999;
  opacity: 0;
}
.card {
  padding: 2px;
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
</style>