export class VotingResult {
  constructor(votingId, optionResults, totalVoteCount) {
    this.votingId = votingId;
    this.optionResults = optionResults;
    this.totalVoteCount = totalVoteCount;
  }
}