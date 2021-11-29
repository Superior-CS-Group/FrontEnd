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

export const searchFormulaByName = async (searchString) => {
  const response = await api.request({
    url: `/v2/formula/search-formula-by-name/${searchString}`,
    method: "GET",
  });
  return response;
};

export const createUserEstimation = async (body) => {
  const response = await api.request({
    url: "/v2/user-stimation/create-user-estimation",
    method: "POST",
    data: body,
  });
  return response;
};

export const updateUserEstimation = async (estimationId, data) => {
  const response = await api.request({
    url: `/v2/user-stimation/update-user-estimation/:${estimationId}`,
    method: "PUT",
    data,
  });
  return response;
};

export const getUserEstimation = async () => {
  const response = await api.request({
    url: "/v2/user-stimation/update-user-estimation",
    method: "GET",
  });
  return response;
};
