import { ValidationError } from "../errors/validation-error.js";

export class VotingValidator {
  static validateTitle(title) {
    if (!title || title.trim() === "") {
      throw new ValidationError("Voting title cannot be empty");
    }
    if (title.length < 3) {
      throw new ValidationError("Voting title must be at least 3 characters");
    }
  }

  static validateOptions(options) {
    if (!Array.isArray(options) || options.length < 2) {
      throw new ValidationError("Voting must have at least 2 options");
    }

    for (const option of options) {
      if (!option || option.trim() === "") {
        throw new ValidationError("Option cannot be empty");
      }
    }
  }

  static validateLogins(logins) {
    if (!Array.isArray(logins) || logins.length < 2) {
      throw new ValidationError("Voting must have at least 2 logins");
    }

    for (const login of logins) {
      if (!login || login.trim() === "") {
        throw new ValidationError("Login cannot be empty");
      }
    }
  }

  static validateVotingId(votingId) {
    if (!votingId || votingId.trim() === "") {
      throw new ValidationError("Voting Id is required");
    }
  }
}