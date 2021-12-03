import api from "./api";
import { transformSignUpResponse } from "./transform/auth";

export const signup = async (data) => {
  const response = await api.request({
    url: "/auth/sign-up",
    method: "POST",
    data,
  });
  if (response.remote === "success") {
    // localStorage.setItem("token", response.data.token);
    return {
      remote: response.remote,
      data: transformSignUpResponse(response),
    };
  }
  return response;
};
