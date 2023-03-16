import { z } from "zod";

export const createTaskInputSchema = z.object({
  creatorId: z.string().min(1),
  overseerUsername: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  createdAt: z.string().min(1),
  expireAt: z.string().min(1),
  reward: z.number(),
  status: z.enum(["REQUESTED", "PENDING", "COMPLETE", "APPROVED", "RETURNED"]),
});

export type createTaskInput = z.TypeOf<typeof createTaskInputSchema>;
