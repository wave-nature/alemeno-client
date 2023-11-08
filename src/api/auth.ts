import axios from "axios";
import Cookies from "js-cookie";

import { server } from "../env";
import { LoginPayload, SignupPayload } from "../types/auth";

export async function login(payload: LoginPayload) {
  let error = false,
    data;

  try {
    const response = await axios.post(`${server}/api/auth/login`, payload);
    data = response.data;
    Cookies.set("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = true;
      data = err.response?.data?.message;
      console.log(err.response?.data);
    }
  }

  return { data, error };
}
export async function signup(payload: SignupPayload) {
  let error = false,
    data;

  try {
    const response = await axios.post(`${server}/api/auth/signup`, payload);
    data = response.data;
    Cookies.set("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = true;
      data = err.response?.data?.message;
      console.log(err.response?.data);
    }
  }

  return { data, error };
}
