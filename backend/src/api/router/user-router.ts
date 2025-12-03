import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/:username",
  userController.getUserProfile.bind(userController)
);

export default userRouter;
