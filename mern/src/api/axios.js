import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function (config) {
  const { token } = JSON.parse(localStorage.getItem("userInfo"));

  console.log(token);

  config.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return config;
});

export default axiosInstance;
