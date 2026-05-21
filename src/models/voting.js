export class Voting {
  constructor(id, title, options = [], logins = [], votes = {}) {
    this.id = id;
    this.title = title;
    this.options = options;
    this.logins = logins;
    this.votes = votes;
  }
}