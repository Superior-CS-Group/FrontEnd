import api from "./api";

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