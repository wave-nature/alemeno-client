import Cookies from "js-cookie";

export const server = window.location.href.includes("localhost")
  ? "http://127.0.0.1:8080"
  : "https://alemeno-server-7z6k.onrender.com";

export function config() {
  return {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
}
