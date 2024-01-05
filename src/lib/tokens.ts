import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/db"
import { getVerificationTokenByEmail } from "@/data/verificationToken"
import { getPasswordResetTokenByEmail } from "@/data/passwordResetToken"
import { getTwoFactorTokenByEmail } from "@/data/twoFactor"

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString() // gen random 6 digit number
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000) // expire in 1 hour reduce this in prod to 20 minutes

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return twoFactorToken
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return passwordResetToken
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1hour expiry time

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return verficationToken
}