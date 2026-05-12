import { UserService } from "./services/user-service.js";
import { VotingService } from "./services/voting-service.js";
import { AuthController } from "./controllers/auth-controller.js";
import { VotingController } from "./controllers/voting-controller.js";

const userService = new UserService();
const votingService = new VotingService();
const authController = new AuthController(userService);
const votingController = new VotingController(votingService);