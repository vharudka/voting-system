export class Voting {
  constructor(id, name, options = [], userIds = [], votes = []) {
    this.id = id;
    this.name = name;
    this.options = options;
    this.userIds = userIds;
    this.votes = votes;
  }

  hasUser(userId) {
    return this.userIds.includes(userId);
  }

  hasVoted(userId) {
    return this.votes.some(v => v.userId === userId);
  }

  addUser(userId) {
    if (!this.hasUser(userId)) {
      this.userIds.push(userId);
    }
  }
}