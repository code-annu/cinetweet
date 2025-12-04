-- CreateTable
CREATE TABLE "TweetLike" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TweetLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TweetComment" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TweetComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TweetLike_user_id_tweet_id_key" ON "TweetLike"("user_id", "tweet_id");

-- AddForeignKey
ALTER TABLE "TweetLike" ADD CONSTRAINT "TweetLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetLike" ADD CONSTRAINT "TweetLike_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetComment" ADD CONSTRAINT "TweetComment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetComment" ADD CONSTRAINT "TweetComment_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
