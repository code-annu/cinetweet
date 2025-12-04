-- CreateTable
CREATE TABLE "UserFollows" (
    "follower_id" UUID NOT NULL,
    "following_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFollows_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- AddForeignKey
ALTER TABLE "UserFollows" ADD CONSTRAINT "UserFollows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollows" ADD CONSTRAINT "UserFollows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
