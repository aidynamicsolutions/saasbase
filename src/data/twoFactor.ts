import { db } from "@/db"

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    return await db.twoFactorToken.findUnique({
      where: { token },
    })
  } catch {
    return null
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    return await db.twoFactorToken.findFirst({
      where: { email },
    })
  } catch {
    return null
  }
}

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    return await db.twoFactorConfirmation.findUnique({
      where: { userId },
    })
  } catch {
    return null
  }
}
