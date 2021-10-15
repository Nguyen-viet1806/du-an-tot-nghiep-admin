<template>
  <div class="navbar-top">
    <div class="logo">
      <img class="icon" src="@/assets/logoTpf.svg" width="75" />
      <h2 class="logo-name">TPF</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarTop",
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
.navbar-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #ffffff;
  float: right;
  border-bottom: 1px solid rgba(61, 59, 59, 0.2);
  & .logo {
    width: 15%;
    height: 70px;
    background: #000000;
    display: flex;
    &-name {
      color: #f9f9f9;
      letter-spacing: 2px;
      line-height: 70px;
      width: 100%;
    }
  }
}
</style>