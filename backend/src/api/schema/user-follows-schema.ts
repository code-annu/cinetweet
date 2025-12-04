import { z } from "zod";

export const toggleUserFollowSchema = z.object({
  userId: z.string().uuid("Invalid user ID format"),
});
