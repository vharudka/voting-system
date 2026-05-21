import { Permission } from "../models/permissions.js";
import { AuthError } from "../errors/auth-error.js";
import { ValidationError } from "../errors/validation-error.js";
import { Voting } from "../models/voting.js";

export class VotingService {
  constructor(memoryDb) {
    this.memoryDb = memoryDb;
  }

  create(token, title, options, logins) {
    const login = this.memoryDb.getLoginByToken(token);
    if (!login) {
      throw new AuthError("Invalid or expired token");
    }

    const user = this.memoryDb.getUserByLogin(login);
    if (!user) {
      throw new AuthError("User not found");
    }

    if (!user.hasPermission(Permission.CREATE_VOTING)) {
      throw new AuthError("You do not have permission to create votings");
    }

    for (const login of logins) {
      if (!this.memoryDb.userExists(login)) {
        throw ValidationError(`Login '${login}' does not exist and cannot be assigned to this voting`);
      }
    }

    const voting = new Voting
    (
      crypto.randomUUID(),
      title.trim(),
      options.map(o => o.trim()),
      logins.map(l => l.trim()),
      {}
    );

    this.memoryDb.addOrUpdateVoting(voting);

    return voting;
  }

  update(token, id, title, options, logins) {
    const login = this.memoryDb.getLoginByToken(token);
    if (!login) {
      throw new AuthError("Invalid or expired token");
    }

    const user = this.memoryDb.getUserByLogin(login);
    if (!user) {
      throw new AuthError("User not found");
    }

    if (!user.hasPermission(Permission.EDIT_VOTING)) {
      throw new AuthError("You do not have permission to edit votings");
    }

    for (const login of logins) {
      if (!this.memoryDb.userExists(login)) {
        throw ValidationError(`Login '${login}' does not exist and cannot be assigned to this voting`);
      }
    }

    const existingVoting = this.memoryDb.getVotingById(id);
    if (!existingVoting) {
      throw ValidationError(`Voting '${id}' doesn't exist`);
    }

    const voting = new Voting
    (
      id.trim(),
      title.trim(),
      options.map(o => o.trim()),
      logins.map(l => l.trim()),
      {}
    );

    this.memoryDb.addOrUpdateVoting(voting);

    return voting;
  }

  castVote(token, votingId, optionId) {

  }

  get(token, id) {
    const login = this.memoryDb.getLoginByToken(token);
    if (!login) {
      throw new AuthError("Invalid or expired token");
    }

    const user = this.memoryDb.getUserByLogin(login);
    if (!user) {
      throw new AuthError("User not found");
    }

    if (user.hasPermission(Permission.VIEW_ALL_VOTINGS)) {
      return this.memoryDb.getVotingById(id);
    } else if (user.hasPermission(Permission.VIEW_ASSIGNED_VOTINGS)) {
      return this.memoryDb.getVotingByIdForLogin(login, id);
    } else {
      throw new AuthError("You do not have permission to view voting");
    }
  }

  getAll(token) {
    const login = this.memoryDb.getLoginByToken(token);
    if (!login) {
      throw new AuthError("Invalid or expired token");
    }

    const user = this.memoryDb.getUserByLogin(login);
    if (!user) {
      throw new AuthError("User not found");
    }

    if (user.hasPermission(Permission.VIEW_ALL_VOTINGS)) {
      return this.memoryDb.getAllVotings();
    } else if (user.hasPermission(Permission.VIEW_ASSIGNED_VOTINGS)) {
      return this.memoryDb.getVotingsForLogin(login);
    } else {
      throw new AuthError("You do not have permission to view votings");
    }
  }
}