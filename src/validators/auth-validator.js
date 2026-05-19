import { ValidationError } from "../errors/validation-error.js";

export class AuthValidator {
  static validateCredentials(login, password) {
    if (!login || login.trim() === "") {
      throw new ValidationError("Login cannot be empty");
    }

    if (login.length < 3) {
      throw new ValidationError("Login must be at least 3 characters");
    }

    if (!password || password.trim() === "") {
      throw new ValidationError("Password cannot be empty");
    }

    if (password.length < 6) {
      throw new ValidationError("Password must be at least 6 characters");
    }
  }
}