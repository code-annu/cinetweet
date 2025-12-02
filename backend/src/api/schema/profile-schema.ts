import { z } from "zod";

export const updateProfileSchema = z.object({
  fullname: z
    .string()
    .min(1, "Fullname is required")
    .max(100, "Fullname must be at most 100 characters")
    .optional(),
  bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
  profile_picture: z.string().url("Invalid URL format").optional(),
});

