<template>
  <div class="combo">
    <h3>Hóa đơn</h3>
    <form-bill @getListBill="getListBill" ref="FormBill" />
    <table-bill
      @showBill="showBill"
      @getListBill="getListBill"
      ref="TableBill"
    />
  </div>
</template>
<script>
import FormBill from "@/components/componentsBill/FormBill.vue";
import TableBill from "@/components/componentsBill/TableBill.vue";
export default {
  name: "Combo",
  components: { FormBill, TableBill },
  props: {},
  data() {},
  computed: {},
  watch: {},
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getListBill();
    },
    showBill(bill) {
      let billTemp = {
        idBill: bill.idBill,
        idUser: bill.userResponseDTO.idUser,
        idAddress: null,
        phoneUser: bill.phoneUser,
        emailUser: bill.emailUser,
        dateCreate: bill.dateCreate,
        dateSuccess: bill.dateSuccess,
        descriptionBill: bill.descriptionBill,
        total: bill.total,
        deposit: bill.deposit,
        payment: bill.payment,
        transportFee: 30000,
        idVoucher: bill.idVoucher,
        idStatus: bill.idStatus,
        billType: bill.billType,
        listProductDetail: [],
        addressRequestDTO: {
          idAddress: null,
          idProvince: bill.address.province.idProvince,
          idDistrict: bill.address.district.idDistrict,
          idCommune: bill.address.commune.idCommune,
          detailAddress: bill.address.detailAddress,
        },
      };
      this.$refs["FormBill"].idStatusOfBill = bill.idStatus;
      this.$refs["FormBill"].bill = billTemp;
      this.getListProductInBill(bill);
      this.getListComboInBill(bill);
    },
    getListProductInBill(bill) {
      let payload = {
        page: 0,
        limit: 1000000,
        idBill: bill.idBill,
      };
      this.$store
        .dispatch("billModule/getDanhSachProductInBill", payload)
        .then((res) => {
          if (res) {
            this.$refs["FormBill"].listProductInBill = [];
            if (bill.idStatus == 9 || bill.idStatus == 10) {
              this.$refs["FormBill"].listProductInBill = res.data.data;
            } else {
              res.data.data.forEach((item) => {
                this.$refs["FormBill"].listProductInBill.push({
                  idBill: item.idBill,
                  idBillProduct: item.idBillProduct,
                  idStatus: item.idStatus,
                  price: item.price,
                  productChildResponseDTO: {
                    ...item.productChildResponseDTO,
                    quantity:
                      item.quantity + item.productChildResponseDTO.quantity,
                  },
                  quantity: item.quantity,
                });
              });
            }

            this.$refs["FormBill"].listProductInBillTemp = res.data.data;
          }
        });
    },
    getListComboInBill(bill) {
      let payload = {
        page: 0,
        limit: 1000000,
        idBill: bill.idBill,
      };
      this.$store
        .dispatch("billModule/getDanhSachComboInBill", payload)
        .then((res) => {
          if (res) {
            this.$refs["FormBill"].listComboInBill = [];
            if (bill.idStatus == 9 || bill.idStatus == 10) {
              this.$refs["FormBill"].listComboInBill = res.data.data;
            } else {
              res.data.data.forEach((item) => {
                this.$refs["FormBill"].listComboInBill.push({
                  idBill: item.idBill,
                  idBillProduct: item.idBillProduct,
                  idStatus: item.idStatus,
                  price: item.price,
                  comboResponseDTO: {
                    ...item.comboResponseDTO,
                    quantity: item.quantity + item.comboResponseDTO.quantity,
                  },
                  quantity: item.quantity,
                });
              });
            }
            this.$refs["FormBill"].listComboInBillTemp = res.data.data;
          }
        });
    },

    getListBill() {
      let payload = {
        page: this.$refs["TableBill"].pageable,
        limit: 5,
        billType: 0,
      };
      this.$store.dispatch("billModule/getDanhSachBill", payload);
    },
  },
};
</script>

<style lnag="scss" scoped>
</style>