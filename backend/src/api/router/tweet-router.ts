import { Router } from "express";
import { TweetController } from "../controller/TweetController";
import { TweetLikeController } from "../controller/TweetLikeController";
import { validateAuthorization } from "../middleware/validate-authorization";

const tweetRouter = Router();
const tweetController = new TweetController();
const tweetLikeController = new TweetLikeController();

tweetRouter.post(
  "/",
  validateAuthorization,
  tweetController.createTweet.bind(tweetController)
);

tweetRouter.get("/:id", tweetController.getTweet.bind(tweetController));

tweetRouter.patch(
  "/:id",
  validateAuthorization,
  tweetController.patchUpdateTweet.bind(tweetController)
);

tweetRouter.delete(
  "/:id",
  validateAuthorization,
  tweetController.deleteTweet.bind(tweetController)
);

tweetRouter.post(
  "/:id/like",
  validateAuthorization,
  tweetLikeController.toggleLike.bind(tweetLikeController)
);

tweetRouter.get(
  "/:id/likes",
  tweetLikeController.getLikes.bind(tweetLikeController)
);

export default tweetRouter;
