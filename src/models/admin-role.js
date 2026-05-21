import { Role } from "./role.js";
import { Permission } from "./permissions.js";

export class AdminRole extends Role {
  constructor() {
    super
      (
        "admin",
        [
          Permission.CREATE_VOTING,
          Permission.EDIT_VOTING,
          Permission.VIEW_ALL_VOTINGS,
          Permission.VIEW_ALL_USERS,
          Permission.CAST_VOTE,
          Permission.GENERATE_REPORTS
        ]
      );
  }
}