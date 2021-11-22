import {
  callApiLogout,
  callApiLogin,
} from "@/api/loginRegister.js";




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


export default {
  logout,
  Login,
};
