import { VotingValidator } from "../validators/voting-validator.js";
import { AuthValidator } from "../validators/auth-validator.js";

export class VotingController {
  constructor(votingService) {
    this.votingService = votingService;
  }

  create(token, title, options, logins) {
    AuthValidator.validateToken(token);
    VotingValidator.validateTitle(title);
    VotingValidator.validateOptions(options);
    VotingValidator.validateLogins(logins);

    return this.votingService.create(token, title, options, logins);
  }

  update(token, title, options, logins) {
    AuthValidator.validateToken(token);
    VotingValidator.validateTitle(title);
    VotingValidator.validateOptions(options);
    VotingValidator.validateLogins(logins);

    return this.votingService.update(token, title, options, logins);
  }

  castVote(token, votingId, optionId) {
    AuthValidator.validateToken(token);
    VotingValidator.validateVotingId(votingId);
    VotingValidator.validateOptionId(optionId);

    return this.votingService.castVote(userId, votingId, optionId);
  }

  getVoting(token, votingId) {
    AuthValidator.validateToken(token);
    VotingValidator.validateVotingId(votingId);

    return this.votingService.get(votingId);
  }

  getAll(token) {
    AuthValidator.validateToken(token);

    return this.votingService.getAll(token);
  }

  getResults(token, votingId) {
    AuthValidator.validateToken(token);
    VotingValidator.validateVotingId(votingId);

    return this.votingService.getResults(votingId);
  }
}