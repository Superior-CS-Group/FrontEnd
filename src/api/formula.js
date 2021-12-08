import api from "./api";
import { transformSuggestionResponse } from "./transform/formula";

export const getSuggestions = async (type, searchString) => {
  switch (type) {
    case "material":
      const response = await api.request({
        url: `/services/search-catelog-by-name?catelogName=${searchString}`,
        method: "GET",
      });
      if (response.remote === "success") {
        return {
          remote: response.remote,
          data: transformSuggestionResponse(response),
        };
      }
      return response;
    default:
      return {
        remote: "success",
        data: [],
      };
  }
};

export const getAllFormula = async () => {
  const response = await api.request({
    url: "/v2/formula/get-all-formula",
    method: "GET",
  });
  return response;
};

export const createFormula = async (formula) => {
  const response = await api.request({
    url: "/v2/formula/add-new-formula",
    method: "POST",
    data: formula,
  });
  return response;
};

export const getFormulaById = async (formulaId) => {
  const response = await api.request({
    url: `/v2/formula/get-formula-by-id/${formulaId}`,
    method: "GET",
  });
  return response;
};

export const updateFormula = async (formulaId, data) => {
  const response = await api.request({
    url: `/v2/formula/update-formula-by-id/${formulaId}`,
    method: "PUT",
    data,
  });
  return response;
};

export const deleteFormula = async (formulaId) => {
  const response = await api.request({
    url: `/v2/formula/delete-formula-by-id/${formulaId}`,
    method: "DELETE",
  });
  return response;
};

export const searchFormulaByName = async (searchString) => {
  const response = await api.request({
    url: `/v2/formula/search-formula-by-name/${searchString}`,
    method: "GET",
  });
  return response;
};

export const createUserEstimation = async (body) => {
  const response = await api.request({
    url: "/v2/user-estimation/create-user-estimation",
    method: "POST",
    data: body,
  });
  return response;
};

export const updateUserEstimation = async (estimationId, data) => {
  const response = await api.request({
    url: `/v2/user-estimation/update-user-estimation/${estimationId}`,
    method: "PUT",
    data,
  });
  return response;
};

export const getUserEstimation = async (userId) => {
  console.log("user: ", userId);
  const response = await api.request({
    url: `/v2/user-estimation/get-user-estimation/${userId}`,
    method: "GET",
  });
  return response;
};

export const getUserEstimationDetailsById = async (estimationId) => {
  const response = await api.request({
    url: `/v2/user-estimation/get-user-estimation-details-by-id/${estimationId}`,
    method: "GET",
  });
  return response;
};

export const deleteUserEstimation = async (estimationId) => {
  const response = await api.request({
    url: `/v2/user-estimation/delete-user-estimation/${estimationId}`,
    method: "DELETE",
  });
  return response;
};
