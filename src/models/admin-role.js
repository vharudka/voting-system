import { Role } from "./role.js";
import { Permission } from "./permission.js";

export class AdminRole extends Role {
  constructor() {
    super
      (
        "admin",
        [
          Permission.CREATE_VOTING,
          Permission.EDIT_VOTING,
          Permission.VIEW_ALL_VOTINGS,
          Permission.GENERATE_REPORTS
        ]
      );
  }
}