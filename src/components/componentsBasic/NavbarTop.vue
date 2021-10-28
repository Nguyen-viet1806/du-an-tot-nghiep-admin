<template>
  <div class="navbar-top">
    <div class="logo">
      <img class="icon" src="@/assets/logoTpf.svg" width="75"/>
      <h2 class="logo-name">TPF</h2>
    </div>
    <div class="navbar-top-right">
      <div class="user">
        Nguyễn Quốc Việt
      </div>
      <div class="sign-in">
        <fa class="icon" :icon="['fas', 'sign-in-alt']"
        />
        Sign In
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarTop",
  components: {},
  props: {},
  data() {
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.navbar-top {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: white;
  display: flex;
  float: right;
  // border-bottom: 1px solid rgba(61, 59, 59, 0.2);
  border-radius: 10px;
  & .logo {
    padding-left: 2%;
    width: 15%;
    height: 69px;
    background: white;
    display: flex;
    //border-bottom: 1px solid rgba(61, 59, 59, 0.2);
    &-name {
      color: #000000;
      letter-spacing: 2px;
      line-height: 70px;
      width: 100%;
    }
  }

  &-right {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & .sign-in {
      margin-right: 2%;
    }

    & .user {
      margin-right: 2%;
    }

  }
}

hr {
  position: relative;
  left: 1.5%;
  bottom: 15px;
  width: 13%;
}
</style>