import { Router } from "express";
import CreateUserController from "./controllers/CreateUserController";
import CreateTagController from "./controllers/CreateTagController";
import ensureAuthenticated from "./middlewares/ensureAuthenticated";
import { AuthenticaUserController } from "./controllers/AuthenticaUserController";
import CreateComplimentController from "./controllers/CreateComplimentController";
import ensureAdmin from "./middlewares/ensureAdmin";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUsersReeceiveComplimentsController } from "./controllers/ListUsersReeceiveComplimentsController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticaUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUsersReeceiveComplimentsController = new ListUsersReeceiveComplimentsController();

router.post("/users", createUserController.handle);

router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
router.post("/login", authenticateUserController.handle);

router.post(
  "/compliment",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);

router.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listUsersReeceiveComplimentsController.handle
);

export { router };
