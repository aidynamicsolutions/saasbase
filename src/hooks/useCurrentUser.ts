import { useSession } from "next-auth/react"

// for client component
export const useCurrentUser = () => {
  const session = useSession()

  return session.data?.user
}
