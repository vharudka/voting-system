import crypto from "crypto";
import { MemoryDb } from "../data/memory-db.js";
import { UserRole } from "../models/user-role.js";
import { User } from "../models/user.js";
import { Permission } from "../models/permissions.js";
import { AuthError } from "../errors/auth-error.js";
import { ConflictError } from "../errors/conflict-error.js";
import { BaseService } from "./base-service.js";

export class UserService extends BaseService {
  constructor(memoryDb) {
    super(memoryDb);
  }

  generateToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  authenticate(login, password) {
    const user = this.memoryDb.getUserByLogin(login);

    if (!user || user.password !== password) {
      throw new AuthError("Invalid login or password");
    }

    const token = this.generateToken();
    this.memoryDb.saveToken(token, user.login);

    return { token };
  }

  createUser(login, password) {
    if (this.memoryDb.userExists(login)) {
      throw new ConflictError(`Login '${login}' already exists`);
    }

    const role = new UserRole();

    const user = new User(login, password, role);

    this.memoryDb.addUser(user);

    return user;
  }

  logout(token) {
    this.memoryDb.invalidateToken(token);
  }

  getAll(token) {
    const user = this.getUserFromToken(token);

    if (!user.hasPermission(Permission.VIEW_ALL_USERS)) {
      throw new AuthError("You do not have permission to view all users");
    }

    return this.memoryDb.getAllUsers();
  }
}