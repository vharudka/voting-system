import { Role } from "./Role.js";
import { Permission } from "./Permission.js";

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