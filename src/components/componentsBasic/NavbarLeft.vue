<template>
  <nav class="navbar-left">
    <div class="menu">
      <p><router-link to="/admin" class="menu-unit">Trang chủ</router-link></p>
      <p>
        <router-link to="/admin/size" class="menu-unit"
          >Quản lí size</router-link
        >
      </p>
      <p>
        <router-link to="/admin/color" class="menu-unit"
          >Quản lí color</router-link
        >
      </p>
      <p><router-link to="/admin/sale" class="menu-unit">Quản lí sale</router-link></p>
      <p><router-link to="/admin/voucher" class="menu-unit">Quản lí voucher</router-link></p>
      <p><router-link to="/admin/category" class="menu-unit">Quản lí Category</router-link></p>
      <p><a class="menu-unit">Trang chủ</a></p>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarLeft",
  components: {},
  props: {},
  data() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.navbar-left {
  width: 15%;
  margin-top: 70px;
  height: 100vh;
  position: fixed;
  background: #2d3446;
  & .menu {
    text-align: center;
    &-unit {
      line-height: 40px;
      height: 40px;
      cursor: pointer;
      color: #768195;
      &:hover {
        color: white;
      }
    }
  }
}
</style>