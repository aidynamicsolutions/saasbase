import { AppRouter } from "@/trpc"
import { inferRouterOutputs } from "@trpc/server"

type RouterOutput = inferRouterOutputs<AppRouter>

type Messages = RouterOutput["getFileMessages"]["messages"]

type OmitText = Omit<Messages[number], "text">

type ExtendedText = {
  text: string | JSX.Element
}

// combine type with the effect that the text prop can now be a string or a jsx element
export type ExtendedMessage = OmitText & ExtendedText
