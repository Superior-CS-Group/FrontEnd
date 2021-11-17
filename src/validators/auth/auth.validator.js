import Validator from "validator";
import isEmpty from "is-empty";

/**
 * @description Validates the user signup data step 1 and return the errors
 */
export const signUpStepOneSchema = (data) => {
  const errors = {};
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }
  if (Validator.isEmpty(data.companyName)) {
    errors.companyName = "Company Name is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password is required";
  }
  if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Password doesn't match";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};
