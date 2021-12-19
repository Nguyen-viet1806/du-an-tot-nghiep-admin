<template>
  <div class="form-tpf">
    <form @submit.prevent="saveBill">
      <div class="row">
        <div class="col mt-4">
          <div class="row">
            <div class="col">
              <div class="form-group" v-show="false">
                <label>Id bill:</label>
                <input
                  v-model="bill.idBill"
                  style="cursor: no-drop"
                  class="form-control"
                  disabled
                />
              </div>
              <!-- <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Tên người mua:</label
                >
                <input
                  v-model="bill.emailUser"
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  required
                />
              </div> -->
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Số điện thoại:</label
                >
                <input
                  v-model="bill.phoneUser"
                  type="number"
                  class="form-control"
                  id="validationCustom01"
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Email:</label
                >
                <input
                  v-model="bill.emailUser"
                  type="email"
                  class="form-control"
                  id="validationCustom01"
                />
              </div>
              <div class="form-group mt-1">
                <label for="validationCustom04" class="form-label"
                  >Trạng thái đơn hàng:</label
                >
                <select
                  v-model="bill.idStatus"
                  class="form-select"
                  id="validationCustom04"
                  required
                >
                  <option selected value="">Chọn trạng thái đơn hàng</option>
                  <option :value="GIA_TRI_TRANG_THAI.PROCESSING">
                    Đang xử lý
                  </option>
                  <option :value="GIA_TRI_TRANG_THAI.PAID">
                    Đã thanh toán
                  </option>
                  <option :value="GIA_TRI_TRANG_THAI.CANCE">Hủy</option>
                </select>
              </div>
              <div class="form-group mt-1">
                <label for="validationCustom04" class="form-label">Tỉnh:</label>
                <select
                  v-model="bill.addressRequestDTO.idProvince"
                  class="form-select"
                  id="validationDefault04"
                >
                  <option selected value="">Chọn tỉnh</option>
                  <option
                    v-for="Province in listProvince"
                    :key="Province"
                    :value="Province.idProvince"
                  >
                    {{ Province.nameProvince }}
                  </option>
                </select>
              </div>
              <div class="form-group mt-1">
                <label for="validationCustom04" class="form-label"
                  >Quận,huyện:</label
                >
                <select
                  :disabled="isDisabledDistrict"
                  v-model="bill.addressRequestDTO.idDistrict"
                  class="form-select"
                  id="validationDefault04"
                >
                  <option selected value="">Chọn quận, huyện</option>
                  <option
                    v-for="District in listDistrict"
                    :key="District"
                    :value="District.idDistrict"
                  >
                    {{ District.nameDistrict }}
                  </option>
                </select>
              </div>
              <div class="form-group mt-1">
                <label for="validationCustom04" class="form-label">Xã:</label>
                <select
                  :disabled="isDisabledCommune"
                  v-model="bill.addressRequestDTO.idCommune"
                  class="form-select"
                  id="validationDefault04"
                >
                  <option selected value="">Chọn xã</option>
                  <option
                    v-for="Commune in listCommune"
                    :key="Commune"
                    :value="Commune.idCommune"
                  >
                    {{ Commune.nameCommune }}
                  </option>
                </select>
              </div>
              <div class="form-group mt-1">
                <label for="validationTextarea" class="form-label"
                  >Địa chỉ cụ thể:</label
                >
                <textarea
                  class="form-control"
                  id="validationTextarea"
                  placeholder="Số nhà, ngõ"
                  v-model="bill.addressRequestDTO.detailAddress"
                ></textarea>
              </div>
              <p class="mt-4 text-center" v-if="bill.billType != 0">
                <input type="checkbox" v-model="isSuDungDiaChiCuaHang" /> Sử
                dụng địa chỉ cửa hàng
              </p>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Ngày tạo:</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="validationCustom01"
                  v-model="bill.dateCreate"
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Ngày giao thành công:</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="validationCustom01"
                  v-model="bill.dateSuccess"
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Voucher:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  v-model="bill.idVoucher"
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Phí ship:</label
                >
                <input
                  type="number"
                  min="1"
                  class="form-control"
                  id="validationCustom01"
                  v-model="bill.transportFee"
                  :disabled="!isNhanVienTaoHoaDon"
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Đặt cọc:</label
                >
                <input
                  type="number"
                  min="1"
                  class="form-control"
                  id="validationCustom01"
                  v-model="bill.deposit"
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Số tiền còn lại:</label
                >
                <input
                  type="number"
                  min="1"
                  class="form-control"
                  id="validationCustom01"
                  v-model="bill.payment"
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Tổng tiền:</label
                >
                <input
                  type="number"
                  min="1"
                  class="form-control"
                  id="validationCustom01"
                  v-model="bill.total"
                  required
                />
              </div>
              <div class="form-group mt-1">
                <label for="validationTextarea" class="form-label"
                  >Mô tả:</label
                >
                <textarea
                  class="form-control mota"
                  id="validationTextarea"
                  v-model="bill.descriptionBill"
                ></textarea>
              </div>
              <div class="control">
                <button type="submit" class="btn btn-save">Lưu</button>
                <button
                  v-on:click="resetForm"
                  type="button"
                  class="btn btn-reset"
                >
                  Làm tươi
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <h5>Sản phẩm có trong hóa đơn</h5>
          <div class="table-product">
            <div @click="showProductInBill" class="btn btn-save">
              Thêm sản phẩm
            </div>
            <div @click="showComboInBill" class="btn btn-info">Thêm combo</div>
          </div>
          <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table class="table table-hover mt-4">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col"></th>
                  <th scope="col">Tên</th>
                  <th scope="col">Size,Màu</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Hàng còn</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(bill, index) in listProductInBill" :key="bill">
                  <th scope="row">{{ getStt(index) }}</th>
                  <td>
                    <img
                      width="80"
                      :src="DO_MAIN + bill.productChildResponseDTO.detailPhoto"
                    />
                  </td>
                  <td>{{ bill.productChildResponseDTO.nameProduct }}</td>
                  <td>
                    {{
                      bill.productChildResponseDTO.size.nameSize +
                      ", " +
                      bill.productChildResponseDTO.color.nameColor
                    }}
                  </td>
                  <td>
                    <input
                      class="input-quantity"
                      type="number"
                      min="1"
                      :max="bill.productChildResponseDTO.quantity"
                      v-model="bill.quantity"
                      @change="checkQuantity(index, $event)"
                      required
                    />
                  </td>
                  <td>
                    {{ bill.productChildResponseDTO.quantity }}
                  </td>

                  <td>{{ bill.price }}</td>
                  <td>
                    <div class="btn btn-danger" @click="deleteProduct(index)">
                      Xóa
                    </div>
                  </td>
                </tr>
                <tr
                  v-for="(bill, index) in listComboInBill.length <= 0
                    ? []
                    : listComboInBill"
                  :key="bill"
                >
                  <th scope="row">{{ getStt(index) }}</th>
                  <td>
                    <img
                      width="80"
                      :src="DO_MAIN + bill.comboResponseDTO.frontPhoto"
                    />
                  </td>
                  <td>Combo:{{ bill.comboResponseDTO.nameCombo }}</td>
                  <td>
                    {{ bill.comboResponseDTO.descriptionCombo }}
                  </td>
                  <td>
                    <input
                      class="input-quantity"
                      type="number"
                      min="1"
                      :max="bill.comboResponseDTO.quantity"
                      v-model="bill.quantity"
                      @change="checkQuantityCombo(index,$event)"
                      required
                    />
                  </td>
                  <td>
                    {{ bill.comboResponseDTO.quantity }}
                  </td>
                  <td>{{ bill.price }}</td>
                  <td>
                    <div class="btn btn-danger" @click="deleteCombo(index)">
                      Xóa
                    </div>
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
                <table-product-pay
                  ref="TableProduct"
                  @getListFollowPage="getListProduct"
                  @addProduct="addProductInBill"
                />
              </div>
            </div>
          </transition>
        </div>
        <div class="notifyv">
          <div
            id="popupv"
            v-if="isShowNotifyV1"
            class="overlayv"
            @click="closeNotifyV1"
          ></div>
          <transition name="bounce">
            <div id="popupv" v-if="isShowNotifyV1" class="popupv">
              <a class="closev" href="#" @click="closeNotifyV1">&times;</a>
              <div class="contentv">
                <table-combo-pay
                  ref="TableProduct"
                  @addComboInBill="addComboInBill"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import TableProductPay from "@/components/componentsPay/TableProductPay.vue";
