import { generateRandomId } from "../../utils/formula/formula";

export const transformSuggestionResponse = (response) => {
  return response.data.Data.map((item) => {
    return {
      customId: generateRandomId(),
      name: item.name,
      type: item.type,
      _id: item._id,
    };
  });
};
