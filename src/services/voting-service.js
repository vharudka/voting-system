import { Permission } from "../models/permissions.js";
import { AuthError } from "../errors/auth-error.js";
import { ValidationError } from "../errors/validation-error.js";
import { Voting } from "../models/voting.js";

export class VotingService {
  constructor(memoryDb) {
    this.memoryDb = memoryDb;
  }

  find(id) {

  }

  create(token, title, options, logins) {
    var login = this.memoryDb.getLoginByToken(token);

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

    this.memoryDb.addVoting(voting);

    return voting;
  }

  update(token, name, options, userIds) {

  }

  castVote(token, votingId, optionId) {

  }

  get(token, id) {

  }

  getAll(token) {

  }
}