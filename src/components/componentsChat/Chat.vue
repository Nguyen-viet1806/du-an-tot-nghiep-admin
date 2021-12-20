<template>
  <div class="form-tpf">
    <div class="bchat"><embed src="http://localhost:8998/home" /></div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  components: {},
  props: {},
  data() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang ="scss" scoped>
.bchat {
  & embed {
    width: 100%;
    height: 800px;
  }
}
</style>