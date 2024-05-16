import axios from "axios";

export const axiosInstace = axios.create({
  withCredentials: true,
  baseURL: "http://192.168.50.131:8000/api/service-manager-service/v1",
});
