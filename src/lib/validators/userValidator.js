import validator from "validator";
import ValidationResponse from "./ValidationResponse";

class UserValidator {
  static validateEmail(email = "") {
   email = email.trim()
    if (!email) {
      return ValidationResponse.error("email is required");
    } else if (!validator.isEmail(email)) {
      return ValidationResponse.error("Provide valid email address");
    }
    return ValidationResponse.success("");
  }

  static validateName(name = "") {
    name = name.trim()
    if (!name) {
      return ValidationResponse.error("name is required");
    } else if (name.length < 3) {
      return ValidationResponse.error("name should be at least of length 3");
    }
    return ValidationResponse.success("");
  }

  static validatePassword(password = "") {
    password = password.trim()
    if (!password) {
      return ValidationResponse.error("password is required");
    } else if (password.length < 3) {
      return ValidationResponse.error(
        "password should be at least of length 3"
      );
    }
    return ValidationResponse.success("");
  }
}

export default UserValidator;
