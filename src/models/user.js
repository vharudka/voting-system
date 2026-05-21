export class User {
  constructor(login, password, role) {
    this.login = login;
    this.password = password;
    this.role = role;
  }

  hasPermission(permission) {
    return this.role.hasPermission(permission);
  }
}