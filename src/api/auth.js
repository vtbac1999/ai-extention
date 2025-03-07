import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { CHANGE_PASSWORD, FORGOT_PASSWORD, LOGIN, REGISTER } from "./constant";
import api from "@/utils/interceptors";

const login = async (user) => {
  try {
    const { data } = await axios.post(LOGIN, user);
    return data;
  } catch (error) {
    let errorMessage = "Failed to login";
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message || error.message;
    }
    throw new Error(errorMessage);
  }
};

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (!data.result) return;
      Cookies.set("accessToken", data.result.accessToken, { expires: 7 });
      Cookies.set("refreshToken", data.result.refreshToken, { expires: 7 });
    },
  });
}

const register = async (user) => {
  try {
    const { data } = await axios.post(REGISTER, user);
    return data;
  } catch (error) {
    let errorMessage = "Failed to create account";
    if (error instanceof AxiosError) {
      if (error.response?.data.code === 11000) {
        errorMessage = "Your email is already in use";
      } else {
        errorMessage = error.response?.data.message || error.message;
      }
    }
    throw new Error(errorMessage);
  }
};

export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}

const forgotPassword = async (user) => {
  try {
    await axios.post(FORGOT_PASSWORD, user);
  } catch (error) {
    let errorMessage = "Failed to send email";
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message || error.message;
    }
    throw new Error(errorMessage);
  }
};

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

const changePassword = async (data) => {
  try {
    await api.put(CHANGE_PASSWORD, data);
  } catch (error) {
    let errorMessage = "Failed to change password";
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message || error.message;
    }
    throw new Error(errorMessage);
  }
};

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}