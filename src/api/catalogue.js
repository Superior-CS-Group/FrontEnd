import api from "./api";

export async function deleteCatalog(id) {
  const response = await api.request({
    url: `/v2/catalog/delete-catalog/${id}`,
    method: "DELETE",
  });
  return response;
}

export async function getCatalogItem(id) {
  const response = await api.request({
    url: `/v2/catalog/get-all-catalog?catalogId=${id}`,
    method: "GET",
  });
  return response;
}

export async function getVariationsByCatalogId(id) {
  const response = await api.request({
    url: `/v2/catalog/get-all-variation-by-catalog?catalogId=${id}`,
    method: "GET",
  });
  return response;
}

export async function getServices(pageNumber, pageSize) {
  pageSize = pageSize || 10;
  const response = await api.request({
    url: `/v2/catalog/get-all-services?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    method: "GET",
  });
  return response;
}

export async function createService(data) {
  const response = await api.request({
    url: "/v2/catalog/create-service",
    method: "POST",
    data,
  });
  return response;
}

export async function updateService(serviceId, data) {
  const response = await api.request({
    url: `/v2/catalog/update-service/${serviceId}`,
    method: "PUT",
    data,
  });
  return response;
}

export async function removeServices(data) {
  const response = await api.request({
    url: "/v2/catalog/remove-services",
    method: "post",
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

export async function searchCatalogByName(name, type) {
  const response = await api.request({
    url: `/v2/catalog/search-catalog-by-name/${name}?searchFor=${type}`,
    method: "GET",
  });
  return response;
}

export async function updateCatalog(data) {
  const response = await api.request({
    url: `/v2/catalog/update-catalog/${data._id}`,
    method: "PUT",
    data,
  });
  console.log("responseDS: ", response);
  return response;
}

export async function removeVariation(id) {
  const response = await api.request({
    url: `/v2/catalog/delete-variation/${id}`,
    method: "DELETE",
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return response;
}

export async function updateVariation(data) {
  const response = await api.request({
    url: `/v2/catalog/update-variation/${data._id}`,
    method: "PUT",
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

export async function getVariationItem(data) {
  const response = await api.request({
    url: "/v2/catalog/get-variation",
    method: "POST",
    data,
  });
  return response;
}
