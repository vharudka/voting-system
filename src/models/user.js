export class User {
  constructor(id, login, password, role) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.role = role;
  }

  hasPermission(permission) {
    return this.role.hasPermission(permission);
  }
}