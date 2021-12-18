<template>
  <nav class="navbar-left">
    <div class="menu">
      <p class="menu-unit" :class="{ activeMenu: checkText('Trang Chủ') }">
        <router-link to="/" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fas', 'home']"
          /></span>
          Trang chủ</router-link
        >
      </p>
      <p class="menu-unit" :class="{ activeMenu: checkText('Tin Nhắn') }">
        <router-link to="/admin/chat" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fas', 'envelope-open-text']"
          /></span>
          Tin nhắn</router-link
        >
      </p>
      <p class="menu-unit" :class="{ activeMenu: checkText('Quản Lí Size') }">
        <router-link to="/admin/size" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fas', 'expand-arrows-alt']"
          /></span>
          Quản lí size</router-link
        >
      </p>
      <p class="menu-unit" :class="{ activeMenu: checkText('Quản Lí Màu') }">
        <router-link to="/admin/color" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fas', 'palette']"
          /></span>
          Quản lí màu</router-link
        >
      </p>
      <p class="menu-unit" :class="{ activeMenu: checkText('Quản Lí Sale') }">
        <router-link to="/admin/sale" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fas', 'tags']"
          /></span>
          Quản lí sale</router-link
        >
      </p>
      <p class="menu-unit" :class="{ activeMenu: checkText('Quản Lí Voucher') }">
        <router-link to="/admin/voucher" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fas', 'percentage']"
          /></span>
          Quản lí voucher</router-link
        >
      </p>
      <p class="menu-unit" :class="{ activeMenu: checkText('Quản Lí Danh Mục') }">
        <router-link to="/admin/category" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fab', 'artstation']"
          /></span>
          Quản lí danh mục</router-link
        >
      </p>
      <p class="menu-unit" :class="{ activeMenu: checkText('Quản Lí Sản Phẩm') }">
        <router-link to="/admin/product" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fab', 'asymmetrik']"
          /></span>
          Quản lí sản phẩm</router-link
        >
      </p>
      <p class="menu-unit" :class="{ activeMenu: checkText('Quản Lí Combo') }">
        <router-link to="/admin/combo" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fas', 'check-double']"
          /></span>
          Quản lí combo</router-link
        >
      </p>
      <p class="menu-unit" :class="{ activeMenu: checkText('Quản Lí Bán Hàng') }">
        <router-link to="/admin/pay" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fas', 'money-bill-wave-alt']"
          /></span>
          Quản lí bán hàng</router-link
        >
      </p>
      <p class="menu-unit" :class="{ activeMenu: checkText('Quản Lí Hóa Đơn') }">
        <router-link to="/admin/bill" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fas', 'file-invoice-dollar']"
          /></span>
          Quản lí hóa đơn</router-link
        >
      </p>
      <p class="menu-unit" :class="{ activeMenu: checkText('Quản Lí Account') }">
        <router-link to="/admin/account" @click="clickMenu"
          ><span class="logoMenu"
            ><fa class="icon" :icon="['fas', 'user-lock']"
          /></span>
          Quản lí account</router-link
        >
      </p>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarLeft",
  components: {},
  props: {},
  data() {
    return {
      innerText: "",
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    checkText(text) {
      return this.innerText.includes(text);
    },
    clickMenu(e) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      this.innerText = e.target.innerText;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-left {
  margin-left: 1%;
  width: 16%;
  margin-top: 70px;
  height: 100vh;
  position: fixed;
  background: white;
  border-radius: 10px;
  & .menu {
    height: 80vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0 !important;
      display: none;
    }
    &-unit {
      margin: 15px auto;
      background: transparent;
      border-radius: 8px;
      line-height: 50px;
      height: 50px;
      width: 82%;
      cursor: pointer;
      & a {
        font-size: 14px;
        color: #141414;
        letter-spacing: -0.3px;
        & .logoMenu {
          box-shadow: #f0f2f5 0px 2px 15px 0px;
          margin-left: 5%;
          margin-right: 2%;
          color: #bfbfbf;
          border-radius: 5px;
          padding: 8px;
          background: white;
        }
      }
      // box-shadow: #f0f2f5 0px 2px 15px 0px;
      // background: white;
      // & a {
      //   font-weight: 500;
      //   & .logoMenu {
      //     margin-left: 5%;
      //     margin-right: 2%;
      //     color: white;
      //     border-radius: 5px;
      //     padding: 8px;
      //     background: #1890ff;
      //   }
      // }
    }
  }
}
.activeMenu {
  margin: 15px auto !important;
  background: transparent !important;
  border-radius: 8px !important;
  line-height: 50px !important;
  height: 50px !important;
  width: 82% !important;
  cursor: pointer !important;
  background: white !important;
   box-shadow: #1890ff 0px 1px 1px, #1890ff 0px 0px 1px 1px !important;
  & a {
    font-weight: 500 !important;
    & .logoMenu {
      margin-left: 5% !important;
      margin-right: 2% !important;
      color: white !important;
      border-radius: 5px !important;
      padding: 8px !important;
      background: #1890ff !important;
    }
  }
}
</style>