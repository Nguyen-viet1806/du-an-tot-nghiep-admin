<template>
  <div>
    <navbar-top />
    <navbar-left />
    <div class="body-page">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarTop from "@/components/componentsBasic/NavbarTop.vue";
import NavbarLeft from "@/components/componentsBasic/NavbarLeft.vue";
export default {
  name: "App",
  components: { NavbarTop, NavbarLeft },
  props: {},
  data() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  text-decoration: none !important;
  text-transform: capitalize;
  transition: all 0.2s linear;
  font-family: "Nunito", sans-serif;
  font-family: "Space Mono", monospace;
}
p {
  margin: 0;
}
html,
body {
  height: auto;
}

html {
  scroll-behavior: smooth;
}

.form-tpf{
  background: white;
  padding: 30px;
  box-shadow: #b0b7bd 0px 2px 15px 0px;
  margin-bottom: 50px;
}

.table-tpf{
  background: white;
  padding: 30px;
  box-shadow: #b0b7bd 0px 2px 15px 0px;
}

.body-page {
  margin-left: 15%;
  width: 85%;
  height: 1000px;
  padding: 100px 28px 0 28px;
  background: #f1f3f6;
}
.btn-show {
  padding: 4px 8px;
  border-radius: 3px;
  border: 1px solid #321fdb;
  background: transparent;
  color: #321fdb;
  &:hover {
    background: #321fdb;
    color: white;
  }
}
.btn-reset {
  border: 1px solid #3399ff;
  background: #3399ff;
  color: white;
  &:hover {
    color: #3399ff;
    background: transparent;
  }
}

.btn-closes {
  border: 1px solid #e6192e;
  background: #dc3545;
  color: white;
  &:hover {
    color: #dc3545;
    background: transparent;
  }
}

.btn-add {
  margin-top: 35px;
  border: 1px solid #2eb85c;
  background: #2eb85c;
  color: white;
  &:hover {
    color: #2eb85c;
    background: transparent;
  }
}
.btn-save {
  border: 1px solid #2eb85c;
  background: #2eb85c;
  color: white;
  &:hover {
    color: #2eb85c;
    background: transparent;
  }
}
.table {
  text-align: center;
  border-top: 1px solid;
  border-top-color: #d8dbe0 !important;
}
.table > :not(caption) > * > * {
  border-bottom-width: 0.5px !important;
  border-bottom-color: #d8dbe0 !important;
}
.control {
  padding-top: 20px;
  & .btn:nth-child(2) {
    margin-left: 28px;
  }
}
</style>
