import crypto from "crypto";
import { UserRole } from "../models/user-role.js";
import { AdminRole } from "../models/admin-role.js";
import { User } from "../models/user.js";
import { Voting } from "../models/voting.js";

export class MemoryDb {
  constructor() {
    this.users = new Map();
    this.tokens = new Map();
    this.votings = new Map();

    this.seedUsers();
    this.seedVotings();
  }

  seedUsers() {
    const adminRole = new AdminRole();
    const userRole = new UserRole();

    const admin = new User("admin", "123123", adminRole);
    const user1 = new User("user1", "123123", userRole);
    const user2 = new User("user2", "123123", userRole);
    const user3 = new User("user3", "123123", userRole);
    const user4 = new User("user4", "123123", userRole);

    this.addUser(admin);
    this.addUser(user1);
    this.addUser(user2);
    this.addUser(user3);
    this.addUser(user4);
  }

  seedVotings() {
    const voting1 = new Voting
    (
      crypto.randomUUID(),
      "Favorite Programming Language",
      [
        "JavaScript",
        "Python",
        "C#"
      ],
      [
        "user1",
        "user2",
        "user3"
      ],
      {}
    );

    const voting2 = new Voting
    (
      crypto.randomUUID(),
      "Best Food",
      [
        "Pizza",
        "Burger",
        "Kebab",
        "Sushi"
      ],
      [
        "user1",
        "user2",
        "user3"
      ],
      {
        "user1": 1,
        "user2": 3,
        "user3": 3
      }
    );

    this.addOrUpdateVoting(voting1);
    this.addOrUpdateVoting(voting2);
  }

  addUser(user) {
    this.users.set(user.login, user);
  }

  getUserByLogin(login) {
    return this.users.get(login);
  }

  userExists(login) {
    return this.users.has(login);
  }

  saveToken(token, login) {
    this.tokens.set(token, login);
  }

  getLoginByToken(token) {
    return this.tokens.get(token);
  }

  invalidateToken(token) {
    this.tokens.delete(token);
  }

  getAllUsers() {
    return [...this.users.values()];
  }

  addOrUpdateVoting(voting) {
    this.votings.set(voting.id, voting);
  }

  getVotingById(id) {
    return this.votings.get(id);
  }

  getVotingByIdForLogin(login, id) {
    const voting = this.votings.get(id);
    if (!voting || !voting.logins.includes(login)) {
      return null;
    }

    return voting;
  }

  getAllVotings() {
    return [...this.votings.values()];
  }

  getVotingsForLogin(login) {
    return [...this.votings.values()].filter(v => v.logins.includes(login));
  }
}