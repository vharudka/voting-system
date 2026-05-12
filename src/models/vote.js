export class Vote {
  constructor(id, userId, votingId, optionId) {
    this.id = id;
    this.userId = userId;
    this.votingId = votingId;
    this.optionId = optionId;
  }
}