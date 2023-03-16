import { z } from "zod";

import { createTaskInputSchema } from "../schemas/createTasksInputSchema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session?.user.id },
      include: { oversees: true, tasks: true },
    });
  }),
  createTask: publicProcedure
    .input(createTaskInputSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: input,
      });
    }),
  updateTaskStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum([
          "REQUESTED",
          "PENDING",
          "COMPLETE",
          "APPROVED",
          "RETURNED",
        ]),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),
});
