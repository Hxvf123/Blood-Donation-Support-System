// axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://14.225.210.212:8080", //  URL gốc từ Swagger
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
