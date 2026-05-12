import { AuthValidator } from "../validators/auth-validator.js";

export class AuthController {
  constructor(userService) {
    this.userService = userService;
  }

  login(login, password) {
    AuthValidator.validateCredentials(login, password);
    return this.userService.authenticate(login, password);
  }

  register(login, password) {
    AuthValidator.validateCredentials(login, password);
    return this.userService.createUser(login, password);
  }

  logout() {
    return { success: true };
  }
}