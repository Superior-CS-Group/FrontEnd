import api from "./api";

export async function deleteCustomerLead(data) {
  console.log("data: ", data);
  const response = await api.request({
    url: "/customer/delete-lead",
    method: "post",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: response.data.Data[0],
    };
  }
  return response;
}
