export class MemoryDb {
  constructor() {
    this.users = new Map();
    this.userByLogin = new Map();
    this.tokens = new Map();
  }

  addUser(user) {
    this.users.set(user.id, user);
    this.userByLogin.set(user.login, user.id);
  }

  getUserById(id) {
    return this.users.get(id);
  }

  getUserByLogin(login) {
    const id = this.userByLogin.get(login);
    return this.users.get(id);
  }

  userExists(login) {
    return this.userByLogin.has(login);
  }

  saveToken(token, userId) {
    this.tokens.set(token, userId);
  }

  getUserIdByToken(token) {
    return this.tokens.get(token);
  }

  invalidateToken(token) {
    this.tokens.delete(token);
  }
}