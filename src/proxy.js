import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const ROLE_PERMISSIONS = {
  user: ["/adoptionfrom", "/shelterForm"],
  shelter: ["/adoptionfrom", "/shelterForm", "/petdetailsform"],
  admin: [
    "/adoptionfrom",
    "/shelterForm",
    "/petdetailsform",
    "/addFoodForms",
    "/addAccessoryForm",
    "/vaccination/add",
    "/dashboard/pet-request"
  ],
};

export async function proxy(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const isAuthenticated = Boolean(token);
  const userRole = token?.role;

  const privateRoutes = Object.values(ROLE_PERMISSIONS).flat();
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isPrivateRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(`/?loginTrigger=true&callbackUrl=${pathname}`, req.url),
      );
    }

    const allowedRoutes = ROLE_PERMISSIONS[userRole] || [];
    const hasPermission = allowedRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (!hasPermission) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/adoptionfrom/:path*",
    "/shelterForm/:path*",
    "/petdetailsform/:path*",
    "/addFoodForms/:path*",
    "/addAccessoryForm/:path*",
    "/vaccination/add/:path*",
  ],
};
