import { z } from "zod";

export const createTweetCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(500, "Content must be at most 500 characters")
    .trim(),
});

export const updateTweetCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(500, "Content must be at most 500 characters")
    .trim(),
});

