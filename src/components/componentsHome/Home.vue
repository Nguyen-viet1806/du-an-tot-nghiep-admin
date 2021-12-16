<template>
  <div class="table-tpf">
    <table class="table table-hover mt-4">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col"></th>
          <th scope="col">Tên combo</th>
          <th scope="col">Giá combo</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Ngày tạo</th>
          <th scope="col">Mô tả combo</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">
            <button class="btn-arrow-up" @click="getListSort(0)">
              <fa class="icon" :icon="['fas', 'arrow-up']" /></button
            ><button class="btn-arrow-down" @click="getListSort(1)">
              <fa class="icon" :icon="['fas', 'arrow-down']" />
            </button>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>