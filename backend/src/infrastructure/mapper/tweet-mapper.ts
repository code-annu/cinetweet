import { Tweet } from "../../domain/entities/tweet";

export function mapPrismaTweetToDomain(prismaTweet: {
  id: string;
  user_id: string;
  content: string;
  media_url: string | null;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}): Tweet {
  return {
    id: prismaTweet.id,
    user_id: prismaTweet.user_id,
    content: prismaTweet.content,
    media_url: prismaTweet.media_url,
    is_deleted: prismaTweet.is_deleted,
    created_at: prismaTweet.created_at,
    updated_at: prismaTweet.updated_at,
    deleted_at: prismaTweet.deleted_at,
  };
}

