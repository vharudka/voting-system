import crypto from "crypto";
import { UserRole } from "../models/user-role.js";
import { AdminRole } from "../models/admin-role.js";
import { User } from "../models/user.js";

export class MemoryDb {
  constructor() {
    this.users = new Map();
    this.userByLogin = new Map();
    this.tokens = new Map();

    this.seed();
  }

  seed() {
    const adminRole = new AdminRole();
    const userRole = new UserRole();

    const admin = new User(crypto.randomUUID(), "admin", "123123", adminRole);
    const user1 = new User(crypto.randomUUID(), "user1", "123123", userRole);
    const user2 = new User(crypto.randomUUID(), "user2", "123123", userRole);
    const user3 = new User(crypto.randomUUID(), "user3", "123123", userRole);
    const user4 = new User(crypto.randomUUID(), "user4", "123123", userRole);

    this.addUser(admin);
    this.addUser(user1);
    this.addUser(user2);
    this.addUser(user3);
    this.addUser(user4);
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