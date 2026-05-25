import http from "http";
import path from "path";
import fs from "fs";
import { parse } from "url";

import { UserService } from "./services/user-service.js";
import { VotingService } from "./services/voting-service.js";
import { AuthController } from "./controllers/auth-controller.js";
import { UserController } from "./controllers/user-controller.js";
import { VotingController } from "./controllers/voting-controller.js";
import { MemoryDb } from "./data/memory-db.js";
import { AuthError } from "./errors/auth-error.js";
import { ConflictError } from "./errors/conflict-error.js";
import { ValidationError } from "./errors/validation-error.js";

const memoryDb = new MemoryDb();
const userService = new UserService(memoryDb);
const votingService = new VotingService(memoryDb);
const authController = new AuthController(userService);
const userController = new UserController(userService);
const votingController = new VotingController(votingService);

const server = http.createServer((req, res) => {
  const { pathname } = parse(req.url, true);

  const staticDirs = ["/pages", "/css", "/clients", "/libs/canvas-charts"];
  for (const dir of staticDirs) {
    let filePath = '';

    if (pathname.includes(dir)) {
      filePath = path.join(process.cwd(), pathname);
    }
    else {
      filePath = path.join(process.cwd(), dir, pathname);
    }

    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);

      if (ext === ".js") {
        res.writeHead(200, { "Content-Type": "application/javascript" });
      }
      return res.end(fs.readFileSync(filePath));
    }
  }

  if (pathname === "/api/auth/register" && req.method === "POST") {
    return handleJson(req, res, body => {
      return authController.register(body.login, body.password);
    });
  }

  if (pathname === "/api/auth/login" && req.method === "POST") {
    return handleJson(req, res, body => {
      return authController.login(body.login, body.password);
    });
  }

  if (pathname === "/api/auth/logout" && req.method === "GET") {
    const token = req.headers["authorization"];

    return handleJson(req, res, body => {
      return authController.logout(token);
    });
  }

  if (pathname === "/api/users" && req.method === "GET") {
    const token = req.headers["authorization"];

    return handleJson(req, res, body => {
      return userController.getAll(token);
    });
  }

  if (pathname === "/api/votings" && req.method === "POST") {
    const token = req.headers["authorization"];

    return handleJson(req, res, body => {
      return votingController.create(token, body.title, body.options, body.logins);
    });
  }

  if (pathname.startsWith("/api/votings/") && pathname.endsWith("/votes") && req.method === "GET") {
    const token = req.headers["authorization"];
    const id = pathname.split("/")[3];

    return handleJson(req, res, body => {
      return votingController.getResults(token, id);
    });
  }

  if (pathname === "/api/votings" && req.method === "GET") {
    const token = req.headers["authorization"];

    return handleJson(req, res, body => {
      return votingController.getAll(token);
    });
  }

  if (pathname.startsWith("/api/votings/") && req.method === "GET") {
    const token = req.headers["authorization"];
    const id = pathname.split("/")[3];

    return handleJson(req, res, body => {
      return votingController.get(token, id);
    });
  }

  if (pathname.startsWith("/api/votings/") && req.method === "PUT") {
    const token = req.headers["authorization"];
    const id = pathname.split("/")[3];

    return handleJson(req, res, body => {
      return votingController.update(token, id, body.title, body.options, body.logins);
    });
  }

  if (pathname.startsWith("/api/votings/") && pathname.endsWith("/votes") && req.method === "POST") {
    const token = req.headers["authorization"];
    const id = pathname.split("/")[3];

    return handleJson(req, res, body => {
      return votingController.castVote(token, id, body.option);
    });
  }

  res.writeHead(404);
  res.end("Not found");
});

function handleJson(req, res, callback) {
  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    let jsonBody;

    try {
      jsonBody = JSON.parse(body || "{}");
    } catch {
      return json(res, { error: "Invalid JSON" }, 400);
    }

    try {
      const result = callback(jsonBody);

      if (result !== undefined) {
        json(res, result, 200);
      }
    } catch (err) {
      handleError(res, err);
    }
  });
}

function handleError(res, err) {
  if (err instanceof ValidationError) {
    return json(res, { error: err.message }, 400);
  }

  if (err instanceof AuthError) {
    return json(res, { error: err.message }, 401);
  }

  if (err instanceof ConflictError) {
    return json(res, { error: err.message }, 409);
  }

  return json(res, { error: "Internal server error" }, 500);
}

function json(res, data, status = 200) {
  res.writeHead(status);
  res.end(JSON.stringify(data));
}

server.listen(3000);