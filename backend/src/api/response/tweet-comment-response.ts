import {
  CreateTweetCommentOutput,
  GetTweetCommentOutput,
  UpdateTweetCommentOutput,
  GetCommentsOfTweetOutput,
} from "../../application/dto/tweet_comment_dto";
import { TweetComment } from "../../domain/entities/tweet_comment";

export interface TweetCommentResponse {
  id: string;
  user_id: string;
  tweet_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export function mapToTweetCommentResponse(
  commentOutput: CreateTweetCommentOutput | GetTweetCommentOutput | UpdateTweetCommentOutput
): TweetCommentResponse {
  const comment: TweetComment = commentOutput.comment;
  return {
    id: comment.id,
    user_id: comment.user_id,
    tweet_id: comment.tweet_id,
    content: comment.content,
    created_at: comment.created_at,
    updated_at: comment.updated_at,
  };
}

export function mapToTweetCommentsResponse(
  data: GetCommentsOfTweetOutput
): TweetCommentResponse[] {
  return data.comments.map((comment) => ({
    id: comment.id,
    user_id: comment.user_id,
    tweet_id: comment.tweet_id,
    content: comment.content,
    created_at: comment.created_at,
    updated_at: comment.updated_at,
  }));
}

