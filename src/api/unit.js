import api from "./api";

export async function GetAllUnits() {
  const response = await api.request({
    url: "/unit/list",
    method: "GET",
    
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return response;
}
