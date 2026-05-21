export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAll(token) {
    return this.userService.getAll(token);
  }
}