//
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://book-management-19jv.onrender.com/api",
});

export default axiosInstance;
