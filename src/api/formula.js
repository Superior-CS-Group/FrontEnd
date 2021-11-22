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
