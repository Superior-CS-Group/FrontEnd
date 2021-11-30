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
    url: `/v2/catalog/get-all-variation-by-catalog?catalogId=${id}`,
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

export async function searchCatalogByName(name, type) {
  const response = await api.request({
    url: `/v2/catalog/search-catalog-by-name/${name}?searchFor=${type}`,
    method: "GET",
  });
  return response;
}

export async function removeCatalog(data) {
  const response = await api.request({
    url: "/v2/catalog/remove-catalog",
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


export async function updateCatalog(data) {
  const response = await api.request({
    url: "/v2/catalog/update-catalog",
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


export async function removeVariation(data) {
  const response = await api.request({
    url: "/v2/catalog/remove-variation",
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


export async function updateVariation(data) {
  const response = await api.request({
    url: "/v2/catalog/update-variation",
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
