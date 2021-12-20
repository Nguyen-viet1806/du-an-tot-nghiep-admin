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
                  v-model="bill.nameUser"
                  type="text"
                  class="form-control"
                  id="validationCustom01"
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
                  required
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
                  :disabled="idStatusOfBill == GIA_TRI_TRANG_THAI.PAID"
                >
                  <option selected value="">Chọn trạng thái đơn hàng</option>
                  <option :value="GIA_TRI_TRANG_THAI.PROCESSING">
                    Đang xử lý
                  </option>
                  <option :value="GIA_TRI_TRANG_THAI.CONFIRMED">
                    Đã xác nhận
                  </option>
                  <option :value="GIA_TRI_TRANG_THAI.DELIVERY">
                    Đang giao
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
                  required
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
                  required
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
                  required
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
                  required
                ></textarea>
              </div>
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
                  disabled
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Voucher:</label
                >
                <input
                  disabled
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
                  class="form-control"
                  id="validationCustom01"
                  v-model="bill.transportFee"
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Đặt cọc:</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="validationCustom01"
                  v-model="bill.deposit"
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Tổng tiền:</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="validationCustom01"
                  v-model="bill.total"
                  disabled
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Số tiền còn lại:</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="validationCustom01"
                  v-model="bill.payment"
                  disabled
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
              <p
                v-if="
                  idStatusOfBill == GIA_TRI_TRANG_THAI.PAID &&
                  idStatusOfBill == GIA_TRI_TRANG_THAI.CANCE
                "
                class="text-red"
              >
                Không thể sửa hóa đơn khi ở trạng thái này!
              </p>
              <div class="control">
                <button
                  v-if="
                    bill.idBill &&
                    idStatusOfBill != GIA_TRI_TRANG_THAI.PAID &&
                    idStatusOfBill != GIA_TRI_TRANG_THAI.CANCE
                  "
                  type="submit"
                  class="btn btn-save"
                >
                  Lưu
                </button>
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
          <h5>Sản phẩm có trong hóa đơn:</h5>
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
                  <th scope="col">Có thể mua</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(bill, index) in listProductInBill.length <= 0
                    ? []
                    : listProductInBill"
                  :key="bill"
                >
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
                      v-model="bill.quantity"
                      @change="checkQuantity(index, $event)"
                      required
                    />
                  </td>
                  <td>
                    {{ bill.productChildResponseDTO.quantity }}
                  </td>

                  <td>
                    {{new Intl.NumberFormat("de-DE").format(bill.price)  }}đ
                    <p v-if="bill.productChildResponseDTO.listTag?.includes(1)">
                      <span class="badge bg-warning text-dark">Đang sale</span>
                    </p>
                  </td>
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
                      v-model="bill.quantity"
                      @change="checkQuantityCombo(index, $event)"
                      required
                    />
                  </td>
                  <td>
                    {{ bill.comboResponseDTO.quantity }}
                  </td>
                  <td>{{ new Intl.NumberFormat("de-DE").format(bill.price)  }}đ</td>
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
                <table-product
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
                <table-combo
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
import TableProduct from "@/components/componentsBill/TableProduct.vue";
import TableCombo from "@/components/componentsBill/TableCombo.vue";
import { GIA_TRI_TRANG_THAI, DO_MAIN } from "@/constants/constants";
export default {
  name: "FormBill",
  components: { TableProduct, TableCombo },
  props: {},
  data() {
    return {
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
      listProductInBillTemp: [],
      listComboInBill: [],
      listComboInBillTemp: [],
      idStatusOfBill: null,
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
    "bill.deposit": {
      handler() {
        this.bill.payment = this.bill.total - this.bill.deposit;
      },
      deep: true,
      immediate: true,
    },
    listProductInBill: {
      handler() {
        if (this.bill.idBill == null) {
          let totalBill = 0;
          this.listProductInBill.forEach((item) => {
            totalBill +=
              (item.productChildResponseDTO.price *
                item.quantity *
                (item.productChildResponseDTO.saleDTO == null
                  ? 1
                  : 100 - item.productChildResponseDTO.saleDTO.discount)) /
              100;
          });
          this.listComboInBill.forEach((item) => {
            totalBill += item.comboResponseDTO.price * item.quantity;
          });
          this.bill.total = totalBill;
          this.bill.payment = this.bill.total - this.bill.deposit;
        }
      },
      deep: true,
      immediate: true,
    },
    listComboInBill: {
      handler() {
        if (this.bill.idBill == null) {
          let totalBill = 0;
          this.listProductInBill.forEach((item) => {
            totalBill +=
              (item.productChildResponseDTO.price *
                item.quantity *
                (item.productChildResponseDTO.saleDTO == null
                  ? 1
                  : 100 - item.productChildResponseDTO.saleDTO.discount)) /
              100;
          });
          this.listComboInBill.forEach((item) => {
            totalBill += item.comboResponseDTO.price * item.quantity;
          });
          this.bill.total = totalBill;
          this.bill.payment = this.bill.total - this.bill.deposit;
        }
      },
      deep: true,
      immediate: true,
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
    deleteProduct(index) {
      this.listProductInBill.splice(index, 1);
    },
    deleteCombo(index) {
      this.listComboInBill.splice(index, 1);
    },
    showProductInBill() {
      this.isShowNotifyV = true;
      this.getListProduct();
    },
    showComboInBill() {
      this.isShowNotifyV1 = true;
    },
    addProductInBill(Product) {
      let listCheckProduct = this.listProductInBillTemp.filter(
        (item) =>
          item.productChildResponseDTO.idProductDetail ==
          Product.idProductDetail
      );
      this.isShowNotifyV = false;
      if (Product.quantity < 1) {
        if (listCheckProduct.length == 0) {
          this.isShowNotify = true;
          this.infoNotify = `Sản phẩm đã hết`;
          if (this.isShowNotify) {
            setTimeout(this.closeNotify, 1000);
          }
          return;
        }
      }
      for (let i = 0; i < this.listProductInBill.length; i++) {
        if (
          this.listProductInBill[i].productChildResponseDTO.idProductDetail ===
          Product.idProductDetail
        ) {
          if (
            this.listProductInBill[i].productChildResponseDTO.quantity ==
            this.listProductInBill[i].quantity
          ) {
            this.isShowNotify = true;
            this.infoNotify = `Sản phẩm không đủ số lượng để tăng số lượng mua !`;
            if (this.isShowNotify) {
              setTimeout(this.closeNotify, 2000);
            }
            return;
          }
          this.listProductInBill[i].quantity += 1;
          return;
        }
      }

      if (listCheckProduct.length == 0) {
        this.listProductInBill.push({
          idBill: this.bill.idBill,
          idBillProduct: null,
          idStatus: 2,
          price: Product.price,
          productChildResponseDTO: { ...Product },
          quantity: 1,
        });
      } else {
        this.listProductInBill.push({
          idBill: listCheckProduct[0].idBill,
          idBillProduct: null,
          idStatus: 2,
          price: Product.price,
          productChildResponseDTO: {
            ...Product,
            quantity: Product.quantity + listCheckProduct[0].quantity,
          },
          quantity: listCheckProduct[0].quantity,
        });
      }
    },
    addComboInBill(Combo) {
      let listCheckCombo = this.listComboInBillTemp.filter(
        (item) => item.comboResponseDTO.idCombo == Combo.idCombo
      );
      this.isShowNotifyV1 = false;
      if (Combo.quantity < 1) {
        if (listCheckCombo.length == 0) {
          this.isShowNotify = true;
          this.infoNotify = `Combo đã hết`;
          if (this.isShowNotify) {
            setTimeout(this.closeNotify, 1000);
          }
          return;
        }
      }
      for (let i = 0; i < this.listComboInBill.length; i++) {
        if (
          this.listComboInBill[i].comboResponseDTO.idCombo === Combo.idCombo
        ) {
          if (
            this.listComboInBill[i].comboResponseDTO.quantity ==
            this.listComboInBill[i].quantity
          ) {
            this.isShowNotify = true;
            this.infoNotify = `Combo không đủ số lượng để tăng số lượng mua !`;
            if (this.isShowNotify) {
              setTimeout(this.closeNotify, 2000);
            }
            return;
          }
          this.listComboInBill[i].quantity += 1;
          return;
        }
      }
      if (listCheckCombo.length == 0) {
        this.listComboInBill.push({
          idBill: this.bill.idBill,
          idBillProduct: null,
          idStatus: 2,
          price: Combo.price,
          comboResponseDTO: { ...Combo },
          quantity: 1,
        });
      } else {
        this.listComboInBill.push({
          idBill: listCheckCombo[0].idBill,
          idBillProduct: null,
          idStatus: 2,
          price: Combo.price,
          comboResponseDTO: {
            ...Combo,
            quantity: Combo.quantity + listCheckCombo[0].quantity,
          },
          quantity: listCheckCombo[0].quantity,
        });
      }
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
      this.idStatusOfBill = null;
      this.listProductInBill = [];
      this.listProductInBillTemp = [];
      this.listComboInBill = [];
      this.listComboInBillTemp = [];
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
      };
      this.$store.dispatch("billModule/saveBill", payload).then((res) => {
        if (res) {
          this.resetForm();
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
.text-red {
  font-size: 14px;
  color: red;
}
</style>