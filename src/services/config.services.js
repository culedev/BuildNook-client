import axios from "axios";

// Organizate calls to backend
const service = axios.create({
  baseURL: "http://localhost:5005/api",
});

// INTERCEPTOR -> Add token to the call using interceptor
service.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    config.headers = {
      authorization: `Bearer ${authToken}`,
    };
  }
  return config;
});

export default service;
