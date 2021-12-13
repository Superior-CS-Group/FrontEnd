import api from "./api";
import { transformGetOrganizationResposne } from "./transform/organization";

export async function getOrganizationDetails() {
  const response = await api.request({
    method: "GET",
    url: `/v1/organization/get-organization-details`,
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: transformGetOrganizationResposne(response.data.data),
    };
  }
  return response;
}

export async function updateOrganizationDetails(data) {
  const response = await api.request({
    method: "PUT",
    url: `/v1/organization/update-organization-details`,
    data,
  });
  return response;
}

export async function updateOrganizationPaymentTerms(data) {
  const response = await api.request({
    method: "PUT",
    url: `/v1/organization/update-organization-payment-terms`,
    data,
  });
  return response;
}
