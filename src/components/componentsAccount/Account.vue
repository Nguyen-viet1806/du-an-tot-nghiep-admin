<template>
  <div class="form-tpf">
    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-3 border-right">
          <div
            class="d-flex flex-column align-items-center text-center p-3 py-5"
          >
            <img
              v-if="user.imageUser"
              width="200"
              id="uploadPreview"
              class="rounded-circle mt-5"
              :src="DO_MAIN + user.imageUser"
            />
          </div>
        </div>
        <div class="col-md-5 border-right">
          <form @submit.prevent="UpdateProfile">
            <div class="p-3 py-5">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h4 class="text-right">Thông tin cá nhân</h4>
              </div>

              <div class="row mt-2">
                <div class="col-md-12">
                  <label class="labels">Ảnh </label
                  ><input
                    type="file"
                    class="form-control"
                    id="uploadImage"
                    @change="onFileSelected"
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">Họ </label
                  ><input
                    type="text"
                    class="form-control"
                    placeholder="Họ"
                    v-model="user.firstName"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">Tên</label
                  ><input
                    type="text"
                    class="form-control"
                    v-model="user.lastName"
                    placeholder="Tên"
                    required
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <label class="labels">Ngày sinh</label
                  ><input
                    type="date"
                    class="form-control"
                    placeholder="Ngày sinh"
                    v-model="user.dateOfBirth"
                    required
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Giới tính</label>
                  <div class="input-group">
                    <select
                      v-model="user.idGender"
                      class="form-select"
                      id="validationDefault04"
                      required
                    >
                      <option selected value="">Chọn giới tính</option>
                      <option :value="1">Nam</option>
                      <option :value="2">Nữ</option>
                      <option :value="3">Unisex</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="labels">Số điện thoại</label
                  ><input
                    type="number"
                    class="form-control"
                    placeholder="Số điện thoại"
                    v-model="user.phoneNumber"
                    minlength="10"
                    maxlength="11"
                    required
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Email</label
                  ><input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    v-model="user.email"
                    :disabled="!isCoTheTao"
                    required
                  />
                </div>
                <div class="col-md-12" v-if="isCoTheTao">
                  <label class="labels">Mật khẩu </label
                  ><input
                    type="password"
                    class="form-control"
                    placeholder="Mật khẩu"
                    v-model="passWordTao"
                    minlength="6"
                    required
                  />
                </div>
                 <p class="laAdmin" v-if="isCoTheTao">
                  <input type="checkbox" v-model="isAdmin" /> Admin
                </p>
                <h6 class="mt-5">Địa chỉ</h6>

                <div class="col-md-12">
                  <label class="labels">Tỉnh</label>
                  <div class="input-group">
                    <select
                      v-model="user.addressRequestDTO.idProvince"
                      class="form-select"
                      id="validationDefault04"
                      required
                    >
                      <option selected value="">Chọn tỉnh</option>
                      <option
                        v-for="Province in listProvince"
                        :key="Province"
                        :value="Province.idProvince"
                      >
                        {{ Province.nameProvince }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="labels">Quận, huyện</label>
                  <div class="input-group">
                    <select
                      :disabled="isDisabledDistrict"
                      v-model="user.addressRequestDTO.idDistrict"
                      class="form-select"
                      id="validationDefault04"
                      required
                    >
                      <option selected value="">Chọn quận, huyện</option>
                      <option
                        v-for="District in listDistrict"
                        :key="District"
                        :value="District.idDistrict"
                      >
                        {{ District.nameDistrict }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="labels">Xã</label>
                  <div class="input-group">
                    <select
                      :disabled="isDisabledCommune"
                      v-model="user.addressRequestDTO.idCommune"
                      class="form-select"
                      id="validationDefault04"
                      required
                    >
                      <option selected value="">Chọn xã</option>
                      <option
                        v-for="Commune in listCommune"
                        :key="Commune"
                        :value="Commune.idCommune"
                      >
                        {{ Commune.nameCommune }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="labels">Địa chỉ cụ thể</label>
                  <div class="input-group">
                    <textarea
                      type="text"
                      class="form-control"
                      id="validationDefault03"
                      placeholder="Vui lòng điền số nhà, ngõ"
                      v-model="user.addressRequestDTO.detailAddress"
                      required
                    />
                  </div>
                </div>
               
              </div>

              <div class="mt-5 text-center">
                <button
                  v-if="!isCoTheTao"
                  class="btn btn-primary profile-button"
                  type="submit"
                >
                  Cập nhập thông tin
                </button>
                <button
                  v-if="isLaAdmin && isCoTheTao"
                  class="btn btn-primary profile-button"
                  type="submit"
                >
                  Tạo tài khoản
                </button>
                <div
                  v-if="isLaAdmin && !isCoTheTao"
                  @click="resetForm"
                  class="btn btn-reset submit"
                >
                  Tạo tài khoản cho nhân viên
                </div>
                <div
                  v-if="isLaAdmin && isCoTheTao"
                  @click="getInfoUser(true)"
                  class="btn btn-reset submit"
                >
                  Lấy thông tin cá nhân
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-4">
          <div class="p-3 py-5">
            <form @submit.prevent="changePassword">
              <div
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  experience
                "
              >
                <span>Đổi mật khẩu</span>
              </div>
              <br />
              <div class="col-md-12">
                <label class="labels">Mật khẩu cũ</label
                ><input
                  type="password"
                  class="form-control"
                  placeholder="Mật khẩu cũ"
                  v-model="passCu"
                  required
                />
              </div>
              <br />
              <div class="col-md-12">
                <label class="labels">Mật khẩu mới</label
                ><input
                  type="password"
                  class="form-control"
                  placeholder="Mật khẩu mới"
                  v-model="passMoi"
                  minlength="6"
                  required
                />
              </div>
              <div class="col-md-12">
                <label class="labels">Nhập lại mật khẩu mới</label
                ><input
                  type="password"
                  class="form-control"
                  placeholder="Nhập lại mật khẩu mới"
                  v-model="passMoiXacNhan"
                  required
                />
              </div>
              <div class="btn-dpass">
                <button type="submit">
                  <span class="border px-3 p-1 add-experience"
                    ><i class="fa fa-plus"></i>&nbsp;Đổi mật khẩu</span
                  >
                </button>
              </div>
            </form>
          </div>
        </div>
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
import { DO_MAIN } from "@/constants/constants";
export default {
  name: "Account",
  components: {},
  props: {},
  data() {
    return {
      isAdmin: false,
      isShowNotify: false,
      isCoTheTao: false,
      DO_MAIN,
      isDisabledDistrict: true,
      isDisabledCommune: true,
      listProvince: [],
      listDistrict: [],
      listCommune: [],
      user: {
        idUser: null,
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
        passwordUser: "",
        idGender: "",
        idAddress: null,
        imageUser: "",
        addressRequestDTO: {
          idAddress: null,
          idProvince: "",
          idDistrict: "",
          idCommune: "",
          detailAddress: "",
        },
      },
      passCu: "",
      passMoi: "",
      passMoiXacNhan: "",
    };
  },
  computed: {
    isLaAdmin() {
      return JSON.parse(localStorage.getItem("UserInfo")).idRole == 1;
    },
  },
  watch: {
    "user.addressRequestDTO.idProvince": {
      handler() {
        if (
          this.user.addressRequestDTO.idProvince.length > 0 ||
          this.user.addressRequestDTO.idProvince != ""
        ) {
          this.isDisabledDistrict = false;
          this.$store
            .dispatch("billModule/getDanhSachQuanHuyen", {
              idProvince: Number(this.user.addressRequestDTO.idProvince),
            })
            .then((res) => {
              if (res) {
                this.listDistrict = res.data.data;
              }
            });
        } else if (
          this.user.addressRequestDTO.idProvince.length == 0 ||
          this.user.addressRequestDTO.idProvince == ""
        ) {
          this.isDisabledDistrict = true;
          this.listDistrict = [];
        }
      },
      deep: true,
    },
    "user.addressRequestDTO.idDistrict": {
      handler() {
        if (
          this.user.addressRequestDTO.idDistrict.length > 0 ||
          this.user.addressRequestDTO.idDistrict != ""
        ) {
          this.isDisabledCommune = false;
          this.$store
            .dispatch("billModule/getDanhSachXa", {
              idDistrict: Number(this.user.addressRequestDTO.idDistrict),
              idProvince: Number(this.user.addressRequestDTO.idProvince),
            })
            .then((res) => {
              if (res) {
                this.listCommune = res.data.data;
              }
            });
        } else if (
          this.user.addressRequestDTO.idDistrict.length == 0 ||
          this.user.addressRequestDTO.idDistrict == ""
        ) {
          this.isDisabledCommune = true;
          this.listCommune = [];
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getListTinh();
      this.getInfoUser();
    },
    changePassword() {
      if (this.passMoi != this.passMoiXacNhan) {
        this.isShowNotify = true;
        this.infoNotify = "Xác nhận mật khẩu mới không khớp!";
        setTimeout(() => {
          this.isShowNotify = false;
          this.infoNotify = "";
        }, 1000);
        return;
      }
      let payload = {
        idUser: JSON.parse(localStorage.getItem("UserInfo")).idUser,
        oldPassword: this.passCu,
        newPassword: this.passMoi,
      };
      this.$store
        .dispatch("loginRegisterModule/changePassword", payload)
        .then((res) => {
          if (res) {
            this.isShowNotify = true;
            this.infoNotify = "Đổi mật khẩu thành công!";
            setTimeout(() => {
              this.isShowNotify = false;
              this.infoNotify = "";
            }, 1000);
            this.passCu = "";
            this.passMoi = "";
            this.passMoiXacNhan = "";
          }
        })
        .catch((err) => {
          if (err) {
            this.isShowNotify = true;
            this.infoNotify = "Đổi mật khẩu thất bại!";
            setTimeout(() => {
              this.isShowNotify = false;
              this.infoNotify = "";
            }, 1000);
          }
        });
    },
    resetForm() {
      this.isCoTheTao = true;
      this.user = {
        idUser: null,
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
        passwordUser: "",
        idGender: "",
        idAddress: null,
        imageUser: "",
        addressRequestDTO: {
          idAddress: null,
          idProvince: "",
          idDistrict: "",
          idCommune: "",
          detailAddress: "",
        },
      };
    },
    onFileSelected(event) {
      this.user.imageUser = event.target.files[0];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
    },
    getInfoUser(isLayTT = false) {
      if (isLayTT) {
        this.isCoTheTao = false;
      }
      if (JSON.parse(localStorage.getItem("UserInfo")) == null) {
        this.$router.push({ path: "/login" });
        return;
      }
      let users = JSON.parse(localStorage.getItem("UserInfo"));
      this.user = {
        idUser: users.idUser,
        firstName: users.firstName,
        lastName: users.lastName,
        dateOfBirth: users.dateOfBirth,
        email: users.email,
        phoneNumber: users.phoneNumber,
        passwordUser: "",
        idGender: users.genderDTO?.idGender,
        idAddress: null,
        imageUser: users.imageUser,
        addressRequestDTO: {
          idAddress: null,
          idProvince: users.addressDTO.idProvince,
          idDistrict: users.addressDTO.idDistrict,
          idCommune: users.addressDTO.idCommune,
          detailAddress: users.addressDTO.detailAddress,
        },
      };
    },
    getListTinh() {
      this.$store.dispatch("billModule/getDanhSachTinh").then((res) => {
        if (res) {
          this.listProvince = res.data.data;
        }
      });
    },
    async uploadFile(file) {
      const fd = new FormData();
      fd.append("file", file);
      let img;
      await this.$store.dispatch("productModule/uploadFile", fd).then((res) => {
        if (res) {
          img = res.data;
        }
      });
      return img;
    },
    async UpdateProfile() {
      if (this.isCoTheTao) {
        this.onRegister();
      } else {
        if (!this.user.imageUser) {
          this.isShowNotify = true;
          this.infoNotify = "Bạn chưa chọn ảnh !";
          setTimeout(() => {
            this.isShowNotify = false;
            this.infoNotify = "";
          }, 1000);
          return;
        }
        if (typeof this.user.imageUser == "object") {
          this.user.imageUser = await this.uploadFile(this.user.imageUser);
        }
        this.$store
          .dispatch("loginRegisterModule/UpdateProfile", this.user)
          .then((res) => {
            if (res) {
              this.isShowNotify = true;
              this.infoNotify = "Lưu thông tin thành công!";
              setTimeout(() => {
                this.isShowNotify = false;
                this.infoNotify = "";
              }, 1000);
              localStorage.setItem(
                "UserInfo",
                JSON.stringify({
                  ...JSON.parse(localStorage.getItem("UserInfo")),
                  ...res.data.data,
                  idRole: JSON.parse(localStorage.getItem("UserInfo")).idRole
                })
              );
            }
          });
      }
    },
    async onRegister() {
      if (typeof this.user.imageUser == "object") {
        this.user.imageUser = await this.uploadFile(this.user.imageUser);
      }

      let payload = {
        ...this.user,
        email: this.user.email.trim(),
        phoneNumber: this.user.phoneNumber,
        passwordUser: this.passWordTao,
        idRole: this.isAdmin ? 1 : 2,
      };
      this.$store
        .dispatch("loginRegisterModule/register", payload)
        .then((res) => {
          if (res) {
            this.isShowNotify = true;
            this.infoNotify = "Đăng kí tài khoản thành công!!!";
            setTimeout(() => {
              this.isShowNotify = false;
              this.infoNotify = "";
            }, 1000);
            this.resetForm();
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  background: rgb(99, 39, 120);
}

.form-control:focus {
  box-shadow: none;
  border-color: #ba68c8;
}

.profile-button {
  background: rgb(99, 39, 120);
  box-shadow: none;
  border: none;
}

.profile-button:hover {
  background: #682773;
}

.profile-button:focus {
  background: #682773;
  box-shadow: none;
}

.profile-button:active {
  background: #682773;
  box-shadow: none;
}

.back:hover {
  color: #682773;
  cursor: pointer;
}

.labels {
  font-size: 11px;
}

.add-experience:hover {
  background: #ba68c8;
  color: #fff;
  cursor: pointer;
  border: solid 1px #ba68c8;
}
.btn-dpass {
  margin-top: 15px;
}
.submit {
  margin-left: 5px;
  cursor: pointer;
}
.laAdmin{
  margin-top: 5px;
}
</style>