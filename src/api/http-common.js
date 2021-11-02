import axios from "axios";
var DOMAIN = "192.168.0.104:8080";
const HTTP = axios.create({
  baseURL: `${DOMAIN}`,
//   headers: {
//     Authorization: `Basic `+ `${localStorage.getItem("token")}`,
//     "Access-Control-Allow-Origin": "*",
//     "Current-Page-Url": window.location.href
//   }
});
export { HTTP };