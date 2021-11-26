import api from "./api";

export async function getEmailSetting() {
  const response = await api.request({
    url: "/admin/get-email-setting",
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: response.data.Data[0],
    };
  }
  return response;
}

export async function updateEmailSetting(body) {
  const response = await api.request({
    url: "/admin/update-email-setting",
    method: "Post",
    data: body,
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: response.data.Data[0],
    };
  }
  return response;
}
