import axios from "axios";

export const axiosInstace = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000/api/service-manager-service/v1",
});
