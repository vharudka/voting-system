import { Role } from "./role.js";
import { Permission } from "./permissions.js";

export class UserRole extends Role {
  constructor() {
    super
      (
        "user",
        [
          Permission.VIEW_ASSIGNED_VOTINGS,
          Permission.CAST_VOTE
        ]
      );
  }
}