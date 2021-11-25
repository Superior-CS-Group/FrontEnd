import { generateRandomId } from "../../utils/formula/formula";

export const transformSuggestionResponse = (response) => {
  return response.data.Data.map((item) => {
    return {
      customId: generateRandomId(),
      title: item.title,
      price: item.price,
      unit: item.unit,
      image: item.image,
      _id: item._id,
    };
  });
};