import TableComboPay from "@/components/componentsPay/TableComboPay.vue";
import { GIA_TRI_TRANG_THAI, DO_MAIN } from "@/constants/constants";
export default {
  name: "Formpay",
  components: { TableProductPay, TableComboPay },
  props: {},
  data() {
    return {
      isSuDungDiaChiCuaHang: false,
      isNhanVienTaoHoaDon: true,
      pageable: 0,
      DO_MAIN,
      GIA_TRI_TRANG_THAI,
      isShowNotify: false,
      infoNotify: "",
      isShowNotifyV: false,
      isShowNotifyV1: false,
      isDisabledDistrict: true,
      isDisabledCommune: true,
      listProvince: [],
      listDistrict: [],
      listCommune: [],
      listProductInBill: [],
      listComboInBill: [],
      bill: {
        idBill: null,
        idUser: null,
        idAddress: null,
        phoneUser: "",
        emailUser: "",
        dateCreate: null,
        dateSuccess: null,
        descriptionBill: "",
        total: 0,
        deposit: 0,
        payment: 0,
        transportFee: 30000,
        idVoucher: null,
        idStatus: "",
        billType: null,
        listProductDetail: [],
        listCombo: [],
        addressRequestDTO: {
          idAddress: null,
          idProvince: "",
          idDistrict: "",
          idCommune: "",
          detailAddress: "",
        },
      },
    };
  },
  computed: {},
  watch: {
    isSuDungDiaChiCuaHang() {
      if (this.isSuDungDiaChiCuaHang) {
        this.bill.addressRequestDTO = {
          idAddress: null,
          idProvince: 2,
          idDistrict: 27,
          idCommune: 379,
          detailAddress: "Số 2 ngõ 17",
        };
      } else {
        this.bill.addressRequestDTO = {
          idAddress: null,
          idProvince: "",
          idDistrict: "",
          idCommune: "",
          detailAddress: "",
        };
      }
    },
    "bill.addressRequestDTO.idProvince": {
      handler() {
        if (
          this.bill.addressRequestDTO.idProvince.length > 0 ||
          this.bill.addressRequestDTO.idProvince != ""
        ) {
          this.isDisabledDistrict = false;
          this.$store
            .dispatch("billModule/getDanhSachQuanHuyen", {
              idProvince: Number(this.bill.addressRequestDTO.idProvince),
            })
            .then((res) => {
              if (res) {
                this.listDistrict = res.data.data;
              }
            });
        } else if (
          this.bill.addressRequestDTO.idProvince.length == 0 ||
          this.bill.addressRequestDTO.idProvince == ""
        ) {
          this.isDisabledDistrict = true;
          this.listDistrict = [];
        }
      },
      deep: true,
    },
    "bill.addressRequestDTO.idDistrict": {
      handler() {
        if (
          this.bill.addressRequestDTO.idDistrict.length > 0 ||
          this.bill.addressRequestDTO.idDistrict != ""
        ) {
          this.isDisabledCommune = false;
          this.$store
            .dispatch("billModule/getDanhSachXa", {
              idDistrict: Number(this.bill.addressRequestDTO.idDistrict),
              idProvince: Number(this.bill.addressRequestDTO.idProvince),
            })
            .then((res) => {
              if (res) {
                this.listCommune = res.data.data;
              }
            });
        } else if (
          this.bill.addressRequestDTO.idDistrict.length == 0 ||
          this.bill.addressRequestDTO.idDistrict == ""
        ) {
          this.isDisabledCommune = true;
          this.listCommune = [];
        }
      },
      deep: true,
    },
    "bill.billType": {
      handler() {
        if (this.bill.billType == 0) {
          this.isNhanVienTaoHoaDon = false;
        }
      },
      deep: true,
    },
    isNhanVienTaoHoaDon() {
      if (!this.isNhanVienTaoHoaDon) {
        this.bill.transportFee = 30000;
      }
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    checkQuantity(index, e) {
      if (Number(e.target.value) < 1) {
        this.isShowNotify = true;
        this.infoNotify = `Số lượng tối thiểu mua là :1`;
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        this.listProductInBill[index].quantity = 1;
      } else if (
        Number(e.target.value) >
        this.listProductInBill[index].productChildResponseDTO.quantity
      ) {
        this.isShowNotify = true;
        this.infoNotify = `Số lượng tối đa có thể mua là: ${this.listProductInBill[index].productChildResponseDTO.quantity}`;
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        this.listProductInBill[index].quantity =
          this.listProductInBill[index].productChildResponseDTO.quantity;
      }
    },
    checkQuantityCombo(index, e) {
      if (Number(e.target.value) < 1) {
        this.isShowNotify = true;
        this.infoNotify = `Số lượng tối thiểu mua là :1`;
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        this.listComboInBill[index].quantity = 1;
      } else if (
        Number(e.target.value) >
        this.listComboInBill[index].comboResponseDTO.quantity
      ) {
        this.isShowNotify = true;
        this.infoNotify = `Số lượng tối đa có thể mua là: ${this.listComboInBill[index].comboResponseDTO.quantity}`;
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        this.listComboInBill[index].quantity =
          this.listComboInBill[index].comboResponseDTO.quantity;
      }
    },
    initData() {
      this.getListTinh();
    },
    showProductInBill() {
      this.isShowNotifyV = true;
      this.getListProduct();
    },
    addProductInBill(Product) {
      this.isShowNotifyV = false;
      if (Product.quantity < 1) {
        this.isShowNotify = true;
        this.infoNotify = `Sản phẩm đã hết`;
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        return;
      }
      for (let i = 0; i < this.listProductInBill.length; i++) {
        if (
          this.listProductInBill[i].productChildResponseDTO.idProductDetail ===
          Product.idProductDetail
        ) {
          this.listProductInBill[i].quantity += 1;
          return;
        }
      }
      this.listProductInBill.push({
        idBill: this.bill.idBill,
        idBillProduct: null,
        idStatus: 2,
        price: Product.price,
        productChildResponseDTO: { ...Product },
        quantity: 1,
      });
    },
    deleteProduct(index) {
      this.listProductInBill.splice(index, 1);
    },
    deleteCombo(index) {
      this.listComboInBill.splice(index, 1);
    },
    showComboInBill() {
      this.isShowNotifyV1 = true;
    },
    addComboInBill(Combo) {
      this.isShowNotifyV1 = false;
      if (Combo.quantity < 1) {
        this.isShowNotify = true;
        this.infoNotify = `Combo đã hết`;
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        return;
      }
      for (let i = 0; i < this.listComboInBill.length; i++) {
        if (
          this.listComboInBill[i].comboResponseDTO.idCombo === Combo.idCombo
        ) {
          this.listComboInBill[i].quantity += 1;
          return;
        }
      }
      this.listComboInBill.push({
        idBill: this.bill.idBill,
        idBillProduct: null,
        idStatus: 2,
        price: Combo.price,
        comboResponseDTO: { ...Combo },
        quantity: 1,
      });
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
    closeNotify() {
      this.isShowNotify = false;
    },
    closeNotifyV() {
      this.isShowNotifyV = false;
    },
    closeNotifyV1() {
      this.isShowNotifyV1 = false;
    },
    getStt(index) {
      return index + 1;
    },
    resetForm() {
      this.isSuDungDiaChiCuaHang = false;
      this.listProductInBill = [];
      this.listComboInBill = [];
      this.bill = {
        idBill: null,
        idUser: null,
        idAddress: null,
        phoneUser: "",
        emailUser: "",
        dateCreate: null,
        dateSuccess: null,
        descriptionBill: "",
        total: 0,
        deposit: 0,
        payment: 0,
        transportFee: 30000,
        idVoucher: null,
        idStatus: "",
        listProductDetail: [],
        listCombo: [],
        addressRequestDTO: {
          idAddress: null,
          idProvince: "",
          idDistrict: "",
          idCommune: "",
          detailAddress: "",
        },
      };
    },
    getListTinh() {
      this.$store.dispatch("billModule/getDanhSachTinh").then((res) => {
        if (res) {
          this.listProvince = res.data.data;
        }
      });
    },
    saveBill() {
      if (
        this.listProductInBill.length == 0 &&
        this.listComboInBill.length == 0
      ) {
        this.isShowNotify = true;
        this.infoNotify = "Bạn chưa chọn sản phẩm";
        if (this.isShowNotify) {
          setTimeout(this.closeNotify, 1000);
        }
        return;
      }
      if (this.isNhanVienTaoHoaDon) {
        this.bill.billType = 1;
      }
      this.bill.listProductDetail = [];
      this.bill.listCombo = [];
      this.listProductInBill.forEach((item) => {
        if (
          item.productChildResponseDTO.idProductDetail &&
          item.productChildResponseDTO.idProductDetail != null
        ) {
          this.bill.listProductDetail.push({
            idProductDetail: item.productChildResponseDTO.idProductDetail,
            quantity: item.quantity,
            idStatus: item.idStatus,
          });
        }
      });

      this.listComboInBill.forEach((item) => {
        if (
          item.comboResponseDTO.idCombo &&
          item.comboResponseDTO.idCombo != null
        ) {
          this.bill.listCombo.push({
            idCombo: item.comboResponseDTO.idCombo,
            quantity: item.quantity,
            idStatus: item.idStatus,
          });
        }
      });

      let payload = {
        ...this.bill,
        idUser: JSON.parse(localStorage.getItem("UserInfo")).idUser,
      };
      this.$store.dispatch("billModule/saveBill", payload).then((res) => {
        if (res) {
          this.resetForm()
          this.$emit("getListBill");
          this.isShowNotify = true;
          this.infoNotify = "Lưu bill thành công";
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
  justify-content: center;
  align-items: center;
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
.input-quantity {
  width: 50px;
  text-align: center;
  border: 1px solid gray;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
}
.mota {
  min-height: 80px;
}
</style>