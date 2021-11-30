export function validateCreateItemInput(input) {
  const errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  // if (!input.description) {
  //   errors.description = "Description is required";
  // }
  if (!input.price) {
    errors.price = "Price is required";
  }
  if (!input.unit) {
    errors.unit = "Unit is required";
  } else if (isNaN(input.unit)) {
    errors.unit = "Invalid Unit";
  }
  // if (!input.quantity) {
  //   errors.quantity = "Quantity is required";
  // }
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

export function validateCreateServiceInput(input) {
  const errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.day) {
    errors.day = "Day is required";
  } else if (isNaN(input.day)) {
    errors.day = "Invalid Day";
  }
  if (!input.hours) {
    errors.hours = "Hours is required";
  } else if (isNaN(input.hours)) {
    errors.hours = "Invalid Hours";
  }
  if (!input.productionRate) {
    errors.productionRate = "Production Rate is required";
  } else if (isNaN(input.productionRate)) {
    errors.productionRate = "Invalid Production Rate";
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
