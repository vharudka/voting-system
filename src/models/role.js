export class Role {
  constructor(name, permissions = []) {
    this.name = name;
    this.permissions = permissions;
  }

  hasPermission(permission) {
    return this.permissions.includes(permission);
  }
}