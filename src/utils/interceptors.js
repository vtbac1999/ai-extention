import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.API_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const locale = Cookies.get("NEXT_LOCALE") || "vi";
    config.headers["accept-language"] = locale;

    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = Cookies.get('refreshToken');
//         const response = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken });

//         const newAccessToken = response?.data?.accessToken;
//         Cookies.set('accessToken', newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error('Refresh token failed:', refreshError);
//         // Cookies.remove('accessToken');
//         // Cookies.remove('refreshToken');
//         // window.location.href = `/`;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
