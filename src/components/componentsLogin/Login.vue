<template>
  <div>
    <div
      class="login-box"
      style="background: linear-gradient(#141e30, #243b55)"
    >
      <h2>Đăng nhập</h2>
      <form @submit.prevent="login">
        <div class="login">
          <div class="form-group">
            <input
              placeholder="Email"
              class="form-control textLogin"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              autocomplete="off"
              v-model="email"
              required
            />
          </div>
        </div>
        <div class="form-group mt-4">
          <input
            type="password"
            placeholder="Pass"
            class="form-control textLogin"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            autocomplete="off"
            v-model="pass"
            required
          />
        </div>
        <button type="submit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Đăng nhập
        </button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      
      isLogin: true,
      email: "",
      pass: "",
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    login() {
      this.$emit("clickLogin", this.email, this.pass);
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding-top: 200px;
  font-family: sans-serif;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  & span {
    pointer-events: none;
  }
}

.login-box button:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box button span {
  position: absolute;
  display: block;
}

.login-box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}
button {
  background: transparent;
  border: none;
  border-radius: 2px;
  outline: 0;
}
.login-box button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
.textLogin {
  background: transparent;
  border: none;
  border-radius: none;
  border-bottom: 1px solid #03e9f4;
  color: #03e9f4 !important;
  outline: none;
}
input:hover {
  background: #03e9f4;
  color: #fff !important;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}
input:focus {
  box-shadow: none;
}
input::placeholder {
  color: #fff;
}
</style>