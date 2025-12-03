import { TweetLike } from "../../domain/entities/tweet_like";

export function mapPrismaTweetLikeToDomain(prismaTweetLike: {
  id: string;
  user_id: string;
  tweet_id: string;
  created_at: Date;
}): TweetLike {
  return {
    id: prismaTweetLike.id,
    user_id: prismaTweetLike.user_id,
    tweet_id: prismaTweetLike.tweet_id,
    created_at: prismaTweetLike.created_at,
  };
}

