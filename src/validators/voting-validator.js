export class VotingValidator {
  static validateName(name) {
    if (!name || name.trim() === "") {
      throw new Error("Voting name cannot be empty");
    }
    if (name.length < 3) {
      throw new Error("Voting name must be at least 3 characters");
    }
  }

  static validateOptions(options) {
    if (!Array.isArray(options) || options.length < 2) {
      throw new Error("Voting must have at least 2 options");
    }

    for (const opt of options) {
      if (!opt.text || opt.text.trim() === "") {
        throw new Error("Option text cannot be empty");
      }
    }
  }

  static validateVotingId(votingId) {
    if (!votingId || votingId.trim() === "") {
      throw new Error("Voting ID is required");
    }

    if (isNaN(Date.parse(votingId))) {
      throw new Error("Voting ID must be a valid date");
    }
  }

  static validateUserId(userId) {
    if (!userId || userId.trim() === "") {
      throw new Error("User ID is required");
    }

    if (isNaN(Date.parse(userId))) {
      throw new Error("User ID must be a valid date");
    }
  }

  static validateOptionId(optionId) {
    if (!optionId || optionId.trim() === "") {
      throw new Error("Option ID is required");
    }
  }
}