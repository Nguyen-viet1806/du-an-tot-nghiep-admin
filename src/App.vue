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
  background: #fafafa;
  height: auto;
}

html {
  scroll-behavior: smooth;
}

.form-tpf {
  background: white;
  padding: 30px;
  box-shadow: #b0b7bd 0px 2px 15px 0px;
  margin-bottom: 50px;
  border-radius: 12px;
}

.table-tpf {
  background: white;
  padding: 30px;
  box-shadow: #b0b7bd 0px 2px 15px 0px;
  border-radius: 12px;
}

.body-page {
  margin-left: 16%;
  width: 84%;
  min-height: 1000px;
  padding: 80px 28px 100px 28px;
  background: #fafafa;
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
  border-radius: 10px/25px;
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
  border-radius: 10px/25px;
  margin-top: 35px;
  border: 1px solid #06d85f;
  background: #06d85f;
  color: white;
  &:hover {
    color: #06d85f;
    background: transparent;
  }
}
.btn-save {
  border-radius: 10px/25px;
  border: 1px solid #06d85f;
  background: #06d85f;
  color: white;
  &:hover {
    color: #06d85f;
    background: transparent;
  }
}
.btn-arrow-up {
  border: 1px solid #990033;
  color: #990033;
  background: transparent;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  &:hover {
    color: white;
    background: #990033;
  }
}
.btn-arrow-down {
  width: 30px;
  height: 30px;
  border: 1px solid #990033;
  color: #990033;
  background: transparent;
  &:hover {
    color: white;
    background: #990033;
  }
}
.btn-filter {
  border-radius: 10px/25px;
  border: 1px solid #3399ff;
  background: #3399ff;
  color: white;
  height: 30px;
  line-height: 1;
  font-weight: bold;
  &:hover {
    color: #3399ff;
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
.box {
  width: 40%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.2);
  padding: 35px;
  border: 2px solid #fff;
  border-radius: 20px/50px;
  background-clip: padding-box;
  text-align: center;
}

.button {
  font-size: 1em;
  padding: 10px;
  color: #fff;
  border: 2px solid #06d85f;
  border-radius: 20px/50px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.button:hover {
  background: #06d85f;
}
.active {
  border: 1px solid red !important;
 box-shadow: rgba(219, 17, 27, 0.25) 0px 1px 1px, rgba(240, 11, 11, 0.24) 0px 0px 1px 1px;
}
//tb
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  transition: opacity 500ms;
  visibility: visible;
  opacity: 1;
}

.popup {
  box-shadow: #b0b7bd 0px 2px 15px 0px;
  visibility: visible;
  opacity: 1;
  margin: 10px auto;
  padding: 100px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: fixed;
  top: 200px;
  left: 38%;
  transition: all 1s ease-in-out;
  z-index: 1002;
}
.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #06d85f;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}

@media screen and (max-width: 700px) {
  .box {
    width: 70%;
  }
  .popup {
    width: 70%;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s ease-out both;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse ease-in both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
// .page-link{
//   position: inherit;
// }
// .input-group>.form-control, .input-group>.form-select{
// position: none;
// }
</style>
