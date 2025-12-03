import { Router } from "express";
import { TweetController } from "../controller/TweetController";
import { validateAuthorization } from "../middleware/validate-authorization";

const tweetRouter = Router();
const tweetController = new TweetController();

tweetRouter.post(
  "/",
  validateAuthorization,
  tweetController.createTweet.bind(tweetController)
);

tweetRouter.get(
  "/:id",
  tweetController.getTweet.bind(tweetController)
);

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

export default tweetRouter;

