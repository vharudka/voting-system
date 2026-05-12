export class AuthValidator {
  static validateCredentials(login, password) {
    if (!login || login.trim() === "") {
      throw new Error("Login cannot be empty");
    }

    if (login.length < 3) {
      throw new Error("Login must be at least 3 characters");
    }

    if (!password || password.trim() === "") {
      throw new Error("Password cannot be empty");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
  }
}