import {
  callApiLogout,
  callApiLogin,
  callApiHome,
  callApiChangePassword,
  callApiResetPass,
  callApiUpdateProfile,
  callApiRegister,
} from "@/api/loginRegister.js";


const register = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiRegister(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


const logout = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiLogout(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const Login = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiLogin(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const home = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiHome(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const changePassword = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiChangePassword(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const resetPass = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiResetPass(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const UpdateProfile = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiUpdateProfile(payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  logout,
  Login,
  home,
  changePassword,
  resetPass,
  UpdateProfile,
  register,
};
