export function validateCreateItemInput(input) {
  const errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.description) {
    errors.description = "Description is required";
  }
  if (!input.price) {
    errors.price = "Price is required";
  }
  if (!input.unit) {
    errors.unit = "Unit is required";
  }
  if (!input.quantity) {
    errors.quantity = "Quantity is required";
  }

  return {
    errors,
    isVaid: Object.keys(errors).length === 0,
  };
}
