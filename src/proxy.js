import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
     const privateroute = ["/adoptionfrom", "/shelterForm", "/petdetailsform", "/addFoodForms", "/addAccessoryForm"]
     const token = await getToken({ req })
     console.log("Token in middleware:", token)
     const IsAuthenticated = Boolean(token)
     const IsPrivareRoute = privateroute.some((route) => req.nextUrl.pathname.startsWith(route))
     if (IsPrivareRoute && !IsAuthenticated) {
          return NextResponse.redirect(new URL(`/login?callbackUrl=${req.nextUrl.pathname}`, req.url))
     }
     return NextResponse.next()
}



export const config = {
     matcher: ["/adoptionfrom/:path*", "/shelterForm/:path*", "/petdetailsform/:path*", "/addFoodForms/:path*", "/addAccessoryForm/:path*"]
}