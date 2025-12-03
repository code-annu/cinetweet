import { Router } from "express";
import { TweetController } from "../controller/TweetController";
import { TweetLikeController } from "../controller/TweetLikeController";
import { TweetCommentController } from "../controller/TweetCommentController";
import { validateAuthorization } from "../middleware/validate-authorization";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  createTweetCommentSchema,
  updateTweetCommentSchema,
} from "../schema/tweet-comment-schema";

const tweetRouter = Router();
const tweetController = new TweetController();
const tweetLikeController = new TweetLikeController();
const tweetCommentController = new TweetCommentController();

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

// Comment routes
tweetRouter.get(
  "/:id/comments",
  tweetCommentController.getCommentsForTweet.bind(tweetCommentController)
);

tweetRouter.post(
  "/:id/comments",
  validateAuthorization,
  validateRequestBody(createTweetCommentSchema),
  tweetCommentController.postTweetComment.bind(tweetCommentController)
);

tweetRouter.get(
  "/:id/comments/:commentId",
  tweetCommentController.getTweetComment.bind(tweetCommentController)
);

tweetRouter.patch(
  "/:id/comments/:commentId",
  validateAuthorization,
  validateRequestBody(updateTweetCommentSchema),
  tweetCommentController.patchUpdateTweetComment.bind(tweetCommentController)
);

tweetRouter.delete(
  "/:id/comments/:commentId",
  validateAuthorization,
  tweetCommentController.deleteTweetComment.bind(tweetCommentController)
);

export default tweetRouter;
