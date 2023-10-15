import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  axios.defaults.baseURL = runtimeConfig.public.apiUrl;
  //axios.defaults.withCredentials = false;
  //axios.defaults.proxyHeaders = false;
  if (process.client) {
    const token = window.localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }
  return {
    provide: {
      axios: axios,
    },
  };
});
