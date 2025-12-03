import { TweetComment } from "../../domain/entities/tweet_comment";

export function mapPrismaTweetCommentToDomain(prismaTweetComment: {
  id: string;
  user_id: string;
  tweet_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}): TweetComment {
  return {
    id: prismaTweetComment.id,
    user_id: prismaTweetComment.user_id,
    tweet_id: prismaTweetComment.tweet_id,
    content: prismaTweetComment.content,
    created_at: prismaTweetComment.created_at,
    updated_at: prismaTweetComment.updated_at,
  };
}

