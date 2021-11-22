import api from "./api";

export async function updateCustomerDetails(data) {
  const response = await api.request({
    url: "/customer/update-info",
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
