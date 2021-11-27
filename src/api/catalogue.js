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

export async function getCatalogItem() {
  const response = await api.request({
    url: "/v2/catalog/get-all-catalog",
    method: "GET",
  });
  return response;
}

export async function getVariationsByCatalogId(id) {
  const response = await api.request({
    url: `/v2/catalog/get-allVariation-by-catalog/${id}`,
    method: "GET",
  });
  return response;
}

export async function createCatalogItem(data) {
  const response = await api.request({
    url: "/v2/catalog/create-catalog",
    method: "POST",
    data,
  });
  return response;
}

export async function createVariation(data) {
  const response = await api.request({
    url: "/v2/catalog/create-variation",
    method: "POST",
    data,
  });
  console.log("response", response);
  return response;
}
