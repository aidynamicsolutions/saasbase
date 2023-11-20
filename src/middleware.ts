import { authMiddleware } from "@kinde-oss/kinde-auth-nextjs/server"

// every routes in this array is protected only login user can access
export const config = {
  matcher: ["/dashboard/:path*", "/auth-callback"],
}

export default authMiddleware
