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

  update(token, id, title, options, logins) {
    AuthValidator.validateToken(token);
    VotingValidator.validateVotingId(id);
    VotingValidator.validateTitle(title);
    VotingValidator.validateOptions(options);
    VotingValidator.validateLogins(logins);
    
    return this.votingService.update(token, id, title, options, logins);
  }

  castVote(token, id, optionId) {
    AuthValidator.validateToken(token);
    VotingValidator.validateVotingId(id);
    VotingValidator.validateOptionId(optionId);

    return this.votingService.castVote(token, id, optionId);
  }

  get(token, id) {
    AuthValidator.validateToken(token);
    VotingValidator.validateVotingId(id);

    return this.votingService.get(token, id);
  }

  getAll(token) {
    AuthValidator.validateToken(token);

    return this.votingService.getAll(token);
  }

  getResults(token, id) {
    AuthValidator.validateToken(token);
    VotingValidator.validateVotingId(id);

    return this.votingService.getResults(id);
  }
}