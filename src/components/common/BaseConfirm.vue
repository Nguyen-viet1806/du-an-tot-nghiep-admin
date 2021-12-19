<template>
  <div class="notify">
    <div
      id="popup1"
      v-if="isShowConfirm"
      class="overlay"
      @click="closeConfirm"
    ></div>
    <transition name="bounce">
      <div id="popup1" v-if="isShowConfirm" class="popup">
        <h4>Xác nhận:</h4>
        <a class="close" href="#" @click="closeConfirm">&times;</a>
        <div class="content">
          {{ infoConfirm }}
        </div>
        <div class="btn-confirm">
          <button class="btn btn-danger" @click="oke">Oke</button>
          <button class="btn btn-dark" @click="closeConfirm">Cancel</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "baseConfirm",
  components: {},
  props: {
    isShowConfirm: {
      type: Boolean,
      default: () => false,
    },
    infoConfirm: {
      type: String,
      default: () => "",
    },
  },
  data() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    closeConfirm() {
      this.$emit("closeConfirm");
    },
    oke(){
      this.$emit("oke");
    }
  },
};
</script>

<style lang="scss">
.btn-confirm {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}
</style>