import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/search",
  userController.searchUsersByUsername.bind(userController)
);

userRouter.get(
  "/:userId/tweets",
  userController.getUserTweets.bind(userController)
);

userRouter.get(
  "/:userId",
  userController.getUserProfile.bind(userController)
);

export default userRouter;
