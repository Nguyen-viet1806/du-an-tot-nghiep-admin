import axios from "axios";
var DOMAIN = "http://localhost:8080";
// import { CAC_LOAI_LOI,MESS } from "@/constants/constants";
import router from "@/router/index.js";
function callApiLayLaiToken() {
  return axios.post(DOMAIN+`/api/webtpf/refreshtoken?refreshToken=${localStorage.getItem("refresh_token")}`, 
  );
}

const HTTP = axios.create({
  baseURL: `${DOMAIN}`,
  headers: {
    Token: `${localStorage.getItem("token")}`,
    refresh_token: `${localStorage.getItem("refresh_token")}`,
    "Access-Control-Allow-Origin": "*",
  }
});

HTTP.interceptors.response.use(
  (response) => {
    localStorage.setItem("api-version-be", response.headers["api-version"]);
    if (response.status === 200) {
      return response
    }
    if (response.status === 203) {
      localStorage.clear();
      router.push({path: "/" });
    }
  },

  function(error) {
    if (error.response.status === 401) {
      localStorage.clear();
      router.push({path: "/" });
      location.reload()
    }
    if (error && error.response && error.response.status === 406) {
      if (!error.config.url.includes("/api/webtpf/refreshtoken")) {
        console.log(error.config);
        callApiLayLaiToken()
          .then((res) => {
            localStorage.setItem("token", res.data.data.access_token);
            localStorage.setItem("refresh_token", res.data.data.refresh_token);
            const config = error.config;
            config.headers["Token"] = localStorage.getItem("token");
            config.headers["refresh_token"] = localStorage.getItem("refresh_token");
            HTTP.defaults.headers["Token"] = localStorage.getItem("token");
            HTTP.defaults.headers["refresh_token"] = localStorage.getItem("refresh_token");
            return new Promise((resolve, reject) => {
              axios
                .request(config)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
            });
          })
      }
    }
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
);
export { HTTP };