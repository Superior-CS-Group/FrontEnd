import api from "./api";

export async function deleteCatalog(data) {
  const response = await api.request({
    url: "/services/remove-service-catelog",
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
 