import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { privateProcedure, publicProcedure, router } from "./trpc"
import { TRPCError } from "@trpc/server"
import { db } from "@/db"
import { z } from "zod"

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()
    if (!user) {
      // third pary auth error prompt user to re-sign in
      throw new TRPCError({ code: "BAD_REQUEST" })
    }

    if (!user.id || !user.email) {
      console.log(user)
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    // check if the user is in db
    const dbUser = await db.user.findFirst({
      where: { id: user.id },
    })

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }

    return { success: true }
  }),
  getUserFiles: privateProcedure.query(async ({ ctx: { userId } }) => {
    return await db.file.findMany({ where: { userId } })
  }),
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { userId }, input }) => {
      const file = await db.file.findFirst({ where: { id: input.id, userId } })
      if (!file) throw new TRPCError({ code: "NOT_FOUND" })

      await db.file.delete({ where: { id: input.id } })

      return file
    }),
})

export type AppRouter = typeof appRouter
