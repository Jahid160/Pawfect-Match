import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const ROLE_PERMISSIONS = {
  user: ["/adoptionfrom", "/shelterForm"],
  shelter: ["/adoptionfrom",
    "/shelterForm",
    "/petdetailsform",
    "/dashboard/shelter-pendings",
    "/dashboard/shelter-pets",
    "/dashboard/shelter-petsreq",
  ],
  admin: [
    "/adoptionfrom",
    "/shelterForm",
    "/petdetailsform",
    "/addFoodForms",
    "/addAccessoryForm",
    "/vaccination/add",
    "/dashboard/pet-request",
    "/dashboard/doctor",
    "/dashboard/vaccinations",
    "/dashboard/manage-pets",
    "/dashboard/users",
    "/dashboard/accessories-management",
    "/dashboard/food",
    "/dashboard/shelters",
    "/dashboard/shelter-petsreq"
  ],
  doctor: [
    "/dashboard/appointments",
    "/dashboard/pet-records"
  ]
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
    "/dashboard/pet-request/:path*",
    "/dashboard/shelter-pendings/:path*",
    "/dashboard/shelter-pets/:path*",
    "/dashboard/shelter-petsreq/:path*",
    "/dashboard/appointments/:path*",
    "/dashboard/pet-records/:path*",
    "/dashboard/doctor/:path*",
    "/dashboard/vaccinations/:path*",
    "/dashboard/manage-pets/:path*",
    "/dashboard/users/:path*",
    "/dashboard/accessories-management/:path*",
    "/dashboard/food/:path*",
    "/dashboard/shelters/:path*"
  ],
};
