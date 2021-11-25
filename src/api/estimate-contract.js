import api from "./api";

export async function sendEstimateContract(data) {
  const response = await api.request({
    url: "/estimation/sent-estimate-contract",
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
 