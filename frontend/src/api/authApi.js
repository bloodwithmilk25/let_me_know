import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/"
});
