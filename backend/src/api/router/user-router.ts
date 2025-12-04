import { Router } from "express";
import { UserController } from "../controller/UserController";
import { UserFollowsController } from "../controller/UserFollowsController";
import { validateAuthorization } from "../middleware/validate-authorization";

const userRouter = Router();
const userController = new UserController();
const userFollowsController = new UserFollowsController();

userRouter.get(
  "/search",
  userController.searchUsersByUsername.bind(userController)
);

userRouter.post(
  "/:userId/follow",
  validateAuthorization,
  userFollowsController.postFollow.bind(userFollowsController)
);

userRouter.get(
  "/:userId/followers",
  userFollowsController.getUserFollowers.bind(userFollowsController)
);

userRouter.get(
  "/:userId/followings",
  userFollowsController.getUserFollowing.bind(userFollowsController)
);

userRouter.get(
  "/:userId/tweets",
  userController.getUserTweets.bind(userController)
);

userRouter.get("/:userId", userController.getUserProfile.bind(userController));

export default userRouter;
