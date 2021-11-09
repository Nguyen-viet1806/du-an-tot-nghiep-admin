<template>
  <div class="form-tpf">
    <div class="row">
      <div class="col mt-4">
        <form @submit="onSubmit" >
          <div class="row">
            <div class="col">
              <div class="form-group" v-show="false">
                <label>Id bill:</label>
                <input style="cursor: no-drop" class="form-control" disabled />
              </div>
              <div class="form-group ">
                <label for="validationCustom01" class="form-label"
                  >Tên người mua:</label
                >
                <input
                  type="text"
                  class="form-control "
                  id="validationCustom01"
                  value=""
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Số điện thoại:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  value=""
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Email:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  value=""
                  required
                />
              </div>
              <div class="form-group mt-1">
                <label for="validationCustom04" class="form-label">Tỉnh:</label>
                <select class="form-select" id="validationCustom04" required>
                  <option selected disabled value="">Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="form-group mt-1">
                <label for="validationCustom04" class="form-label"
                  >Quận,huyện:</label
                >
                <select class="form-select" id="validationCustom04" required>
                  <option selected disabled value="">Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="form-group mt-1">
                <label for="validationCustom04" class="form-label">Xã:</label>
                <select class="form-select" id="validationCustom04" required>
                  <option selected disabled value="">Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="form-group mt-1">
                <label for="validationTextarea" class="form-label"
                  >Địa chỉ cụ thể:</label
                >
                <textarea
                  class="form-control"
                  id="validationTextarea"
                  placeholder="Số nhà, ngõ"
                  required
                ></textarea>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Ngày tạo:</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="validationCustom01"
                  value=""
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Ngày giao thành công:</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="validationCustom01"
                  value=""
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Voucher:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  value=""
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Phí ship:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  value=""
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Đặt cọc:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  value=""
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Số tiền còn lại:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  value=""
                  required
                />
              </div>
              <div class="form-group">
                <label for="validationCustom01" class="form-label"
                  >Tổng tiền:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  value=""
                  required
                />
              </div>
              <div class="form-group mt-1">
                <label for="validationTextarea" class="form-label"
                  >Mô tả:</label
                >
                <textarea
                  class="form-control"
                  id="validationTextarea"
                  placeholder="Số nhà, ngõ"
                  required
                ></textarea>
              </div>
              <div class="control">
                <button
                  type="submit"
                  class="btn btn-save"
                >
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
            </div>
          </div>
        </form>
      </div>
      <div class="col">
        <h5>Sản phẩm có trong hóa đơn</h5>
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col"></th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Xóa/Khôi phục</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">123</th>
              <td>123</td>
              <td>
               
              </td>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="notify">
        <div
          id="popup1"
          v-if="isShowNotify"
          class="overlay"
          @click="closeNotify"
        ></div>
        <transition name="bounce">
          <div id="popup1" v-if="isShowNotify" class="popup">
            <h2>Thông báo:</h2>
            <a class="close" href="#" @click="closeNotify">&times;</a>
            <div class="content">
              {{ infoNotify }}
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormBill",
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
.control {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>