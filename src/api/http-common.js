import axios from "axios";
var DOMAIN = "http://localhost:1234";
const HTTP = axios.create({
  baseURL: `${DOMAIN}`,
//   headers: {
//     Authorization: `Basic `+ `${localStorage.getItem("token")}`,
//     "Access-Control-Allow-Origin": "*",
//     "Current-Page-Url": window.location.href
//   }
});
export { HTTP };