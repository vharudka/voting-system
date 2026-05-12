import { VotingValidator } from "../validators/voting-validator.js";

export class VotingController {
  constructor(votingService) {
    this.votingService = votingService;
  }

  createVoting(userId, name, options, userIds) {
    VotingValidator.validateName(name);
    VotingValidator.validateOptions(options);

    return this.votingService.createVoting(userId, name, options, userIds);
  }

  updateVoting(userId, name, options, userIds) {
    VotingValidator.validateName(name);
    VotingValidator.validateOptions(options);

    return this.votingService.updateVoting(userId, name, options, userIds);
  }

  castVote(userId, votingId, optionId) {
    VotingValidator.validateVotingId(votingId);
    VotingValidator.validateOptionId(optionId);

    return this.votingService.castVote(userId, votingId, optionId);
  }

  getVoting(votingId) {
    VotingValidator.validateVotingId(votingId);

    return this.votingService.getVoting(votingId);
  }

  getVotingsForUser(userId) {
    VotingValidator.validateUserId(userId);

    return this.votingService.getVotingsForUser(userId);
  }

  getAllVotings(userId) {
    VotingValidator.validateUserId(userId);

    return this.votingService.getAllVotings(userId);
  }

  getResults(votingId) {
    VotingValidator.validateVotingId(votingId);

    return this.votingService.getResults(votingId);
  }
}