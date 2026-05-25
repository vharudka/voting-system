import { Permission } from "../models/permissions.js";
import { AuthError } from "../errors/auth-error.js";
import { ValidationError } from "../errors/validation-error.js";
import { Voting } from "../models/voting.js";
import { BaseService } from "./base-service.js";

export class VotingService extends BaseService {
  constructor(memoryDb) {
    super(memoryDb);
  }

  create(token, title, options, logins) {
    const user = this.getUserFromToken(token);

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
    const user = this.getUserFromToken(token);

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

  castVote(token, id, option) {
    const login = this.memoryDb.getLoginByToken(token);
    if (!login) {
      throw new AuthError("Invalid or expired token");
    }

    const user = this.memoryDb.getUserByLogin(login);
    if (!user) {
      throw new AuthError("User not found");
    }

    const voting = this.memoryDb.getVotingById(id);
    if (!voting) {
      throw ValidationError(`Voting '${id}' doesn't exist`);
    }

    if (!voting.logins.includes(login)) {
      throw new ValidationError("User are not assigned to this voting");
    }

    if (voting.votes[login] !== undefined) {
      throw new ValidationError("User have already voted");
    }

    const index = voting.options.indexOf(option);
    if (index === -1) {
      throw new ValidationError(`Option '${option}' doesn't exist`);
    }

    voting.votes[login] = index;

    this.memoryDb.addOrUpdateVoting(voting);

    return voting;
  }

  get(token, id) {
    const user = this.getUserFromToken(token);

    if (user.hasPermission(Permission.VIEW_ALL_VOTINGS)) {
      return this.memoryDb.getVotingById(id);
    } else if (user.hasPermission(Permission.VIEW_ASSIGNED_VOTINGS)) {
      return this.memoryDb.getVotingByIdForLogin(login, id);
    } else {
      throw new AuthError("You do not have permission to view voting");
    }
  }

  getAll(token) {
    const user = this.getUserFromToken(token);

    if (user.hasPermission(Permission.VIEW_ALL_VOTINGS)) {
      return this.memoryDb.getAllVotings();
    } else if (user.hasPermission(Permission.VIEW_ASSIGNED_VOTINGS)) {
      return this.memoryDb.getVotingsForLogin(login);
    } else {
      throw new AuthError("You do not have permission to view votings");
    }
  }

  getResults(token, id) {
    const user = this.getUserFromToken(token);

    const voting = this.memoryDb.getVotingById(id);
    if (!voting) {
      throw ValidationError(`Voting '${id}' doesn't exist`);
    }

    const results = {};
    for (const option of voting.options) {
      results[option] = 0;
    }

    if (!user.hasPermission(Permission.VIEW_CHARTS)) {
      throw new AuthError("You do not have permission to generate reports");
    }

    for (const [user, optionIndex] of Object.entries(voting.votes)) {
      const optionName = voting.options[optionIndex];
      if (results[optionName] !== undefined) {
        results[optionName]++;
      }
    }

    return results;
  }
}