<template>
  <div class="combo">
    <h3>Bán hàng</h3>
    <form-bill ref="FormBill" />
    <table-bill
      @showBill="showBill"
      @getListBill="getListBill"
      ref="TableBill"
    />
  </div>
</template>
<script>
import FormBill from "@/components/componentsPay/FormPay.vue";
import TableBill from "@/components/componentsPay/TablePay.vue";
export default {
  name: "Pay",
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
        listProductDetail: [
          {
            idProductDetail: null,
            quantity: null,
            idStatus: null,
          },
        ],
        addressRequestDTO: {
          idAddress: null,
          idProvince: bill.address.province.idProvince,
          idDistrict: bill.address.district.idDistrict,
          idCommune: bill.address.commune.idCommune,
          detailAddress: bill.address.detailAddress,
        },
      };
      this.$refs["FormBill"].bill = billTemp;
      this.getListProductInBill(bill);
    },
    getListProductInBill(bill) {
      let payload = {
        page: 0,
        limit: 1000000,
        idBill: bill.idBill,
      };
      this.$store.dispatch("billModule/getDanhSachProductInBill", payload).then(res => {
        if(res){
           this.$refs["FormBill"].listProductInBill = res.data.data;
        }
      });
    },
    getListBill() {
      let payload = {
        page: this.$refs["TableBill"].pageable,
        limit: 5,
        billType: 1,
      };
      this.$store.dispatch("billModule/getDanhSachBill", payload);
    },
  },
};
</script>

<style lnag="scss" scoped>
</style>