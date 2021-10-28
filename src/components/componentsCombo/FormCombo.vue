<template>
  <div class="form-tpf">
    <div class="container">
      <div class="row">
        <div class="col mt-4">
          <form>
            <div class="form-group" v-show="false">
              <label>Id combo:</label>
              <input style="cursor: no-drop" class="form-control" disabled />
            </div>
            <div class="form-group">
              <label>Tên combo:</label>
              <input type="text" class="form-control" />
            </div>
            <div class="control">
              <button type="button" class="btn btn-save" v-on:click="saveColor">
                Lưu
              </button>
              <button
                v-on:click="resetForm"
                type="button"
                class="btn btn-reset"
              >
                Làm tươi
              </button>
            </div>
          </form>
        </div>
        <div class="col">
          <h5>Sản phẩm có trong combo</h5>
          <table class="table table-hover mt-4">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tên Color</th>
                <th scope="col">Xóa/Khôi phục</th>
                <th scope="col">
                </th>
              </tr>
            </thead>
            <tbody >
              <tr>
                <th scope="row">123</th>
                <td>123</td>
                <td>
                  <div class="form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                  </div>
                </td>
                <td>
                  <button  class="btn-show">
                    Show
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormCombo",
  components: {},
  props: {},
  data() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lnag="scss" scoped>
</style>