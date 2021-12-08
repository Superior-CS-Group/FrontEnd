import api from "./api";
import { transformUserResponse } from "./transform/user";

export async function updateCustomerStatus(data) {
  const response = await api.request({
    url: "/auth/update-status",
    method: "POST",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return response;
}

export async function updatePassword(data) {
  const response = await api.request({
    url: "/auth/change-password",
    method: "POST",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return response;
}

export async function updateIsAdminStatus(data) {
  const response = await api.request({
    url: "/auth/update-isadmn-status",
    method: "POST",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return response;
}

export async function resetPassword(data) {
  const response = await api.request({
    url: "/auth/recover-password-link",
    method: "POST",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return response;
}

export async function getCurrentUser() {
  const response = await api.request({
    url: "/auth/get-user-details",
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: transformUserResponse(response.data.user),
    };
  }
}
