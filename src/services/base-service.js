import { AuthError } from "../errors/auth-error.js";

export class BaseService {
  constructor(memoryDb) {
    this.memoryDb = memoryDb;
  }

  getUserFromToken(token) {
    const login = this.memoryDb.getLoginByToken(token);
    if (!login) {
      throw new AuthError("Invalid or expired token");
    }

    const user = this.memoryDb.getUserByLogin(login);
    if (!user) {
      throw new AuthError("User not found");
    }

    return user;
  }
}